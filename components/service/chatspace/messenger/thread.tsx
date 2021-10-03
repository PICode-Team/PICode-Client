import { useEffect, useRef } from 'react'

import { AttachFile, Close, FilterNone, NavigateBefore, Send, SentimentSatisfied } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/chatspace/messenger'
import { IThread } from '../../../../types/chat.types'
import MessageBox from '../common/messageBox'
import Boundary from '../common/boundary'
import { renderMessage } from '../chat/content/content'
import { IUser } from '../../../../types/user.types'
import { useWs } from '../../../context/websocket'

interface IThreadProps {
  newMessage: boolean
  userId: string
  thread: IThread
  particiapntList: IUser[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Thread(props: IThreadProps) {
  const { setOpen, newMessage, userId, thread, setThread, particiapntList } = props
  const classes = messengerStyle()
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
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
            parentChatId: thread.parentId,
          },
        })
      )
    }
  }

  const messageInfo = {
    user: thread.parentUser,
    message: thread.parentMessage,
    time: thread.parentTime,
    threadList: [],
    chatId: '',
  }

  const handleSendMessage = () => {
    if (messageRef === null) return
    if (messageRef.current!.value === '') return

    sendMessage(thread.chatName, messageRef.current!.value)
    messageRef.current!.value = ''
    endRef.current!.scrollIntoView()
  }

  const handleClickBack = () => {
    setThread(null)
  }

  const handleLinkChatspace = () => {
    window.location.href = '/chatspace'
  }

  const handleClickCancel = () => {
    setOpen(false)
  }

  const pressEnterHandler = (event: KeyboardEvent) => {
    if (event.key !== 'Enter') return
    if (messageRef === null) return
    if (messageRef.current!.value === '') return

    const { activeElement } = document
    if (activeElement !== messageRef.current) return

    sendMessage(thread.chatName, messageRef.current!.value)
    messageRef.current!.value = ''
    endRef.current!.scrollIntoView()
  }

  useEffect(() => {
    document.addEventListener('keypress', pressEnterHandler)
    return () => {
      document.removeEventListener('keypress', pressEnterHandler)
    }
  }, [])

  return (
    <div className={classes.messenger} style={{ boxShadow: 'none' }}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.back} onClick={handleClickBack}>
            <NavigateBefore />
          </div>
          <div className={classes.opponent}>
            <div className={classes.name}>
              <span className={classes.text}>Thread</span>
              {thread.chatName}
            </div>
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
            <MessageBox messageInfo={messageInfo} reverse={thread.parentUser === userId} setThread={setThread} particiapntList={particiapntList} target={null} />
            {thread.messageList.length > 0 && <Boundary text={`${thread.messageList.length} replies`} />}
            {renderMessage(thread.messageList, userId, true, setThread, null, particiapntList)}
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

export default Thread
