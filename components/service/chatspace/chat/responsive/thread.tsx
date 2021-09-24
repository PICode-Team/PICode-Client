import { useRef } from 'react'

import { AttachFile, NavigateBefore, Send, SentimentSatisfied } from '@material-ui/icons'

import { responsiveThreadStyle } from '../../../../../styles/service/chat'
import { IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Boundary from '../../common/boundary'
import MessageBox from '../../common/messageBox'
import { renderMessage } from '../content/content'

interface IThreadProps {
  newMessage: boolean
  userId: string
  thread: IThread
  particiapntList: IUser[]
  toggle: boolean
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Thread(props: IThreadProps) {
  const { newMessage, toggle, userId, thread, setThread, particiapntList } = props
  const classes = responsiveThreadStyle()
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
    <div className={`${classes.thread} ${toggle && classes.toggleThread}`}>
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
          <div className={classes.channel}>
            <div className={classes.name}>
              <span>Thread</span>
              {thread.chatName}
            </div>
            <div className={classes.online}></div>
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
