import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { issueDetailStyle } from '../../../styles/service/issuespace/issue'
import { IIssue } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'

const initialState: IIssue = {
  uuid: '',
  column: '',
  creator: '',
  title: '',
  issueId: '',
  content: '',
  label: '',
  assigner: [],
  kanbanUUID: '',
}

function IssueDetail() {
  const classes = issueDetailStyle()
  const router = useRouter()
  const { issueUUID } = router.query
  const [issueInfo, setIssueInfo] = useState<IIssue | null>(null)
  const ws: any = useWs()

  const getIssue = (uuid: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssue',
          data: {
            option: {
              uuid,
            },
          },
        })
      )
    }
  }

  const issueWebSocketHandler = (msg: any) => {
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
  }, [ws?.readyState, issueInfo])

  useEffect(() => {
    setTimeout(() => {
      setIssueInfo(initialState)
    }, 100)
  }, [])

  console.log(issueInfo)

  return (
    <div className={classes.detail}>
      <div className={classes.header}>
        <div>
          <span className={classes.title}>{issueInfo !== null && issueInfo.title}</span>
          <span className={classes.issueNumber}>{issueInfo !== null && issueInfo.issueId}</span>
        </div>
        <div>
          <span className={`${classes.activeStatus} ${classes.open}`}>Open</span>
          <span className={classes.creation}>{issueInfo !== null && issueInfo.creator} opened this issue</span>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.item}>
          <div className={classes.key}>Assignees</div>
          <div className={classes.value}>{issueInfo !== null && issueInfo.assigner}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Labels</div>
          <div className={classes.value}>{issueInfo !== null && issueInfo.label}</div>
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

        <div className={classes.description}>{issueInfo !== null && issueInfo.content}</div>
      </div>
    </div>
  )
}

export default IssueDetail
