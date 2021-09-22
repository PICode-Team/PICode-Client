import { chatHeaderStyle } from '../../../../../styles/service/chat'
import { IChannel } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'

interface IHeaderProps {
  target: IChannel
  lastTime: string
}

function Header(props: IHeaderProps) {
  const { target, lastTime } = props
  const classes = chatHeaderStyle()

  return (
    <div className={classes.contentHeader}>
      <div className={classes.targetThubnail}></div>
      <div className={classes.targetInfo}>
        <div className={classes.targetName}>{target}</div>
        <div className={classes.targetLast}>{lastTime}</div>
      </div>
      <div className={classes.targetParticipant}></div>
    </div>
  )
}

export default Header