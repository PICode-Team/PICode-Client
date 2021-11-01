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
  const [milestoneName, setMilestoneName] = useState<string>('')
  const [kanbanName, setKanbanName] = useState<string>('')
  const [wsCheck, setWsCheck] = useState<number>(0)
  const ws: any = useWs()

  useEffect(() => {
    if (issueInfo !== null) {
      getKanban(issueInfo.kanban)
      getMilestone(issueInfo.milestone)
    }
  }, [issueInfo])

  const getIssueDetail = (issueUUID: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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

  const getKanban = (uuid: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'getKanban',
          data: {
            uuid,
          },
        })
      )
    }
  }

  const getMilestone = (uuid: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'getMilestone',
          data: {
            uuid,
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
    } else if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban':
          if (message.data.kanbans.length > 0) {
            setKanbanName(message.data.kanbans[0].title)
          }

          break
      }
    } else if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone':
          if (message.data !== undefined) {
            setMilestoneName(message.data.title)
          }

          break
      }
    }
  }

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', issueWebSocketHandler)
      getIssueDetail(issueUUID as string)

      return () => {
        ws.removeEventListener('message', issueWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [ws?.readyState, wsCheck])

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
          <div className={classes.value}>{issueInfo !== null && issueInfo.kanban === '' ? 'Empty' : kanbanName === '' ? 'Empty' : kanbanName}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Column</div>
          <div className={classes.value}>{issueInfo !== null && issueInfo.column}</div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Milestone</div>
          <div className={classes.value}>{issueInfo !== null && (issueInfo.milestone === '' ? 'Empty' : milestoneName === '' ? 'Empty' : milestoneName)}</div>
        </div>

        <div className={classes.divider} />

        <div className={classes.description}>{issueInfo !== null && issueInfo.content}</div>
      </div>
    </div>
  )
}

export default IssueDetail
