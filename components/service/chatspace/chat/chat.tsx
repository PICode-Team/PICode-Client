import React, { useEffect, useRef, useState } from 'react'

import { chatStyle } from '../../../../styles/service/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import Activitybar from './activitybar/activitybar'
import Content from './content/content'
import Sidebar from './sidebar/sidebar'
import Modal from '../../../items/modal/modal'

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

  useEffect(() => {
    setMessageList([])

    if (target !== null) {
      setMessageList([
        { chatId: '', message: '', threadList: [], time: '2021-09-12 12:35:35', user: '' },
        { chatId: '123', message: '123', threadList: [], time: '2021-09-12 12:35:35', user: '' },
      ])
    }
  }, [target])

  return (
    <div className={classes.chat}>
      <Sidebar channelList={channelList} setTarget={setTarget} setModal={setModal} />
      {target !== null ? (
        <Content target={target} messageList={messageList} userId={userId} messageRef={messageRef} endRef={endRef} typingUserList={typingUserList} setThread={setThread} particiapntList={[]} />
      ) : (
        <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>
      )}
      {thread !== null && <Activitybar thread={thread} userId={userId} target={target} threadEndRef={threadEndRef} setThread={setThread} />}
      <Modal modal={modal} setModal={setModal} onSubmit={handleModalSubmit}></Modal>
    </div>
  )
}

export default Chat
