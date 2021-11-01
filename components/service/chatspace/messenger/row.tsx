import React, { useEffect, useState } from 'react'
import { IChannel } from '../../../../types/chat.types'
import { allTagRegex, imageRegex } from '../../../context/regex'

interface IRowProps {
  target: IChannel
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  classes: any
}

function Row(props: IRowProps) {
  const { target, setTarget, classes } = props
  const [text, setText] = useState<string>('')

  useEffect(() => {
    const filteredMessage = target.recentMessage.replace(allTagRegex, '').trim()
    const checkImage = (() => {
      const regexMessage = imageRegex.exec(target.recentMessage)
      if (regexMessage === null) return false
      return true
    })()

    if (filteredMessage === '' && checkImage === true) {
      setText('(image)')
      return
    }
    setText(filteredMessage)
  }, [])

  const handleClickRow = () => {
    setTarget(target)
  }

  return (
    <div className={classes.row} onClick={handleClickRow}>
      <div className={classes.users}></div>
      <div className={classes.titleWrapper}>
        <div className={classes.title}>
          <div className={classes.titleText}>{target.chatName}</div>
          <div className={classes.participant}>{target.chatName !== undefined && target.chatParticipant.length}</div>
          <div className={classes.etc}></div>
        </div>
        <div className={classes.thumbnail}>{text}</div>
      </div>
      <div className={classes.chatInfo}>
        <div className={classes.lastTime}>{target.recentTime !== '' && target.recentTime !== undefined && target.recentTime.split(' ')[0]}</div>
        {/*<div className={classes.count}>231</div>*/}
      </div>
    </div>
  )
}

export default React.memo(Row)
