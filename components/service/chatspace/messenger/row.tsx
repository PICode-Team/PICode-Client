import { IChannel } from '../../../../types/chat.types'
import { allTagRegex, imageRegex } from '../../../context/regex'

interface IRowProps {
  target: IChannel
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  classes: any
}

function Row(props: IRowProps) {
  const { target, setTarget, classes } = props
  const filteredMessage = (target.recentMessage ?? '').replace(allTagRegex, '')
  const checkImage = (() => {
    const regexMessage = imageRegex.exec(target.recentMessage)
    if (regexMessage === null) return false
    return true
  })()
  const recentText = (() => {
    if (filteredMessage === '' && checkImage === true) {
      return '(image)'
    }
    return filteredMessage
  })()

  const handleClickRow = () => {
    setTarget(target)
  }

  return (
    <div className={classes.row} onClick={handleClickRow}>
      <div className={classes.users}></div>
      <div className={classes.titleWrapper}>
        <div className={classes.title}>
          <div className={classes.titleText}>{target.chatName ?? (target.userId as string)}</div>
          <div className={classes.participant}>{target.chatName !== undefined && target.chatParticipant.length}</div>
          <div className={classes.etc}></div>
        </div>
        <div className={classes.thumbnail}>{recentText}</div>
      </div>
      <div className={classes.chatInfo}>
        <div className={classes.lastTime}>{target.recentTime !== '' && target.recentTime !== undefined && target.recentTime.split(' ')[0]}</div>
        {/*<div className={classes.count}>231</div>*/}
      </div>
    </div>
  )
}

export default Row
