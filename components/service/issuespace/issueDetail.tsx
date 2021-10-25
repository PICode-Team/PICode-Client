import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { issueDetailStyle } from '../../../styles/service/issuespace/issue'
import { IIssue } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'

function IssueDetail() {
  const classes = issueDetailStyle()
  const router = useRouter()
  const { issueUUID } = router.query
  const [issueInfo, setIssueInfo] = useState<IIssue | null>(null)
  const ws: any = useWs()

  const getIssue = (issueUUID: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssue',
          data: {
            option: {
              issueUUID,
            },
          },
        })
      )
    }
  }

  const issueWebSocketHandler = async (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'issue') {
      switch (message.type) {
        case 'getIssue':
          if (message.data.code === 200) {
            setIssueInfo(message.data.issue)
          }
          break
      }
    }
  }

  useEffect(() => {
    ws.addEventListener('message', issueWebSocketHandler)

    if (issueInfo === null) {
      getIssue(issueUUID as string)
    }
    return () => {
      ws.removeEventListener('message', issueWebSocketHandler)
    }
  }, [ws?.readyState])

  return (
    <div className={classes.detail}>
      <div className={classes.header}>
        <div>
          <span className={classes.title}>{issueInfo?.title ?? ''}</span>
          <span className={classes.issueNumber}>{issueInfo?.issueId ?? ''}</span>
        </div>
        <div>
          <span className={`${classes.activeStatus} ${classes.open}`}>Open</span>
          <span className={classes.creation}>{issueInfo?.creator ?? ''} opened this issue</span>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.item}>
          <div className={classes.key}>Assignees</div>
          <div className={classes.value}>{issueInfo?.assigner ?? ''}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Labels</div>
          <div className={classes.value}>{issueInfo?.label ?? ''}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Kanban Board</div>
          <div className={classes.value}>{1}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Milestone</div>
          <div className={classes.value}>{2}</div>
        </div>

        <div className={classes.divider} />

        <div className={classes.description}>{issueInfo?.content ?? ''}</div>
      </div>
    </div>
  )
}

export default IssueDetail
