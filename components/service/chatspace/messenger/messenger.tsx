import React, { useState } from 'react'

import { ChatBubbleOutline } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/chatspace/messenger'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import Home from './home'
import Room from './room'
import Thread from './thread'

interface IMessengerProps {
  userId: string
}

function Messenger(props: IMessengerProps) {
  const { userId } = props
  const classes = messengerStyle()
  const [open, setOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<IChannel | null>(null)
  const [channelList, setChannelList] = useState<IChannel[]>([])
  const [messageList, setMessageList] = useState<IChat[]>([])
  const [newMessage, setNewMessage] = useState<boolean>(false)
  const [thread, setThread] = useState<IThread | null>(null)

  const handleOpenMessenger = () => {
    setOpen(true)
  }

  if (open) {
    return (
      <React.Fragment>
        {target === null ? (
          <Home channelList={channelList} setOpen={setOpen} setTarget={setTarget} />
        ) : (
          <Room userId={userId} target={target} messageList={messageList} newMessage={newMessage} thread={thread} particiapntList={[]} setTarget={setTarget} setOpen={setOpen} setThread={setThread} />
        )}
        {thread !== null && <Thread userId={userId} newMessage={false} thread={thread} particiapntList={[]} setOpen={setOpen} setThread={setThread} />}
      </React.Fragment>
    )
  }

  return (
    <div className={classes.chatButton} onClick={handleOpenMessenger}>
      <ChatBubbleOutline />
    </div>
  )
}

export default Messenger
