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
  particiapntList: IUser[],
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
        particiapntList={particiapntList}
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
  particiapntList: IUser[]
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
}

function Content(props: IContentProps) {
  const { target, messageList, typingUserList, particiapntList, setThread, setMediaViewData } = props
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
          {userInfo !== null && renderMessage(messageList, userInfo.userId, false, setThread, target, particiapntList, setMediaViewData)}
          <div ref={endRef} />
        </div>
      </div>
      <ChatInput messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} target={target} />
    </div>
  )
}

export default React.memo(Content)
