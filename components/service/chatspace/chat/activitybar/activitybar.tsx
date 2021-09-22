import { activitybarStyle } from '../../../../../styles/service/chat'
import { IThread } from '../../../../../types/chat.types'

interface IActivitybarProps {
  thread: IThread
  userId: string
  target: string
  threadEndRef: React.RefObject<HTMLDivElement>
  setThread: React.Dispatch<React.SetStateAction<IThread | undefined>>
}

function Activitybar(props: IActivitybarProps) {
  const { thread, userId, target, setThread } = props
  const classes = activitybarStyle()
  return <div className={classes.activitybar}></div>
}

export default Activitybar
