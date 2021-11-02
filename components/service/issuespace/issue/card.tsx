import React from 'react'
import { cardStyle } from '../../../../styles/service/issuespace/issue'
import { IIssue } from '../../../../types/issue.types'
import { useWs } from '../../../context/websocket'

interface ICardProps {
  issue: IIssue
  columnList: string[]
  kanbanUUID: string
}

function Card(props: ICardProps) {
  const { issue, kanbanUUID, columnList } = props
  const classse = cardStyle()
  const ws: any = useWs()

  const updateIssue = (column: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'updateIssue',
          data: {
            kanbanUUID: kanbanUUID,
            issueData: {
              uuid: issue.uuid,
              column,
            },
          },
        })
      )
    }
  }

  const handleDradStartCard = () => {}

  const handleDradEndCard = (event: any) => {
    for (const column of columnList!) {
      const tmpCol = document.getElementById(column)?.getBoundingClientRect()
      if (tmpCol!.left < event.clientX && tmpCol!.right > event.clientX) {
        updateIssue(column)
      }
    }
  }

  return (
    <div
      className={classse.card}
      draggable
      onDragStart={handleDradStartCard}
      onDragEnd={handleDradEndCard}
      onClick={() => {
        window.location.href = `/issuespace/detail?issueUUID=${issue.uuid}`
      }}
    >
      <div className={classse.header}>
        <div className={classse.thumbnail}></div>
        <div className={classse.headerText}>
          <div>{issue.title}</div>
          <div>#{issue.issueId} Issue</div>
        </div>
      </div>
      <div className={classse.content}>{issue.content}</div>
      <div className={classse.labelWrapper}>{issue.label !== '' && issue.label !== undefined && <div className={classse.label}>{issue.label}</div>}</div>
    </div>
  )
}

export default Card
