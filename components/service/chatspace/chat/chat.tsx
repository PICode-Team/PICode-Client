import React, { useEffect, useRef, useState } from 'react'

import { chatStyle } from '../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import Activitybar from './activitybar/activitybar'
import Content from './content/content'
import Sidebar from './sidebar/sidebar'
import { fetchSet } from '../../../context/fetch'
import CreateChannel from '../common/createChannel'
import ResponsiveChat from './responsive/resposiveChat'

function Chat(ctx: any) {
  const { userId, toggle } = ctx
  const classes = chatStyle()
  const [messageList, setMessageList] = useState<IChat[]>([])
  const [channelList, setChannelList] = useState<IChannel[]>([])
  const [userList, setUserList] = React.useState<IUser[]>([])
  const [thread, setThread] = useState<IThread | null>(null)
  const [typingUserList, setTypingUserList] = useState<IUser[]>([])
  const [target, setTarget] = useState<IChannel | null>(null)
  const [newMessage, setNewMessage] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const messageRef = useRef<HTMLInputElement>(null)
  const threadMessageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const threadEndRef = useRef<HTMLInputElement>(null)

  const getUserList = async () => {
    fetchSet('/userList', 'GET', false)
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setUserList(res.user)
        }
      })
  }

  useEffect(() => {
    setMessageList([])

    if (target !== null) {
      // setMessageList([])
    }
  }, [target])

  useEffect(() => {
    getUserList()
  }, [])

  return (
    <React.Fragment>
      <div className={classes.chat}>
        <Sidebar channelList={channelList} setTarget={setTarget} setModal={setModal} />
        {target !== null ? (
          <Content target={target} messageList={messageList} userId={userId} messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} setThread={setThread} particiapntList={userList} />
        ) : (
          <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>
        )}
        {thread !== null && <Activitybar thread={thread} userId={userId} threadMessageRef={threadMessageRef} threadEndRef={threadEndRef} setThread={setThread} particiapntList={userList} />}
        <ResponsiveChat
          messageList={messageList}
          newMessage={newMessage}
          particiapntList={userList}
          userId={userId}
          target={target}
          thread={thread}
          channelList={channelList}
          toggle={toggle}
          setTarget={setTarget}
          setModal={setModal}
          setThread={setThread}
        />
        <CreateChannel modal={modal} setModal={setModal} title="Create Channel" />
      </div>
    </React.Fragment>
  )
}

export default Chat
