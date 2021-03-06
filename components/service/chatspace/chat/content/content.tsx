import React, { useEffect, useRef, useState } from 'react'
import { contentStyle } from '../../../../../styles/service/chatspace/chat'

import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { fetchSet } from '../../../../context/fetch'
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
  participantList: IUser[],
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
) => {
  const renderElementList = []

  for (let i = 0; i < messageList.length; i++) {
    const dayCheck = i === 0 || (messageList[i].time !== undefined && messageList[i - 1].time.split(' ')[0] !== messageList[i].time.split(' ')[0])

    if (!isThread && dayCheck === true) {
      renderElementList.push(<Boundary text={messageList[i].time.split(' ')[0]} />)
    }

    renderElementList.push(
      <MessageBox
        messageInfo={messageList[i]}
        key={`messagebox-${i}`}
        reverse={messageList[i].sender === userId}
        target={target}
        participantList={participantList}
        setThread={setThread}
        setMediaViewData={setMediaViewData}
      />
    )
  }

  return <React.Fragment>{renderElementList.map((v, i) => React.cloneElement(v, { key: `message-wrapper-${i}` }))}</React.Fragment>
}

interface IContentProps {
  target: IChannel
  messageList: IChat[]
  typingUserList: IUser[]
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  participantList: IUser[]
  newMessage: boolean
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>
  toggle: boolean
}

function Content(props: IContentProps) {
  const { target, messageList, typingUserList, participantList, newMessage, setThread, setMediaViewData, setNewMessage, toggle } = props
  const classes = contentStyle()
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const [userInfo, setUserInfo] = useState<IUser | null>(null)

  const getUserId = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { code, user } = await response.json()

    if (code === 200) {
      setUserInfo(user)
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  return (
    <div className={classes.contentWrapper}>
      <Header target={target} />
      <div className={classes.content}>
        <div className={classes.contentBox}>
          {userInfo !== null && renderMessage(messageList, userInfo.userId, false, setThread, target, participantList, setMediaViewData)}
          <div ref={endRef} />
        </div>
      </div>
      <ChatInput toggle={toggle} setNewMessage={setNewMessage} newMessage={newMessage} messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} target={target} />
    </div>
  )
}

export default React.memo(Content)
