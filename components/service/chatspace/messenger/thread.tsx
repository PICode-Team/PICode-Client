import { useRef } from 'react'

import { AttachFile, Close, FilterNone, NavigateBefore, Send, SentimentSatisfied } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/messenger'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import MessageBox from '../common/messageBox'
import Boundary from '../common/boundary'
import { renderMessage } from '../chat/content/content'
import { IUser } from '../../../../types/user.types'

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

  const messageInfo = {
    user: thread.parentUser,
    message: thread.parentMessage,
    time: thread.parentTime,
    threadList: [],
    chatId: '',
  }

  const handleSendMessage = () => {
    if (messageRef.current && messageRef.current.value !== '') {
      // sendMessage(target, messageRef.current.value)
      messageRef.current.value = ''
      endRef.current!.scrollIntoView()
    }
  }

  return (
    <div className={classes.messenger} style={{ boxShadow: 'none' }}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div
            className={classes.back}
            onClick={() => {
              setThread(null)
            }}
          >
            <NavigateBefore />
          </div>
          <div className={classes.opponent}>
            <div className={classes.name}>
              <span
                style={{
                  marginRight: '4px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Thread
              </span>
              {thread.chatName}
            </div>
            <div className={classes.online}></div>
          </div>
          <div
            className={classes.expand}
            onClick={() => {
              window.location.href = '/chat'
            }}
          >
            <FilterNone />
          </div>
          <div
            className={classes.cancel}
            onClick={() => {
              setOpen(false)
            }}
          >
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
