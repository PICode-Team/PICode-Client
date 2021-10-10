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
  Link,
} from '@material-ui/icons'
import React, { useEffect, useState } from 'react'

import { chatInputStyle } from '../../../../styles/service/chatspace/chat'
import { IChannel } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import { fetchSet } from '../../../context/fetch'
import { useWs } from '../../../context/websocket'
import Entering from './entering'

interface IChatInputProps {
  messageRef: React.RefObject<HTMLDivElement>
  endRef: React.RefObject<HTMLDivElement>
  typingUserList: IUser[]
  target: IChannel
  parentChatId?: string
}

function ChatInput(props: IChatInputProps) {
  const { messageRef, endRef, typingUserList, target, parentChatId } = props
  const classes = chatInputStyle()
  const [onMention, setOnMention] = useState<boolean>(false)
  const [mentionLeft, setMentionLeft] = useState<string>('')
  const [participantList, setParticipantList] = useState<IUser[]>([])
  const ws: any = useWs()

  const getParticipantList = async () => {
    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code === 200) {
      setParticipantList(user)
    }
  }

  const sendMessage = (target: string, message: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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

  const createAlarm = (target: string[]) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'alarm',
          type: 'createAlarm',
          data: {
            type: 'chat',
            location: '/chatspace/',
            content: 'mention you',
            checkAlarm: {},
          },
        })
      )
    }
  }

  const handleSendMessage = () => {
    if (messageRef === null) return
    if (messageRef.current!.innerHTML === '') return

    const elements = document.getElementsByTagName('picode-mention')

    for (let i = 0; i < elements.length; i++) {
      const value = elements[i].innerHTML

      if (value === 'here') {
        createAlarm(participantList.map((v) => v.userId))
        return
      } else if (value === 'channel') {
        createAlarm(target.chatParticipant)
        return
      } else {
        createAlarm([value])
      }
    }

    sendMessage(target?.chatName ?? (target.userId as string), messageRef.current!.innerHTML)
    messageRef.current!.innerHTML = ''
    endRef.current!.scrollIntoView()
  }

  const handleChatInputKeypress = (event: any) => {
    if (event.key === 'Enter' && event.shiftKey !== true) {
      event.preventDefault()
    } else {
      return
    }

    handleSendMessage()
  }

  const handleChatInputKeyup = (event: any) => {
    if (event.key === 'Enter') return

    if (event.key === 'Escape') {
      setOnMention(false)
      return
    }

    if (event.key === 'Shift') return

    const splitedText = event.target.innerHTML.split('')
    const cursor = document.getSelection()!.anchorOffset - 1

    if (onMention === true) {
      if (splitedText.indexOf('@') === -1) {
        setOnMention(false)
      } else {
        setMentionLeft(`${20 + (splitedText.length - splitedText.reverse().indexOf('@')) * 6}px`)
        return
      }
    }

    const mentionCheck = (() => {
      for (let i = 0; i < 5; i++) {
        if (cursor - i === -1) return false

        if (splitedText[cursor - i] === '@') {
          if (cursor - i - 1 === -1 || splitedText[cursor - i - 1] === ' ') {
            setMentionLeft(`${20 + (cursor - i) * 6}px`)
            return true
          }
        }
        if (splitedText[cursor - i] !== ' ') return false
      }
      return false
    })()

    if (mentionCheck === false) {
      setOnMention(false)
      return
    }

    setOnMention(true)
  }

  const handleMentionTargetClick = (target: string) => () => {
    if (messageRef !== null && messageRef.current !== null) {
      const originText = messageRef.current.innerHTML.split('')
      const atSignPosition = originText.length - originText.reverse().indexOf('@')
      const message = `<picode-mention>@${target}</picode-mention> `.split('')
      const tailText = originText.splice(atSignPosition)

      const insertedText = [...originText.slice(1), ...message, '&nbsp', ...tailText]

      messageRef.current.focus()
      messageRef.current.innerHTML = insertedText.join('')
    }
  }

  const handleMentionAllClick = () => {
    if (messageRef !== null && messageRef.current !== null) {
      const originText = messageRef.current.innerHTML.split('')
      const atSignPosition = originText.length - originText.reverse().indexOf('@')
      const message = '<picode-mention>@here</picode-mention>'.split('')
      const tailText = originText.splice(atSignPosition)

      const insertedText = [...originText.slice(1), ...message, '&nbsp', ...tailText]
      messageRef.current.innerHTML = insertedText.join('')

      // const range = new Range()
      // const editor = document.getElementById('editor')

      // if (editor !== null && editor.lastChild !== null) {
      //   console.log(messageRef.current.innerHTML.length)

      //   range.setStart(editor.lastChild, 0)
      //   range.setEnd(editor.lastChild, 0)

      //   document.getSelection()?.addRange(document.createRange())
      // }
    }
  }

  const handleMentionChannelClick = () => {
    if (messageRef !== null && messageRef.current !== null) {
      const originText = messageRef.current.innerHTML.split('')
      const atSignPosition = originText.length - originText.reverse().indexOf('@')
      const message = '<picode-mention >@channel</picode-mention> '.split('')
      const tailText = originText.splice(atSignPosition)

      const insertedText = [...originText.slice(1), ...message, '&nbsp', ...tailText]
      messageRef.current.innerHTML = insertedText.join('')
    }
  }

  const getMentionText = () => {}

  const mentionHelperRowVisible = (target: string) => {
    if (messageRef !== null && messageRef.current !== null) {
      const message = messageRef.current.innerHTML.split('')
      let cursor = document.getSelection()?.anchorOffset ?? -1
      const result = []

      while (true) {
        if (cursor === -1) break
        if (message[cursor] === '@') break

        result.push(message[cursor])
        cursor -= 1
      }

      const resultText = result.reverse().join('')
      if (resultText === '') return true

      console.log(resultText)

      return target.indexOf(resultText) === 0
    }

    return false
  }

  const clickHandler = (event: MouseEvent) => {
    if (messageRef !== null && messageRef.current !== null) {
      if (document.activeElement !== messageRef.current) {
        setOnMention(false)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [target])

  useEffect(() => {
    getParticipantList()
  }, [])

  return (
    <React.Fragment>
      {onMention === true && (
        <div className={classes.mentionHelper} style={{ marginLeft: mentionLeft }}>
          {participantList.map((v, i) => {
            if (!mentionHelperRowVisible(v.userName)) {
              return <React.Fragment></React.Fragment>
            }

            return (
              <div key={`mention-helper-${i}`} className={classes.mentionTarget} onClick={handleMentionTargetClick(v.userId)}>
                {v.userName}
              </div>
            )
          })}
          {mentionHelperRowVisible('here') && (
            <div className={classes.mentionTarget} onClick={handleMentionAllClick}>
              @ here
            </div>
          )}
          {mentionHelperRowVisible('channel') && (
            <div className={classes.mentionTarget} onClick={handleMentionChannelClick}>
              @ channel
            </div>
          )}
        </div>
      )}
      <div className={classes.input}>
        <div className={classes.inputBox}>
          <div id="editor" className={classes.customInput} contentEditable={true} onKeyUp={handleChatInputKeyup} onKeyPress={handleChatInputKeypress} ref={messageRef}></div>
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
    </React.Fragment>
  )
}

export default ChatInput
