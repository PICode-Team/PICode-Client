import { Link } from '@material-ui/core'
import {
  AlternateEmail,
  AttachFile,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  Send,
  SentimentSatisfiedOutlined,
  TextFormatOutlined,
  Code,
} from '@material-ui/icons'
import { useEffect } from 'react'

import { chatInputStyle } from '../../../../styles/service/chatspace/chat'
import { IChannel } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import { useWs } from '../../../context/websocket'
import Entering from './entering'

interface IChatInputProps {
  messageRef: React.RefObject<HTMLInputElement>
  endRef: React.RefObject<HTMLDivElement>
  typingUserList: IUser[]
  target: IChannel
  parentChatId?: string
}

function ChatInput(props: IChatInputProps) {
  const { messageRef, endRef, typingUserList, target, parentChatId } = props
  const classes = chatInputStyle()
  const ws: any = useWs()

  const sendMessage = (target: string, message: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.CONNECTING) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'sendMessage',
          data: {
            target,
            message,
            parentChatId,
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
  }, [])

  return (
    <div className={classes.input}>
      <div className={classes.inputBox}>
        <input type="text" ref={messageRef} />
        <div className={classes.interaction}>
          <div>
            <div>
              <FormatBold className={classes.formatBold} />
            </div>
            <div>
              <FormatItalic className={classes.formatItalic} />
            </div>
            <div>
              <FormatStrikethrough className={classes.formatStrikethrough} />
            </div>
            <div>
              <Code className={classes.code} />
            </div>
            <div>
              <Link className={classes.link} />
            </div>
            <div>
              <FormatListNumbered className={classes.formatListNumbered} />
            </div>
            <div>
              <FormatListBulleted className={classes.formatListBulleted} />
            </div>
          </div>
          <div>
            <div>
              <TextFormatOutlined className={classes.textFormat} />
            </div>
            <div>
              <AlternateEmail className={classes.alternateEmail} />
            </div>
            <div>
              <SentimentSatisfiedOutlined className={classes.sentimentSatisfied} />
            </div>
            <div>
              <AttachFile className={classes.attachFile} />
            </div>
            <div onClick={handleSendMessage}>
              <Send className={classes.send} />
            </div>
          </div>
        </div>
      </div>
      {typingUserList.length > 0 && <Entering typingUserList={typingUserList} />}
    </div>
  )
}

export default ChatInput
