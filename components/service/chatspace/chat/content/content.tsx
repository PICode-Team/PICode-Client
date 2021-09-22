import React from 'react'

import { IChannel, IChat } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Boundary from '../../common/boundary'
import ChatInput from '../../common/chatInput'
import MessageBox from '../../common/messageBox'
import Header from './header'

export const renderMessage = (messageList: IChat[], userId: string, isThread: boolean) => {
  const renderElementList = []

  for (let i = 0; i < messageList.length; i++) {
    const dayCheck = i === 0 || (messageList[i].time !== undefined && messageList[i - 1].time.split(' ')[0] !== messageList[i].time.split(' ')[0])

    if (!isThread && dayCheck === true) {
      renderElementList.push(<Boundary text={messageList[i].time.split(' ')[0]} />)
    }

    // renderElementList.push(<MessageBox messageInfo={messageList[i]} key={`messagebox-${i}`} reverse={messageList[i].user === userId} />)
  }

  return (
    <React.Fragment>
      {renderElementList.map((v, i) => (
        <React.Fragment key={`message-wrapper-${i}`}>{v}</React.Fragment>
      ))}
    </React.Fragment>
  )
}

interface IContentProps {
  target: IChannel
  messageList: IChat[]
  userId: string
  messageRef: React.RefObject<HTMLInputElement>
  endRef: React.RefObject<HTMLDivElement>
  typingUserList: IUser[]
}

function Content(props: IContentProps) {
  const { target, messageList, userId, endRef, messageRef, typingUserList } = props
  return (
    <div>
      <Header target={target} lastTime="sample text" />
      <div>
        <div>
          {renderMessage(messageList, userId, false)}
          <div ref={endRef} />
        </div>
      </div>
      <ChatInput messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} target={target} />
    </div>
  )
}

export default Content
