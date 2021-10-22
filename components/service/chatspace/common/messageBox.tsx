import { FavoriteBorderOutlined, SmsOutlined } from '@material-ui/icons'
import React, { useEffect, useRef, useState } from 'react'
import { messageBoxStyle } from '../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IOpenGraph } from '../../../../types/openGraph.types'
import { IUser } from '../../../../types/user.types'
import { fetchSet } from '../../../context/fetch'
import { domainURLRegex, imageRegex, trimRegex } from '../../../context/regex'
import { uuidv4 } from '../../../context/uuidv4'

interface IMessageBoxProps {
  messageInfo: IChat
  reverse: boolean
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  target: IChannel | null
  particiapntList: IUser[]
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
}

const getTimeText = (time: string) => {
  const timeValue = time.split(' ')[1].split(':')
  const meridiem = Number(timeValue[0]) > 11 ? 'PM' : 'AM'
  const hour = (() => {
    const convertedHour = Number(timeValue[0])

    if (convertedHour % 12 === 0) {
      return '12'
    }

    if (convertedHour < 12) {
      return timeValue[0]
    } else {
      if (convertedHour % 12 < 10) {
        return `0${convertedHour % 12}`
      }

      return `${convertedHour % 12}`
    }
  })()

  return `${meridiem} ${hour}:${timeValue[1]}`
}

function MessageBox(props: IMessageBoxProps) {
  const { messageInfo, reverse, target, particiapntList, setThread, setMediaViewData } = props
  const { user, message, time, chatId, threadList } = messageInfo
  const classes = messageBoxStyle()
  const thumbnailUrl = particiapntList.find((v) => v.userId === user)?.userThumbnail
  const [url, setUrl] = useState<string | null>(null)
  const [preview, setPreview] = useState<IOpenGraph | null>(null)
  const [imageList, setImageList] = useState<string[]>([])
  const [empty, setEmpty] = useState<boolean>(false)
  const contentRef = useRef<HTMLSpanElement>(null)

  const handleSetThread = () => {
    if (target !== null) {
      setThread({
        chatName: target.chatName,
        messageList: threadList,
        parentId: chatId,
        parentMessage: message,
        parentTime: time,
        parentUser: user,
        parentChatParticipant: target.chatParticipant,
      })
    }
  }

  const getOpenGraphMetaData = async (url: string) => {
    const response = await fetchSet('/openGraph', 'POST', true, JSON.stringify({ url }))
    const { metaData, code } = await response.json()

    if (code !== 200) return

    setPreview(metaData)
  }

  const handleMediaClick = (mediaList: string[]) => () => {
    setMediaViewData(mediaList)
  }

  useEffect(() => {
    const regexMessage = domainURLRegex.exec(message)

    if (regexMessage === null) return

    setUrl(regexMessage[0])
  }, [])

  useEffect(() => {
    if (url === null) return

    getOpenGraphMetaData(url)
  }, [url])

  useEffect(() => {
    if (contentRef === null) return
    if (contentRef.current === null) return

    const URLRegexMessage = domainURLRegex.exec(message)
    const imageRegexMessage = message
      .split(imageRegex)
      .filter((v) => v.indexOf(' src=') === 0)
      .map((v) => v.trim().replace(trimRegex, ''))

    setImageList(imageRegexMessage)

    const processedMessage = (() => {
      if (URLRegexMessage !== null) {
        return message.replace(URLRegexMessage[0], `<a href="${URLRegexMessage[0]}">${URLRegexMessage[0]}</a>`).replace(imageRegex, '')
      }

      return message.replace(imageRegex, '')
    })()

    if (processedMessage === '') {
      setEmpty(true)
    }
    contentRef.current.innerHTML = processedMessage
  }, [contentRef, contentRef.current])

  return (
    <div className={`${classes.messageBox} ${reverse && classes.reversedMessageBox}`}>
      {!reverse && <div className={classes.thumbnail} style={thumbnailUrl !== undefined ? { backgroundImage: `url('${process.env.NEXT_FE_API_URL}/api/temp/${thumbnailUrl}`, backgroundSize: 'cover' } : {}} />}
      <div className={`${target !== null && classes.messageInfo}`}>
        {!reverse && <div className={classes.target}>{user}</div>}
        <div className={`${classes.textWrapper} ${reverse && classes.reversedTextWrapper}`}>
          {!empty && <span className={classes.messageText} ref={contentRef}></span>}
          <span className={classes.time}>
            <strong>
              <span>{getTimeText(time)}</span>
            </strong>
            {target !== null && (
              <strong>
                <div className={classes.messageInteraction}>
                  <div className={classes.interactionIcon} onClick={handleSetThread}>
                    <SmsOutlined />
                  </div>
                  <div className={classes.interactionDivider} />
                  <div className={classes.interactionIcon}>
                    <FavoriteBorderOutlined />
                  </div>
                </div>
              </strong>
            )}
          </span>
        </div>
        {target !== null && threadList.length > 0 && (
          <div className={classes.thread} onClick={handleSetThread}>
            <div className={classes.threadParticipant}>
              {particiapntList.map((v, i) => (
                <div key={`${chatId}-thread-${i}`}></div>
              ))}
            </div>
            <div className={classes.threadCount}>{threadList.length} replies</div>
            <div className={classes.lastThread}>Last reply {threadList.slice(-1)[0].time.split(' ')[0]}</div>
          </div>
        )}
        {imageList.length > 0 && (
          <div className={classes.imageWrapper}>
            {imageList.map((v) => (
              <img className={classes.contentImage} key={`message-key-${uuidv4()}`} src={v} style={{ marginTop: `${empty ? 2 : 10}px` }} onClick={handleMediaClick(imageList)} />
            ))}
          </div>
        )}
        {preview !== null && preview.url !== undefined && (
          <a className={classes.preview} href={preview.url}>
            {preview.image !== undefined && <div className={classes.image} style={{ backgroundImage: `url('${preview.image.url}')` }}></div>}
            <div className={classes.title}>{preview.title}</div>
            <div className={classes.description}>{preview.description}</div>
            <div className={classes.link}>{preview.url}</div>
          </a>
        )}
      </div>
    </div>
  )
}

export default MessageBox
