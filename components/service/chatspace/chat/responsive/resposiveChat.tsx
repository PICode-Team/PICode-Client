import { useEffect, useState } from 'react'
import { responsiveChatStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { fetchSet } from '../../../../context/fetch'
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
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
}

function ResponsiveChat(props: IResponsiveProps) {
  const { target, thread } = props
  const classes = responsiveChatStyle()
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
  })

  return (
    <div className={classes.responsiveChat}>
      <Home {...props} />
      {target !== null && userInfo !== null ? (
        <Content {...props} target={target as IChannel} userId={userInfo.userId} />
      ) : (
        <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>
      )}
      {target !== null && thread !== null && userInfo !== null && <Thread {...props} thread={thread as IThread} userId={userInfo.userId} />}
    </div>
  )
}

export default ResponsiveChat
