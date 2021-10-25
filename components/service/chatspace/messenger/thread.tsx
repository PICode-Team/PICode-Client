import { useEffect, useRef, useState } from 'react'

import { AttachFile, Close, FilterNone, NavigateBefore, Send, SentimentSatisfied } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/chatspace/messenger'
import { IThread } from '../../../../types/chat.types'
import MessageBox from '../common/messageBox'
import Boundary from '../common/boundary'
import { renderMessage } from '../chat/content/content'
import { IUser } from '../../../../types/user.types'
import { useWs } from '../../../context/websocket'
import { fetchSet } from '../../../context/fetch'
import { fontTagRegex, mentionRegex } from '../../../context/regex'

interface IThreadProps {
  newMessage: boolean
  userId: string
  thread: IThread
  particiapntList: IUser[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
}

function Thread(props: IThreadProps) {
  const { setOpen, newMessage, userId, thread, setThread, particiapntList, setMediaViewData } = props
  const classes = messengerStyle()
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLDivElement>(null)
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
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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

  const createAlarm = (targetList: string[]) => {
    const checkAlarm = targetList.reduce((a, c) => {
      return { ...a, [c]: true }
    }, {})

    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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

  const messageInfo = {
    user: thread.parentUser,
    message: thread.parentMessage,
    time: thread.parentTime,
    threadList: [],
    chatId: '',
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
              createAlarm(thread.parentChatParticipant)
            } else {
              createAlarm([value])
            }
          }
        }
      }
    }

    sendMessage(thread.chatName, messageRef.current!.innerHTML)
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

          messageRef.current!.innerHTML = result.join('@')

          messageRef.current!.focus()

          const { focusNode } = window.getSelection()!

          window.getSelection()?.setBaseAndExtent(focusNode!, 1, focusNode!, 1)

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

    if (fontTagRegex.exec(messageRef.current!.innerHTML) !== null) {
      messageRef.current!.innerHTML = messageRef.current!.innerHTML.replace(fontTagRegex, '')

      const { focusNode } = window.getSelection()!

      if (messageRef.current!.innerHTML.length === 0) {
        window.getSelection()?.setBaseAndExtent(focusNode!, 0, focusNode!, 0)
      } else {
        window.getSelection()?.setBaseAndExtent(focusNode!, 1, focusNode!, 1)
      }
    }

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

    const mentionSplitedText = messageRef.current!.innerHTML.split('picode-mention')

    let check = false
    const tmp = []

    for (let i = 0; i < mentionSplitedText.length; i++) {
      if (mentionSplitedText[i].slice(-1) === '<' && i + 2 <= mentionSplitedText.length && mentionSplitedText[i + 1].slice(0, 2) === '>@') {
        const innerText = mentionSplitedText[i + 1].slice(2).slice(0, mentionSplitedText[i + 1].length - 4)
        const findTarget = [...participantList.map((v) => v.userName), 'here', 'channel'].find((v) => v === innerText)

        if (findTarget === undefined) {
          check = true
          tmp.push(mentionSplitedText[i].slice(0, mentionSplitedText[i].length - 1))
          tmp.push(innerText)
          i += 2
        } else {
          tmp.push(mentionSplitedText[i])
        }
      }
    }

    if (check === true) {
      if (messageRef.current === null) return

      messageRef.current.innerHTML = tmp.join('')

      window.getSelection()?.setBaseAndExtent(messageRef.current, 1, messageRef.current, 1)
    }

    const splitedText = event.target.innerHTML.split('')
    const cursor = document.getSelection()!.anchorOffset - 1

    if (onMention === true) {
      if (splitedText.indexOf('@') === -1) {
        setOnMention(false)
      } else {
        setMentionLeft(`${80 + (splitedText.length - splitedText.reverse().indexOf('@')) * 6}px`)
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
            setMentionLeft(`${80 + (cursor - i) * 6}px`)
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

      const { focusNode } = window.getSelection()!

      window.getSelection()?.setBaseAndExtent(focusNode!, focusNode?.textContent?.length ?? 0, focusNode!, focusNode?.textContent?.length ?? 0)

      setOnMention(false)
    }
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

  useEffect(() => {
    getParticipantList()
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
            <MessageBox messageInfo={messageInfo} reverse={thread.parentUser === userId} setThread={setThread} particiapntList={particiapntList} target={null} setMediaViewData={setMediaViewData} />
            {thread.messageList.length > 0 && <Boundary text={`${thread.messageList.length} replies`} />}
            {renderMessage(thread.messageList, userId, true, setThread, null, particiapntList, setMediaViewData)}
            <div ref={endRef}></div>
          </div>
        </div>
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
        <div className={classes.footer}>
          <div className={classes.attachFile}>
            <AttachFile />
          </div>
          <div className={classes.imoji}>
            <SentimentSatisfied />
          </div>
          <div id="editor" className={classes.customInput} contentEditable={true} onKeyUp={handleChatInputKeyup} onKeyPress={handleChatInputKeypress} ref={messageRef}></div>
          <div className={classes.send} onClick={handleSendMessage}>
            <Send />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Thread
