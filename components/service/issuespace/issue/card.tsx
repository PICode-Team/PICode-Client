import React from 'react'
import { cardStyle } from '../../../../styles/service/issuespace/issue'
import { IIssue } from '../../../../types/issue.types'

interface ICardProps {
  issue: IIssue
}

function Card(props: ICardProps) {
  const { issue } = props
  const classse = cardStyle()

  const handleDradStartCard = () => {
    // (e) => {
    //     setNode(node);
    //   }
  }

  const handleDradEndCard = () => {
    // (e) => {
    //     for (let i of col!) {
    //       let tmpCol = document.getElementById(i)?.getBoundingClientRect();
    //       if (tmpCol!.left < e.clientX && tmpCol!.right > e.clientX) {
    //         props.ws.current.send(
    //           JSON.stringify({
    //             category: "issue",
    //             type: "updateIssue",
    //             data: {
    //               kanbanUUID: kanban,
    //               issueData: {
    //                 uuid: node.uuid,
    //                 column: i,
    //               },
    //             },
    //           })
    //         );
    //         props.ws.current.send(
    //           JSON.stringify({
    //             category: "issue",
    //             type: "getIssue",
    //             data: {
    //               kanbanUUID: kanban,
    //               options: {},
    //             },
    //           })
    //         );
    //       }
    //     }
    //   }
  }

  return (
    <div className={classse.card} draggable onDragStart={handleDradStartCard} onDragEnd={handleDradEndCard}>
      <div className={classse.header}>
        <div className={classse.thumbnail}></div>
        <div className={classse.headerText}>
          <div>{issue.title}</div>
          <div>#{issue.issueId} Issue</div>
        </div>
      </div>
      <div className={classse.content}>{issue.content}</div>
      <div className={classse.labelWrapper}>{issue.label !== undefined && <div className={classse.label}>{issue.label}</div>}</div>
    </div>
  )
}

export default Card
