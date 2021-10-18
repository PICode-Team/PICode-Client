import { chatHeaderStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'

interface IHeaderProps {
  target: IChannel
}

function Header(props: IHeaderProps) {
  const { target } = props
  const classes = chatHeaderStyle()

  return (
    <div className={classes.contentHeader}>
      <div className={classes.targetThumbnail}></div>
      <div className={classes.targetInfo}>
        <div className={classes.targetName}>{target.chatName ?? (target.userId as string)}</div>
        <div className={classes.targetLast}>{target.recentTime.split(' ')[0]}</div>
      </div>
      <div className={classes.targetParticipant}></div>
    </div>
  )
}

export default Header
