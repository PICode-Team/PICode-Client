import React, { useEffect, useRef, useState } from 'react'

import { chatStyle } from '../../../../styles/service/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import Activitybar from './activitybar/activitybar'
import Content from './content/content'
import Sidebar from './sidebar/sidebar'
import Modal from '../../../items/modal/modal'
import { fetchSet } from '../../../context/fetch'

function Chat(ctx: any) {
  const { userId } = ctx
  const classes = chatStyle()
  const [messageList, setMessageList] = useState<IChat[]>([])
  const [channelList, setChannelList] = useState<IChannel[]>([{ chatName: 'test', chatParticipant: [''], creation: '', description: '', userId: '' }])
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

  const handleModalSubmit = () => {}

  const getUserList = async () => {
    await fetchSet('/userList', 'GET', true).then((res) => {
      if (res.code === 200) {
        setUserList(res.user)
      }
    })
  }

  useEffect(() => {
    setMessageList([])

    if (target !== null) {
      //
    }
  }, [target])

  useEffect(() => {
    // getUserList()
  }, [])

  return (
    <div className={classes.chat}>
      <Sidebar channelList={channelList} setTarget={setTarget} setModal={setModal} />
      {target !== null ? (
        <Content target={target} messageList={messageList} userId={userId} messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} setThread={setThread} particiapntList={[]} />
      ) : (
        <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>
      )}
      {thread !== null && <Activitybar thread={thread} userId={userId} threadMessageRef={threadMessageRef} threadEndRef={threadEndRef} setThread={setThread} particiapntList={[]} />}
      <Modal modal={modal} setModal={setModal} onSubmit={handleModalSubmit}></Modal>
    </div>
  )
}

export default Chat
