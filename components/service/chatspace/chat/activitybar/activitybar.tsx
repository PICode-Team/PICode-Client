import { activitybarStyle } from '../../../../../styles/service/chat/chat'
import { IChannel, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Content from './content'
import Header from './header'

interface IActivitybarProps {
  thread: IThread
  userId: string
  threadMessageRef: React.RefObject<HTMLInputElement>
  threadEndRef: React.RefObject<HTMLDivElement>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  particiapntList: IUser[]
}

function Activitybar(props: IActivitybarProps) {
  const { thread, userId, threadMessageRef, threadEndRef, setThread, particiapntList } = props
  const classes = activitybarStyle()
  return (
    <div className={classes.activitybar}>
      <Header thread={thread} setThread={setThread} />
      <Content thread={thread} userId={userId} threadMessageRef={threadMessageRef} threadEndRef={threadEndRef} setThread={setThread} particiapntList={particiapntList} />
    </div>
  )
}

export default Activitybar
