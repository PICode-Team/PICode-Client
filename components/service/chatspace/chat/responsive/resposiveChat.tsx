import { useEffect, useState } from 'react'
import { responsiveChatStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Content from './content'
import Home from './home'
import Thread from './thread'

interface IResponsiveProps {
  target: IChannel | null
  thread: IThread | null
  channelList: IChannel[]
  messageList: IChat[]
  newMessage: boolean
  particiapntList: IUser[]
  toggle: boolean
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function ResponsiveChat(props: IResponsiveProps) {
  const { target, thread } = props
  const classes = responsiveChatStyle()
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  return (
    <div className={classes.responsiveChat}>
      <Home {...props} />
      {target !== null ? <Content {...props} target={target as IChannel} userId={userId} /> : <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>}
      {target !== null && thread !== null && <Thread {...props} thread={thread as IThread} userId={userId} />}
    </div>
  )
}

export default ResponsiveChat
