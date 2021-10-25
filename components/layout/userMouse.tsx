import React from 'react'
import { IUser } from '../../types/user.types'

export interface IUserMouse {
  x: number
  y: number
}

export interface ISocketUserMouse {
  workingPath: string
  userMouse?: { x: number; y: number; screenSize: IUserMouse }
}

interface IUserMouseProps {
  loginUser: any[]
  loginId: IUser
  path: string
}

export interface ILoginUserInfo {
  userId: string
  workInfo: ISocketUserMouse
}

function UserMouse(props: IUserMouseProps) {
  const { loginUser, loginId, path } = props

  return (
    <React.Fragment>
      {loginUser.map((v: ILoginUserInfo, i: number) => {
        if (v.userId !== loginId.userId && path === v.workInfo.workingPath && v.workInfo.userMouse !== undefined) {
          let realX = (v.workInfo.userMouse.x / v.workInfo.userMouse.screenSize.x) * window.innerWidth
          let realY = (v.workInfo.userMouse.y / v.workInfo.userMouse.screenSize.y) * window.innerHeight

          return (
            <div
              key={`user-mouse-${i}`}
              style={{
                position: 'absolute',
                top: realY > window.innerHeight - 15 ? window.innerHeight - 15 : realY,
                left: realX > window.innerWidth - 15 ? window.innerWidth - 15 : realX,
                width: '15px',
                height: '15px',
                zIndex: 99,
                background: 'red',
                borderRadius: '7.5px',
              }}
            />
          )
        }
      })}
    </React.Fragment>
  )
}

export default UserMouse
