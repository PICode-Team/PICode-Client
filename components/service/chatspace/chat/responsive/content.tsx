import { useEffect, useRef, useState } from 'react'

import { NavigateBefore, AttachFile, SentimentSatisfied, Send } from '@material-ui/icons'

import { responsiveContentStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { renderMessage } from '../../chat/content/content'
import { IUser } from '../../../../../types/user.types'
import { useWs } from '../../../../context/websocket'

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
  const [onMention, setOnMention] = useState<boolean>(false)
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)
  const ws: any = useWs()

  const sendMessage = (target: string, message: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'sendMessage',
          data: {
            target,
            message,
          },
        })
      )
    }
  }

  const pressEnterHandler = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return
    if (messageRef === null) return
    if (messageRef.current!.value === '') return

    const { activeElement } = document
    if (activeElement !== messageRef.current) return

    sendMessage(target?.chatName ?? (target.userId as string), messageRef.current!.value)
    messageRef.current!.value = ''
    endRef.current!.scrollIntoView()
  }

  const handleSendMessage = () => {
    if (messageRef === null) return
    if (messageRef.current!.value === '') return

    sendMessage(target?.chatName ?? (target.userId as string), messageRef.current!.value)
    messageRef.current!.value = ''
    endRef.current!.scrollIntoView()
  }

  const handleClickBack = () => {
    setTarget(null)
  }

  useEffect(() => {
    document.addEventListener('keypress', pressEnterHandler)
    return () => {
      document.removeEventListener('keypress', pressEnterHandler)
    }
  }, [target])

  return (
    <div className={`${classes.content} ${toggle && classes.toggleContent}`}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.back} onClick={handleClickBack}>
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
            <div ref={endRef} />
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
