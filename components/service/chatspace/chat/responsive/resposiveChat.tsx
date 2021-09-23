import { responsiveChatStyle } from '../../../../../styles/service/chat'
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
  userId: string
  particiapntList: IUser[]
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function ResponsiveChat(props: IResponsiveProps) {
  const { target, thread } = props
  const classes = responsiveChatStyle()
  return (
    <div className={classes.responsiveChat}>
      <Home {...props} />
      {target !== null ? <Content {...props} target={target as IChannel} /> : <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>}
      {target !== null && thread !== null && <Thread {...props} thread={thread as IThread} />}
    </div>
  )
}

export default ResponsiveChat
