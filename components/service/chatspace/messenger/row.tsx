import { IChannel } from '../../../../types/chat.types'

interface IRowProps {
  target: IChannel
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  classes: any
}

function Row(props: IRowProps) {
  const { target, setTarget, classes } = props
  return (
    <div
      className={classes.row}
      onClick={() => {
        setTarget(target)
      }}
    >
      <div className={classes.users}></div>
      <div className={classes.titleWrapper}>
        <div className={classes.title}>
          <div className={classes.titleText}>{target}</div>
          <div className={classes.participant}>{target.chatName !== undefined && target.chatParticipant.length}</div>
          <div className={classes.etc}></div>
        </div>
        <div className={classes.thumbnail}>gna. Sed consequat, leo eget bibendum sodales, augue velit cu</div>
      </div>
      <div className={classes.chatInfo}>
        <div className={classes.lastTime}>AM 12:32</div>
        {/*<div className={classes.count}>231</div>*/}
      </div>
    </div>
  )
}

export default Row
