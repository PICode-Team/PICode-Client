import React, { useEffect, useRef, useState } from 'react'

import { chatStyle } from '../../../../styles/service/chatspace/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'
import Activitybar from './activitybar/activitybar'
import Content from './content/content'
import Sidebar from './sidebar/sidebar'
import { fetchSet } from '../../../context/fetch'
import CreateChannel from '../common/createChannel'
import ResponsiveChat from './responsive/resposiveChat'
import { useWs } from '../../../context/websocket'
import MediaView from '../common/mediaView'

interface IChatProps {
  toggle: boolean
}

function Chat(props: IChatProps) {
  const { toggle } = props
  const classes = chatStyle()
  const [messageList, setMessageList] = useState<IChat[]>([])
  const [channelList, setChannelList] = useState<IChannel[]>([])
  const [userList, setUserList] = useState<IUser[]>([])
  const [thread, setThread] = useState<IThread | null>(null)
  const [typingUserList, setTypingUserList] = useState<IUser[]>([])
  const [target, setTarget] = useState<IChannel | null>(null)
  const [newMessage, setNewMessage] = useState<boolean>(false)
  const [modal, setModal] = useState<boolean>(false)
  const [userId, setUserId] = useState<string | null>(null)
  const [mediaViewData, setMediaViewData] = useState<string[] | null>(null)
  const ws: any = useWs()

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
          if (message.data !== undefined) {
            const messages: IChat[] = message.data.map((v: any) => {
              return {
                user: v.sender,
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
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  useEffect(() => {
    ws.addEventListener('message', chatWebSocketHandler)
    if (channelList.length === 0) {
      getChat()
    }

    return () => {
      ws.removeEventListener('message', chatWebSocketHandler)
    }
  }, [ws?.readyState, target, messageList, channelList])

  return (
    <React.Fragment>
      <div className={classes.chat}>
        <Sidebar channelList={channelList} setTarget={setTarget} setModal={setModal} />
        {target !== null ? (
          <Content target={target} messageList={messageList} typingUserList={typingUserList} setThread={setThread} particiapntList={userList} setMediaViewData={setMediaViewData} />
        ) : (
          <div className={classes.emptyWrapper}>Select a channel and start the conversation.</div>
        )}
        {thread !== null && <Activitybar thread={thread} setThread={setThread} particiapntList={userList} setMediaViewData={setMediaViewData} />}
        <ResponsiveChat
          messageList={messageList}
          newMessage={newMessage}
          particiapntList={userList}
          target={target}
          thread={thread}
          channelList={channelList}
          toggle={toggle}
          setTarget={setTarget}
          setModal={setModal}
          setThread={setThread}
          setMediaViewData={setMediaViewData}
        />
        <CreateChannel modal={modal} setModal={setModal} />
        {mediaViewData !== null && <MediaView mediaViewData={mediaViewData} setMediaViewData={setMediaViewData} />}
      </div>
    </React.Fragment>
  )
}

export default Chat
