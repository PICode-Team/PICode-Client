import { useEffect, useRef, useState } from 'react'
import { activitybarStyle } from '../../../../../styles/service/chatspace/chat'
import { IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { fetchSet } from '../../../../context/fetch'
import Content from './content'
import Header from './header'

interface IActivitybarProps {
  thread: IThread
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  particiapntList: IUser[]
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
  newMessage: boolean
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>
}

function Activitybar(props: IActivitybarProps) {
  const { newMessage, setNewMessage, thread, setThread, particiapntList, setMediaViewData } = props
  const classes = activitybarStyle()
  const threadMessageRef = useRef<HTMLInputElement>(null)
  const threadEndRef = useRef<HTMLInputElement>(null)
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
    <div className={classes.activitybar}>
      <Header thread={thread} setThread={setThread} />
      {userInfo !== null && (
        <Content
          newMessage={newMessage}
          setNewMessage={setNewMessage}
          thread={thread}
          userId={userInfo.userId}
          threadMessageRef={threadMessageRef}
          threadEndRef={threadEndRef}
          setThread={setThread}
          particiapntList={particiapntList}
          setMediaViewData={setMediaViewData}
        />
      )}
    </div>
  )
}

export default Activitybar
