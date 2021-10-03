import React, { useEffect, useRef, useState } from 'react'
import { contentStyle } from '../../../../../styles/service/chatspace/chat'

import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { useWs } from '../../../../context/websocket'
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
      <MessageBox messageInfo={messageList[i]} key={`messagebox-${i}`} reverse={messageList[i].user === userId} target={target} particiapntList={particiapntList} setThread={setThread} />
    )
  }

  return <React.Fragment>{renderElementList.map((v, i) => React.cloneElement(v, { key: `message-wrapper-${i}` }))}</React.Fragment>
}

interface IContentProps {
  target: IChannel
  messageList: IChat[]
  typingUserList: IUser[]
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  particiapntList: IUser[]
}

function Content(props: IContentProps) {
  const { target, messageList, typingUserList, particiapntList, setThread } = props
  const classes = contentStyle()
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  return (
    <div className={classes.contentWrapper}>
      <Header target={target} />
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
