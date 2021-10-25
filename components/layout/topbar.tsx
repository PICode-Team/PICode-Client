import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AccountCircleRounded, Brightness4, MenuRounded, Notifications } from '@material-ui/icons'

import { RootState } from '../../modules'
import { topbarStyle } from '../../styles/layout/topbar'
import { toDark, toWhite } from '../../modules/theme'
import UserInfo from '../items/tooltip/userInfo'
import { IUser } from '../../types/user.types'
import { fetchSet } from '../context/fetch'
import AlertDialog from '../items/tooltip/alarm'
import { useRouter } from 'next/router'
import { sidebarData } from './data'
import { uuidv4 } from '../context/uuidv4'
import { ISocketUserMouse } from './userMouse'

interface ITopbarProps {
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
  userInfo: IUser | null
  loginUser: { loginId: string; workInfo: ISocketUserMouse }[] | null
}

interface IUserWorkInfo {
  userId: string
  workInfo: ISocketUserMouse
  userThumbnail: string
}

function Topbar(props: ITopbarProps) {
  const { toggle, setToggle, userInfo, loginUser } = props
  const classes = topbarStyle()
  const theme = useSelector((state: RootState) => state.theme).theme
  const dispatch = useDispatch()
  const [openUserInfo, setOpenUserInfo] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [userList, setUserList] = useState<IUser[]>([])
  const router = useRouter()
  let endPoint = router.asPath.split('?')[0]

  let path: string = ''

  Object.keys(sidebarData).map((key) => {
    if (sidebarData[key].url === endPoint) {
      path = sidebarData[key].title
    } else if (sidebarData[key].children !== undefined) {
      sidebarData[key].children?.map((v) => {
        if (v.url === endPoint) {
          path = v.title
        }
      })
    } else if (sidebarData[key].subUrl !== undefined) {
      if (sidebarData[key].subUrl?.some((v) => v === endPoint)) {
        path = sidebarData[key].title
      }
    }
  })

  const getUserList = async () => {
    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code === 200) {
      setUserList(user)
    }
  }

  const handleToggle = () => {
    setToggle(!toggle)
  }

  const handleAlarm = () => {
    setOpenAlert(!openAlert)
  }

  const handleTheme = () => {
    theme === 'dark' ? dispatch(toWhite()) : dispatch(toDark())
  }

  const handleUserInfo = () => {
    setOpenUserInfo(!openUserInfo)
  }

  useEffect(() => {
    getUserList()
  }, [])

  const makeUserInfo = (data: IUserWorkInfo[]) => {
    if (userInfo === null) return []

    let returnData = []
    let idx = 0
    for (let i of data) {
      if (idx === 5) {
        break
      }
      if (i.userId !== userInfo.userId) {
        returnData.push(
          <div
            key={uuidv4()}
            className={classes.userInfoData}
            style={{
              zIndex: idx,
              backgroundImage: i.userThumbnail === undefined ? 'none' : ` url('http://localhost:8000/api/temp/${i.userThumbnail}')`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              border: i.userThumbnail === undefined ? '1px solid #ffffff' : 'none ',
            }}
            onClick={() => {
              window.location.href = i.workInfo.workingPath
            }}
            title={i.workInfo.workingPath}
          >
            {userList?.find((v) => v.userId === i.userId)?.userThumbnail === undefined && <span>{i.userId.substring(0, 1)}</span>}
          </div>
        )
      }
      idx++
    }
    if (data.length > 5) {
      returnData.push(<span style={{ paddingLeft: '8px', fontSize: '12px' }}> 외 {data.length - 5}명</span>)
    }
    return returnData
  }

  return (
    <div className={classes.topBar}>
      <div className={classes.toggle}>
        <div className={classes.toggleIcon} onClick={handleToggle}>
          <MenuRounded />
        </div>
        <div className={classes.titleName}>{path ?? ''}</div>
      </div>
      <div className={classes.interaction}>
        <div className={classes.loginUserInfo}>{loginUser !== null && loginUser.length > 1 && makeUserInfo(loginUser as any).map((v) => v)}</div>
        <div className={classes.icon} onClick={handleAlarm}>
          <Notifications />
        </div>
        <div className={classes.icon} onClick={handleTheme}>
          <Brightness4 />
        </div>
        <div className={classes.icon} onClick={handleUserInfo}>
          <AccountCircleRounded />
        </div>
      </div>
      {openUserInfo === true && <UserInfo open={openUserInfo} setOpen={setOpenUserInfo} />}
      <AlertDialog open={openAlert} setOpen={setOpenAlert} />
    </div>
  )
}

export default Topbar
