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
  const ws: any = useWs()

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
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'getChat',
        })
      )
    }
  }

  const getChatLog = (page: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN && target !== null) {
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
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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
          const messages: IChat[] = []
          message.data.forEach((v: any) => {
            messages.push({
              user: v.sender,
              message: v.message,
              time: v.time,
              chatId: v.chatId,
              threadList: v.threadList,
            })
          })

          setMessageList([...messageList, ...messages])

          break

        case 'getChatLogList':
          message.data.forEach((v: string) => {
            getChatLog(v)
          })

          break

        case 'sendMessage':
          if (message.data.parentChatId !== undefined) {
            const messages: IChat[] = messageList.map((v) => {
              if (v.chatId === message.data.parentChatId) {
                const newMessageData = {
                  user: message.data.sender,
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
            if (message.data.sender !== userId) {
              setNewMessage(true)
              setTimeout(() => {
                setNewMessage(false)
              }, 3000)
            }

            setMessageList([
              ...messageList,
              {
                user: message.data.sender,
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

  const handleResize = () => {
    // if (document.getElementsByClassName(classes.newMessage).length > 0) {
    //   (
    //     document.getElementsByClassName(classes.newMessage)[0] as HTMLElement
    //   ).style.top = `${(Number(messageRef.current?.offsetTop) ?? 0) - 44}px`;
    // }
  }

  useEffect(() => {
    setMessageList([])

    if (target !== null) {
      getChatLogList(target.chatName)
    }
  }, [target])

  useEffect(() => {
    getUserList()

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    ws.addEventListener('message', chatWebSocketHandler)
    getChat()

    return () => {
      ws.removeEventListener('message', chatWebSocketHandler)
    }
  }, [ws?.readyState, target, messageList])

  if (open) {
    return (
      <React.Fragment>
        {target === null ? (
          <Home channelList={channelList} setOpen={setOpen} setTarget={setTarget} />
        ) : (
          <Room
            userId={userId.userId}
            target={target}
            messageList={messageList}
            newMessage={newMessage}
            thread={thread}
            particiapntList={[]}
            setTarget={setTarget}
            setOpen={setOpen}
            setThread={setThread}
            setMediaViewData={setMediaViewData}
          />
        )}
        {thread !== null && <Thread userId={userId.userId} newMessage={false} thread={thread} particiapntList={[]} setOpen={setOpen} setThread={setThread} setMediaViewData={setMediaViewData} />}
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
