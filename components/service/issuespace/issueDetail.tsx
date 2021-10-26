import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { issueDetailStyle } from '../../../styles/service/issuespace/issue'
import { useWs } from '../../context/websocket'

interface IIssueDetail {
  assigner: string[]
  column: string
  content: string
  creation: string
  creator: string
  dueDate: string
  issueId: number
  kanban: string
  label: string
  milestone: string
  startDate: string
  title: string
  uuid: string
}

function IssueDetail() {
  const classes = issueDetailStyle()
  const router = useRouter()
  const { issueUUID } = router.query
  const [issueInfo, setIssueInfo] = useState<IIssueDetail | null>(null)
  const [wsCheck, setWsCheck] = useState<number>(0)
  const ws: any = useWs()

  const getIssueDetail = (issueUUID: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssueDetail',
          data: {
            issueUUID,
          },
        })
      )
    }
  }

  const issueWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'issue') {
      switch (message.type) {
        case 'getIssueDetail':
          if (message.data !== undefined) {
            setIssueInfo(message.data)
          }
          break
      }
    }
  }

  useEffect(() => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', issueWebSocketHandler)
      getIssueDetail(issueUUID as string)

      return () => {
        ws.removeEventListener('message', issueWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [wsCheck])

  return (
    <div className={classes.detail}>
      <div className={classes.header}>
        <div>
          <span className={classes.title}>{issueInfo !== null && issueInfo.title}</span>
          <span className={classes.issueNumber}>#{issueInfo !== null && issueInfo.issueId}</span>
        </div>
        <div>
          <span className={`${classes.activeStatus} ${classes.open}`}>Open</span>
          <span className={classes.creation}>{issueInfo !== null && issueInfo.creator} opened this issue</span>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.item}>
          <div className={classes.key}>Assignees</div>
          <div className={classes.value}>{issueInfo !== null && (issueInfo.assigner.length === 0 ? 'Empty' : issueInfo.assigner.join(', '))}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Labels</div>
          <div className={classes.value}>{issueInfo !== null && (issueInfo.label === '' ? 'Empty' : issueInfo.label)}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Kanban Board</div>
          <div className={classes.value}>{issueInfo !== null && issueInfo.kanban}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Column</div>
          <div className={classes.value}>{issueInfo !== null && issueInfo.column}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Milestone</div>
          <div className={classes.value}>{issueInfo !== null && (issueInfo.milestone === '' ? 'Empty' : issueInfo.milestone)}</div>
        </div>

        <div className={classes.divider} />

        <div className={classes.description}>{issueInfo !== null && issueInfo.content}</div>
      </div>
    </div>
  )
}

export default IssueDetail
