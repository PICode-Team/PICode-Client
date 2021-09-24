import { useRef } from 'react'

import { NavigateBefore, AttachFile, SentimentSatisfied, Send } from '@material-ui/icons'

import { responsiveContentStyle } from '../../../../../styles/service/chat'
import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { renderMessage } from '../../chat/content/content'
import { IUser } from '../../../../../types/user.types'

interface IContentProps {
  target: IChannel
  messageList: IChat[]
  newMessage: boolean
  userId: string
  thread: IThread | null
  particiapntList: IUser[]
  toggle: boolean
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Content(props: IContentProps) {
  const { target, messageList, newMessage, userId, thread, particiapntList, setTarget, setThread, toggle } = props
  const classes = responsiveContentStyle()
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)

  const handleSendMessage = () => {}

  return (
    <div className={`${classes.content} ${toggle && classes.toggleContent}`}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div
            className={classes.back}
            onClick={() => {
              setTarget(null)
            }}
          >
            <NavigateBefore />
          </div>
          <div className={classes.channel}>
            <div className={classes.name}>{target.chatName ?? (target.userId as string)}</div>
            <div className={classes.online}></div>
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.contentBox}>
            {renderMessage(messageList, userId, false, setThread, target, particiapntList)}
            <div ref={endRef}></div>
          </div>
        </div>
        <div className={classes.footer}>
          <div className={classes.attachFile}>
            <AttachFile />
          </div>
          <div className={classes.imoji}>
            <SentimentSatisfied />
          </div>
          <input className={classes.input} type="text" placeholder="Enter a message" ref={messageRef} />
          <div className={classes.send} onClick={handleSendMessage}>
            <Send />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Content
