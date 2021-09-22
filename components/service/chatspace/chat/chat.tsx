import React, { useEffect, useRef, useState } from 'react'
import { chatStyle } from '../../../../styles/service/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import Activitybar from './activitybar/activitybar'
import Content from './content/content'
import Sidebar from './sidebar/sidebar'

function Chat(ctx: any) {
  const { userId } = ctx
  const classes = chatStyle()
  const [messageList, setMessageList] = useState<IChat[]>([])
  const [channelList, setChannelList] = useState<IChannel[]>([])
  const [userList, setUserList] = React.useState<IUser[]>([])
  const [thread, setThread] = useState<IThread | undefined>(undefined)
  const [typing, setTyping] = useState<string[]>([])
  const [target, setTarget] = useState<string>('')
  const [newMessage, setNewMessage] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const messageRef = useRef<HTMLInputElement>(null)
  const threadMessageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
  const threadEndRef = useRef<HTMLInputElement>(null)

  return (
    <div className={classes.chat}>
      <Sidebar />
      <Content />
      {thread !== undefined && <Activitybar thread={thread} userId={userId} target={target} setThread={setThread} />}
    </div>
  )
}

export default Chat
