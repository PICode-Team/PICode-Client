import React, { useRef } from 'react'

import { AttachFile, Close, FilterNone, NavigateBefore, Send, SentimentSatisfied } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/messenger'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { renderMessage } from '../chat/content/content'
import { IUser } from '../../../../types/user.types'

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

  const enterEvent = (event: KeyboardEvent) => {
    if (event.key === 'Enter') {
      if (messageRef.current && target !== null && messageRef.current.value !== '') {
        // sendMessage(target, messageRef.current.value)
        messageRef.current.value = ''
        endRef.current!.scrollIntoView()
      }
    }
  }

  const handleSendMessage = () => {
    if (messageRef.current && messageRef.current.value !== '') {
      // sendMessage(target, messageRef.current.value);
      // messageRef.current.value = "";
      // endRef.current!.scrollIntoView();
    }
  }

  // useEffect(() => {
  //   document.addEventListener("keypress", enterEvent);
  //   return () => {
  //     document.removeEventListener("keypress", enterEvent);
  //   };
  // }, [target]);

  // useEffect(() => {
  //   setMessageList([]);
  // }, []);

  return (
    <div className={classes.messenger}>
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
          <div className={classes.opponent}>
            <div className={classes.name}>{target}</div>
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
