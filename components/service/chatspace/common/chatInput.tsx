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
import { mentionRegex } from '../../../context/regex'
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
  const [messageContent, setMessageContent] = useState<string>('')
  const [mentionIndex, setMentionIndex] = useState<number>(0)
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

  const createAlarm = (targetList: string[]) => {
    const checkAlarm = targetList.reduce((a, c) => {
      return { ...a, [c]: true }
    }, {})

    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'alarm',
          type: 'createAlarm',
          data: {
            type: 'chat',
            location: '/chatspace/',
            content: 'mention you',
            checkAlarm,
          },
        })
      )
    }
  }

  const handleSendMessage = () => {
    if (messageRef === null) return
    if (messageRef.current === null) return
    if (messageRef.current!.innerHTML === '') return
    if (messageRef.current!.innerHTML.replaceAll('<br>', '') === '') return

    const regexMention = messageRef.current.innerHTML.split(mentionRegex)

    for (let i = 0; i < regexMention.length; i++) {
      if (regexMention[i].indexOf('@') === 0) {
        if (i + 1 < regexMention.length) {
          if (regexMention[i + 1] === '/picode-mention') {
            const value = regexMention[i]

            if (value === '@here') {
              createAlarm(participantList.map((v) => v.userId))
            } else if (value === '@channel') {
              createAlarm(target.chatParticipant)
            } else {
              createAlarm([value])
            }
          }
        }
      }
    }

    sendMessage(target?.chatName ?? (target.userId as string), messageRef.current!.innerHTML)
    messageRef.current!.innerHTML = ''
    setTimeout(() => {
      endRef.current!.scrollIntoView()
    }, 100)
  }

  const handleChatInputKeypress = (event: any) => {
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') return

    if (event.key === 'Enter' && event.shiftKey !== true) {
      event.preventDefault()
      if (onMention === true) {
        const target = [...participantList.map((v) => v.userName), 'here', 'channel'].filter((v) => v.indexOf(messageContent) === 0)[mentionIndex]
        if (target !== undefined) {
          const atSignsplitedText: string[] = event.target.innerHTML.split('@')
          const cursor = document.getSelection()!.anchorOffset - 1
          let sum = 0
          const result: string[] = []

          atSignsplitedText.map((v, i) => {
            sum += v.length
            if (sum + i > cursor) {
              const prev = result.pop()
              result.push(`${prev}<picode-mention>@${target}</picode-mention>`)
            } else {
              result.push(v)
            }
          })

          console.log(result.join('@'))

          messageRef.current!.innerHTML = result.join('@')

          return
        }
      }
    } else {
      return
    }

    handleSendMessage()
  }

  const handleChatInputKeyup = (event: any) => {
    if (event.key === 'Escape' || event.key === 'Enter') {
      setOnMention(false)
      return
    }
    if (event.key === 'Shift') return

    if (onMention === true) {
      const lastIndex = [...participantList.map((v) => v.userName), 'here', 'channel'].filter((v) => v.indexOf(messageContent) === 0).length - 1
      if (event.key === 'ArrowDown') {
        if (mentionIndex === lastIndex) {
          setMentionIndex(0)
        } else {
          setMentionIndex(mentionIndex + 1)
        }
        return
      } else if (event.key === 'ArrowUp') {
        if (mentionIndex === 0) {
          setMentionIndex(lastIndex)
        } else {
          setMentionIndex(mentionIndex - 1)
        }
        return
      }
    }

    const splitedText = event.target.innerHTML.split('')
    const cursor = document.getSelection()!.anchorOffset - 1

    if (onMention === true) {
      if (splitedText.indexOf('@') === -1) {
        setOnMention(false)
      } else {
        setMentionLeft(`${20 + (splitedText.length - splitedText.reverse().indexOf('@')) * 6}px`)
      }
    }

    const atSignsplitedText: string[] = event.target.innerHTML.split('@')
    let sum = 0

    atSignsplitedText.forEach((value) => {
      if (sum + value.length > cursor) {
        setMessageContent(value)
      }

      sum += value.length + 1
    })

    const mentionCheck = (() => {
      for (let i = 0; i < 5; i++) {
        if (cursor - i === -1) return false

        if (splitedText[cursor - i] === '@') {
          if (cursor - i - 1 === -1 || splitedText[cursor - i - 1] === ' ') {
            setMentionLeft(`${20 + (cursor - i) * 6}px`)
            return true
          }
        }
      }
      return ['here', 'channel', participantList.map((v) => v.userName)].some((v) => v.indexOf(messageContent) === 0)
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
      const message = `<picode-mention>@${target}</picode-mention>`.split('')
      const tailText = originText.splice(atSignPosition)

      const insertedText = [...originText.slice(1), ...message, '&nbsp', ...tailText]

      messageRef.current.focus()
      messageRef.current.innerHTML = insertedText.join('')
    }
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
          {[...participantList.map((v) => v.userName), 'here', 'channel']
            .filter((v) => v.indexOf(messageContent) === 0)
            .map((v, i) => {
              if (v === 'here') {
                return (
                  <div className={`${classes.mentionTarget} ${mentionIndex === i && classes.active}`} onClick={handleMentionTargetClick('here')}>
                    @ here
                  </div>
                )
              }

              if (v === 'channel') {
                return (
                  <div className={`${classes.mentionTarget} ${mentionIndex === i && classes.active}`} onClick={handleMentionTargetClick('channel')}>
                    @ channel
                  </div>
                )
              }

              return (
                <div key={`mention-helper-${i}`} className={`${classes.mentionTarget} ${mentionIndex === i && classes.active}`} onClick={handleMentionTargetClick(v)}>
                  {v}
                </div>
              )
            })}
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
