import React, { useEffect, useState } from 'react'
import { issueStyle } from '../../../styles/service/dashboard/dashboard'
import { IIssue } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'

interface IIssueViewProps {}

function IssueView(props: IIssueViewProps) {
  const {} = props
  const classes = issueStyle()
  const [kanbanList, setKanbanList] = useState<string[]>([])
  const [issueList, setIssueList] = useState<IIssue[] | null>(null)
  const ws: any = useWs()

  const getKanban = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'getKanban',
        })
      )
    }
  }

  const getIssue = (kanbanUUID: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssue',
          data: {
            kanbanUUID,
          },
        })
      )
    }
  }

  const issueWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban':
          const kanbans: string[] = []
          message.data.kanbans.forEach((v: any) => {
            kanbans.push(v.uuid)
          })
          setKanbanList(kanbans)
          break
        default:
      }
    } else if (message.category === 'issue') {
      switch (message.type) {
        case 'getIssue':
          if (message.data.issues.length > 0) setIssueList([message.data.issues])
          break
      }
    }
  }

  useEffect(() => {
    ws.addEventListener('message', issueWebSocketHandler)
    getKanban()
    return () => {
      ws.removeEventListener('message', issueWebSocketHandler)
    }
  }, [ws?.readyState])

  useEffect(() => {
    kanbanList.map((v) => getIssue(v))
  }, [kanbanList])

  useEffect(() => {
    setTimeout(() => {
      if (issueList === null) {
        setIssueList([])
      }
    }, 100)
  }, [])

  const handleLinkIssue = () => {}

  return (
    <div className={classes.issue}>
      <div className={classes.title}>Issue</div>
      <div className={classes.content}>
        {issueList !== null && issueList.length > 0 ? (
          issueList.map((v, i) => {
            return (
              <div key={`dashboard-issue-${i}`} className={classes.card} onClick={handleLinkIssue}>
                <div className={classes.top}>
                  <div className={classes.thumbnail}></div>
                  <div className={classes.issueName}>
                    <div className={classes.issueTitle}>{v.title}</div>
                    <div className={classes.issueId}>#{v.issueId} Issue</div>
                  </div>
                  <div className={classes.issueContentWrapper}>
                    <div className={classes.issueContent}>{v.content ?? 'this issue has no content'}</div>
                  </div>
                </div>

                <div className={classes.bottom}>
                  <div className={classes.labelWrapper}>{v.label !== '' && v.label !== undefined && <div className={classes.label}>{v.label}</div>}</div>
                </div>
              </div>
            )
          })
        ) : (
          <div className={classes.empty}>this server has no issue</div>
        )}
      </div>
    </div>
  )
}

export default IssueView
