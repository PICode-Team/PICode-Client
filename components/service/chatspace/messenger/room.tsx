import React, { useEffect, useRef } from 'react'

import { AttachFile, Close, FilterNone, NavigateBefore, Send, SentimentSatisfied } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/chatspace/messenger'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { renderMessage } from '../chat/content/content'
import { IUser } from '../../../../types/user.types'
import { useWs } from '../../../context/websocket'

interface IRoomProps {
  target: IChannel
  messageList: IChat[]
  newMessage: boolean
  userId: string
  thread: IThread | null
  particiapntList: IUser[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Room(props: IRoomProps) {
  const { target, messageList, newMessage, userId, thread, particiapntList, setOpen, setTarget, setThread } = props
  const classes = messengerStyle()
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

  useEffect(() => {
    document.addEventListener('keypress', pressEnterHandler)
    return () => {
      document.removeEventListener('keypress', pressEnterHandler)
    }
  }, [target])

  const handleClickBack = () => {
    setTarget(null)
  }

  const handleLinkChatspace = () => {
    window.location.href = `/chatspace?chatName=${target?.chatName ?? (target.userId as string)}`
  }

  const handleClickCancel = () => {
    setOpen(false)
  }

  return (
    <div className={classes.messenger}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.back} onClick={handleClickBack}>
            <NavigateBefore />
          </div>
          <div className={classes.opponent}>
            <div className={classes.name}>{target.chatName ?? (target.userId as string)}</div>
            <div className={classes.online}></div>
          </div>
          <div className={classes.expand} onClick={handleLinkChatspace}>
            <FilterNone />
          </div>
          <div className={classes.cancel} onClick={handleClickCancel}>
            <Close />
          </div>
        </div>
        <div className={classes.body}>
          <div className={classes.content}>
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

export default React.memo(Room)
