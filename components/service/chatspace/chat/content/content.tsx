import React from 'react'

import { IChat } from '../../../../../types/chat.types'
import Boundary from '../../common/boundary'
import MessageBox from '../../common/messageBox'

export const renderMessage = (messageList: IChat[], userId: string, isThread: boolean) => {
  const renderObjectList = []

  for (let i = 0; i < messageList.length; i++) {
    const dayCheck = i === 0 || (messageList[i].time !== undefined && messageList[i - 1].time.split(' ')[0] !== messageList[i].time.split(' ')[0])

    if (!isThread && dayCheck === true) {
      renderObjectList.push(<Boundary text={messageList[i].time.split(' ')[0]} />)
    }

    // renderObjectList.push(<MessageBox messageInfo={messageList[i]} key={`messagebox-${i}`} reverse={messageList[i].user === userId} />)
  }

  return (
    <React.Fragment>
      {renderObjectList.map((v, i) => (
        <React.Fragment key={`message-wrapper-${i}`}>{v}</React.Fragment>
      ))}
    </React.Fragment>
  )
}

function Content() {
  return <div></div>
}

export default Content
