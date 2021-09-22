import { activitybarStyle } from '../../../../../styles/service/chat'
import { IChannel, IThread } from '../../../../../types/chat.types'

interface IActivitybarProps {
  thread: IThread
  userId: string
  target: IChannel | null
  threadEndRef: React.RefObject<HTMLDivElement>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Activitybar(props: IActivitybarProps) {
  const { thread, userId, target, threadEndRef, setThread } = props
  const classes = activitybarStyle()
  return <div className={classes.activitybar}></div>
}

export default Activitybar
