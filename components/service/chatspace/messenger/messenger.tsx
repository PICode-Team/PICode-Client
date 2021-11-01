import React, { useEffect, useState } from 'react'

import { ChatBubbleOutline } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/chatspace/messenger'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import Home from './home'
import Room from './room'
import Thread from './thread'
import { useRouter } from 'next/router'
import { useWs } from '../../../context/websocket'
import { fetchSet } from '../../../context/fetch'
import { IUser } from '../../../../types/user.types'
import MediaView from '../common/mediaView'

interface IMessengerProps {
  userId: IUser
}

function Messenger(props: IMessengerProps) {
  const router = useRouter()

  if (router.pathname === '/chatspace') {
    return <React.Fragment></React.Fragment>
  }

  const { userId } = props
  const classes = messengerStyle()
  const [open, setOpen] = useState<boolean>(false)
  const [target, setTarget] = useState<IChannel | null>(null)
  const [channelList, setChannelList] = useState<IChannel[]>([])
  const [messageList, setMessageList] = useState<IChat[]>([])
  const [userList, setUserList] = useState<IUser[]>([])
  const [newMessage, setNewMessage] = useState<boolean>(false)
  const [thread, setThread] = useState<IThread | null>(null)
  const [mediaViewData, setMediaViewData] = useState<string[] | null>(null)
  const [wsCheck, setWsCheck] = useState<number>(0)
  const [getChannelCheck, setGetChannelCheck] = useState<boolean>(false)
  const [timerId, setTimerId] = useState<NodeJS.Timeout | null>(null)
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const [participantList, setParticipantList] = useState<IUser[]>([])
  const ws: any = useWs()

  const getUserId = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { code, user } = await response.json()

    if (code === 200) {
      setUserInfo(user)
    }
  }

  useEffect(() => {
    getUserId()
  }, [])

  const handleOpenMessenger = () => {
    setOpen(true)
  }

  const getUserList = async () => {
    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code === 200) {
      setUserList(user)
    }
  }

  const getChat = () => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'getChat',
        })
      )
    }
  }

  const getChatLog = (page: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN && target !== null) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'getChatLog',
          data: {
            target: target.chatName,
            page: page,
          },
        })
      )
    }
  }

  const getChatLogList = (target: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'getChatLogList',
          data: {
            target: target,
          },
        })
      )
    }
  }

  const chatWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'chat') {
      switch (message.type) {
        case 'createChannel':
          getChat()
          break

        case 'getChat':
          setChannelList(message.data)
          break

        case 'getChatLog':
          if (message.data !== undefined) {
            const messages: IChat[] = message.data.map((v: any) => {
              return {
                sender: v.sender,
                message: v.message,
                time: v.time,
                chatId: v.chatId,
                threadList: v.threadList,
              }
            })

            setMessageList([...messageList, ...messages])
          }

          break

        case 'getChatLogList':
          message.data.forEach((v: string) => {
            getChatLog(v)
          })

          break

        case 'sendMessage':
          setChannelList(
            channelList.map((v, i) => {
              if (v.chatName === message.data.chatName) {
                return {
                  ...v,
                  recentMessage: message.data.message,
                  recentTime: message.data.time,
                }
              }

              return v
            })
          )

          if (target === null) return
          if (target!.chatName !== message.data.chatName) return

          if (message.data.parentChatId !== undefined) {
            const messages: IChat[] = messageList.map((v) => {
              if (v.chatId === message.data.parentChatId) {
                const newMessageData = {
                  sender: message.data.sender,
                  message: message.data.message,
                  time: message.data.time,
                  chatId: message.data.chatId ?? '',
                  threadList: message.data.threadList ?? [],
                }

                if (thread !== null) {
                  setThread({ ...thread, messageList: [...thread?.messageList, newMessageData] })
                }

                return {
                  ...v,
                  threadList: [...v.threadList, newMessageData],
                }
              }

              return v
            })

            setMessageList(messages)
          } else {
            if (message.data.sender !== userInfo?.userId) {
              setNewMessage(true)
              if (timerId !== null) {
                clearTimeout(timerId)
              }
              const timer = setTimeout(() => {
                setNewMessage(false)
                setTimerId(null)
              }, 3000)
              setTimerId(timer)
            }

            setMessageList([
              ...messageList,
              {
                sender: message.data.sender,
                message: message.data.message,
                time: message.data.time,
                chatId: message.data.chatId,
                threadList: message.data.threadList ?? [],
              },
            ])
          }

          break
      }
    }
  }

  const getParticipantList = async () => {
    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code === 200) {
      setParticipantList(user)
    }
  }

  useEffect(() => {
    setMessageList([])

    if (target !== null) {
      getChatLogList(target.chatName)
    }
  }, [target])

  useEffect(() => {
    getUserList()
  }, [])

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', chatWebSocketHandler)
      if (getChannelCheck === false) {
        getChat()
        setGetChannelCheck(true)
      }

      return () => {
        ws.removeEventListener('message', chatWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [ws?.readyState, wsCheck, target, messageList])

  if (open) {
    return (
      <React.Fragment>
        {target === null ? (
          <Home channelList={channelList} setOpen={setOpen} setTarget={setTarget} />
        ) : (
          <Room
            toggle={false}
            userId={userId.userId}
            target={target}
            messageList={messageList}
            newMessage={newMessage}
            thread={thread}
            participantList={participantList}
            setNewMessage={setNewMessage}
            setTarget={setTarget}
            setOpen={setOpen}
            setThread={setThread}
            setMediaViewData={setMediaViewData}
          />
        )}
        {thread !== null && (
          <Thread userId={userId.userId} newMessage={false} thread={thread} participantList={participantList} setOpen={setOpen} setThread={setThread} setMediaViewData={setMediaViewData} />
        )}
        {mediaViewData !== null && <MediaView mediaViewData={mediaViewData} setMediaViewData={setMediaViewData} />}
      </React.Fragment>
    )
  }

  return (
    <div className={classes.chatButton} onClick={handleOpenMessenger}>
      <ChatBubbleOutline />
    </div>
  )
}

export default Messenger
