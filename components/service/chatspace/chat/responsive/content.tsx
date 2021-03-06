import { useEffect, useRef, useState } from 'react'

import { NavigateBefore, AttachFile, SentimentSatisfied, Send } from '@material-ui/icons'

import { responsiveContentStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../../types/chat.types'
import { renderMessage } from '../../chat/content/content'
import { IUser } from '../../../../../types/user.types'
import { useWs } from '../../../../context/websocket'
import { fetchSet } from '../../../../context/fetch'
import { fontTagRegex, mentionRegex } from '../../../../context/regex'

interface IContentProps {
  target: IChannel
  messageList: IChat[]
  newMessage: boolean
  userId: string
  thread: IThread | null
  participantList: IUser[]
  toggle: boolean
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>
}

function Content(props: IContentProps) {
  const { setNewMessage, target, messageList, newMessage, userId, thread, participantList, setTarget, setThread, toggle, setMediaViewData } = props
  const classes = responsiveContentStyle()
  const messageRef = useRef<HTMLInputElement>(null)
  const endRef = useRef<HTMLInputElement>(null)
  const [onMention, setOnMention] = useState<boolean>(false)
  const [mentionLeft, setMentionLeft] = useState<string>('')
  const [messageContent, setMessageContent] = useState<string>('')
  const [mentionIndex, setMentionIndex] = useState<number>(0)
  const [userImage, setUserImage] = useState<any>(null)
  const ws: any = useWs()

  const makeImageUuid = async () => {
    if (userImage === undefined) return

    const formData = new FormData()
    formData.append('uploadFile', userImage)
    const response = await fetchSet('/data', 'POST', false, formData)
    const { code, uploadFileId } = await response.json()

    if (code === 200) {
      if (messageRef.current !== null) {
        messageRef.current.innerHTML = messageRef.current.innerHTML + ' ' + `<img src="/api/temp/${uploadFileId}">`
      }
    }
  }

  useEffect(() => {
    makeImageUuid()
  }, [userImage])

  const sendMessage = (target: string, message: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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
            location: `/chatspace?target=${target.chatName}`,
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

    if (messageRef.current!.textContent?.length === 0 && fontTagRegex.exec(messageRef.current!.innerHTML) !== null) {
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

  const clickHandler = (event: MouseEvent) => {
    if (messageRef !== null && messageRef.current !== null) {
      if (document.activeElement !== messageRef.current) {
        setOnMention(false)
      }
    }
  }

  const handleChatInputPaste = (event: any) => {
    const items = (event.clipboardData || event.originalEvent.clipboardData).items

    for (const index in items) {
      const item = items[index]
      if (item.kind === 'file') {
        event.preventDefault()
        event.stopPropagation()

        const blob = item.getAsFile()
        const reader = new FileReader()
        reader.onload = function (event: any) {
          setUserImage(blob)
        }
        reader.readAsDataURL(blob)
      }
    }
  }

  useEffect(() => {
    document.addEventListener('click', clickHandler)
    return () => {
      document.removeEventListener('click', clickHandler)
    }
  }, [target])

  const handleClickBack = () => {
    setTarget(null)
  }

  const handleResize = () => {
    const targetList = document.getElementsByClassName(classes.newMessage)
    if (targetList.length > 0) {
      for (let i = 0; i < targetList.length; i++) {
        ;(targetList[i] as HTMLElement).style.top = `${(Number(messageRef.current?.offsetTop) ?? 0) - 44}px`
      }
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

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
            {renderMessage(messageList, userId, false, setThread, target, participantList, setMediaViewData)}
            <div ref={endRef} />
          </div>
        </div>

        {onMention === true && (
          <div className={classes.mentionHelper} style={{ marginLeft: mentionLeft }}>
            {[...participantList.map((v) => v.userName), 'here', 'channel']
              .filter((v) => v.indexOf(messageContent) === 0)
              .map((v, i) => {
                if (v === 'here') {
                  return (
                    <div key={`mention-helper-${i}`} className={`${classes.mentionTarget} ${mentionIndex === i && classes.active}`} onClick={handleMentionTargetClick('here')}>
                      @ here
                    </div>
                  )
                }

                if (v === 'channel') {
                  return (
                    <div key={`mention-helper-${i}`} className={`${classes.mentionTarget} ${mentionIndex === i && classes.active}`} onClick={handleMentionTargetClick('channel')}>
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
          <div
            id="editor"
            className={classes.customInput}
            contentEditable={true}
            onKeyUp={handleChatInputKeyup}
            onKeyPress={handleChatInputKeypress}
            onPaste={handleChatInputPaste}
            ref={messageRef}
          ></div>
          <div className={classes.send} onClick={handleSendMessage}>
            <Send />
          </div>
        </div>
      </div>
      <div
        style={{
          top: `${(Number(messageRef.current?.offsetTop) ?? 0) - 44}px`,
        }}
        className={`${classes.newMessage} ${newMessage && classes.visible} ${toggle && classes.togglePosition}`}
      >
        <div
          onClick={() => {
            endRef.current?.scrollIntoView({ behavior: 'smooth' })
            setNewMessage(false)
          }}
        >
          New Message
        </div>
      </div>
    </div>
  )
}

export default Content
