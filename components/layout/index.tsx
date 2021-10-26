import React, { useCallback, useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import { throttle } from 'lodash'

import { layoutStyle } from '../../styles/layout/layout'
import { IPageProps } from '../../types/page.types'
import { sidebarData } from './data'
import Messenger from '../service/chatspace/messenger/messenger'
import Sidebar from './sidebar'
import Topbar from './topbar'
import { fetchSet } from '../context/fetch'
import UserMouse, { ISocketUserMouse, IUserMouse } from './userMouse'
import { IUser } from '../../types/user.types'
import { useWs } from '../context/websocket'

function Layout(props: IPageProps) {
  const { children, path } = props
  const classes = layoutStyle()
  const [toggle, setToggle] = useState<boolean>(false)
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const [userMouse, setUserMouse] = useState<{ x: number; y: number; screenSize: IUserMouse }>()
  const [loginUser, setLoginUser] = useState<{ loginId: string; workInfo: ISocketUserMouse }[] | null>(null)
  const [wsCheck, setWsCheck] = useState<number>(0)

  const route = useRouter()
  const ws: any = useWs()

  const getUserId = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { code, user } = await response.json()

    if (code === 200) {
      setUserInfo(user)
    }
  }

  const getLoginUserData = () => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'work',
          type: 'getWorkingPath',
          data: {
            workingPath: path,
          },
        })
      )
    }
  }

  const userMouseWebSocketHandler = (msg: any) => {
    const loginUserData = JSON.parse(msg.data)

    if (loginUserData.type === 'getWorkingPath') {
      setLoginUser(loginUserData.data)
    }
  }

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      getUserId()
      getLoginUserData()

      ws.addEventListener('message', userMouseWebSocketHandler)

      return () => {
        ws.removeEventListener('message', userMouseWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [wsCheck])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const checkId = localStorage.getItem('userId')
      if (checkId === null) {
        window.location.href = '/'
      }
    }
  }, [])

  const userMouseMoveCapture = useCallback(
    throttle((e) => {
      if (path === '/code' || path === '/note' || path === '/') {
        setUserMouse({
          x: e.clientX,
          y: e.clientY,
          screenSize: {
            x: window.innerWidth,
            y: window.innerHeight,
          },
        })
      }
    }, 500),
    []
  )

  useEffect(() => {
    if (userMouse === null) return
    if (ws === undefined) return

    if (ws?.readyState === WebSocket.OPEN) {
      let payload: ISocketUserMouse = {
        workingPath: path,
      }
      if (path === '/code' || path === '/note' || path === '/') {
        payload.userMouse = userMouse
      }
      ws.send(
        JSON.stringify({
          category: 'work',
          type: 'getWorkingPath',
          data: payload,
        })
      )
    }
  }, [userMouse])

  const handleOverlayClick = () => {
    const target = document.getElementById('sidebar')
    if (target !== undefined) {
      for (let i = 0; i < target!.classList.length; i++) {
        if (target!.classList[i].includes('show')) {
          target!.classList.remove(target!.classList[i])
        }
      }
    }

    setTimeout(() => {
      setToggle(!toggle)
    }, 200)
  }

  return (
    <div onMouseMoveCapture={userMouseMoveCapture} style={{ width: '100%', height: '100%' }}>
      <div className={classes.layout}>
        <Sidebar toggle={toggle} setToggle={setToggle} />
        <div className={`${classes.contentWrapper} ${toggle && classes.toggle}`}>
          <Topbar userInfo={userInfo} toggle={toggle} setToggle={setToggle} loginUser={loginUser} />
          {React.cloneElement(children, {
            path: path,
            toggle: toggle,
          })}
        </div>
      </div>
      {!toggle && <div className={classes.overlay} onClick={handleOverlayClick} />}
      {loginUser !== null && userInfo !== null && loginUser.length > 1 && <UserMouse loginUser={loginUser} loginId={userInfo} path={path} />}
      {userInfo !== null && <Messenger userId={userInfo} />}
    </div>
  )
}

export default Layout
