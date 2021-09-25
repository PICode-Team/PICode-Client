import React from 'react'
import { contentStyle } from '../../../../../styles/service/chat/chat'

import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Boundary from '../../common/boundary'
import ChatInput from '../../common/chatInput'
import MessageBox from '../../common/messageBox'
import Header from './header'

export const renderMessage = (
  messageList: IChat[],
  userId: string,
  isThread: boolean,
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>,
  target: IChannel | null,
  particiapntList: IUser[]
) => {
  const renderElementList = []

  for (let i = 0; i < messageList.length; i++) {
    const dayCheck = i === 0 || (messageList[i].time !== undefined && messageList[i - 1].time.split(' ')[0] !== messageList[i].time.split(' ')[0])

    if (!isThread && dayCheck === true) {
      renderElementList.push(<Boundary text={messageList[i].time.split(' ')[0]} />)
    }

    renderElementList.push(
      <MessageBox messageInfo={messageList[i]} key={`messagebox-${i}`} reverse={messageList[i].user === 'userId'} target={target} particiapntList={particiapntList} setThread={setThread} />
    )
  }

  return <React.Fragment>{renderElementList.map((v, i) => React.cloneElement(v, { key: `message-wrapper-${i}` }))}</React.Fragment>
}

interface IContentProps {
  target: IChannel
  messageList: IChat[]
  userId: string
  messageRef: React.RefObject<HTMLInputElement>
  endRef: React.RefObject<HTMLDivElement>
  typingUserList: IUser[]
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  particiapntList: IUser[]
}

function Content(props: IContentProps) {
  const { target, messageList, userId, endRef, messageRef, typingUserList, particiapntList, setThread } = props
  const classes = contentStyle()
  return (
    <div className={classes.contentWrapper}>
      <Header target={target} lastTime="sample text" />
      <div className={classes.content}>
        <div className={classes.contentBox}>
          {renderMessage(messageList, userId, false, setThread, target, particiapntList)}
          <div ref={endRef} />
        </div>
      </div>
      <ChatInput messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} target={target} />
    </div>
  )
}

export default React.memo(Content)
