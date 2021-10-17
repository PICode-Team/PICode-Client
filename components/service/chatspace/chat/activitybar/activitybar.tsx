import { useEffect, useRef, useState } from 'react'
import { activitybarStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { useWs } from '../../../../context/websocket'
import Content from './content'
import Header from './header'

interface IActivitybarProps {
  thread: IThread
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  particiapntList: IUser[]
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
}

function Activitybar(props: IActivitybarProps) {
  const { thread, setThread, particiapntList, setMediaViewData } = props
  const classes = activitybarStyle()
  const threadMessageRef = useRef<HTMLInputElement>(null)
  const threadEndRef = useRef<HTMLInputElement>(null)
  const [userId, setUserId] = useState<string>('')
  const ws: any = useWs()

  const sendMessage = (target: string, message: string, parentChatId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'sendMessage',
          data: {
            target,
            message,
            parentChatId,
          },
        })
      )
    }
  }

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  return (
    <div className={classes.activitybar}>
      <Header thread={thread} setThread={setThread} />
      <Content
        thread={thread}
        userId={userId}
        threadMessageRef={threadMessageRef}
        threadEndRef={threadEndRef}
        setThread={setThread}
        particiapntList={particiapntList}
        setMediaViewData={setMediaViewData}
      />
    </div>
  )
}

export default Activitybar
