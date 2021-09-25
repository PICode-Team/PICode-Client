import { Clear } from '@material-ui/icons'
import { activitybarHeaderStyle } from '../../../../../styles/service/chat/chat'
import { IThread } from '../../../../../types/chat.types'

interface IHeaderProps {
  thread: IThread
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Header(props: IHeaderProps) {
  const { thread, setThread } = props
  const classes = activitybarHeaderStyle()

  return (
    <div className={classes.activitybarHeader}>
      <span>
        <span className={classes.activitybarTitle}>Thread</span>
        <span className={classes.activitybarTarget}>{thread.chatName}</span>
      </span>
      <span
        className={classes.activitybarClose}
        onClick={() => {
          setThread(null)
        }}
      >
        <Clear />
      </span>
    </div>
  )
}

export default Header
