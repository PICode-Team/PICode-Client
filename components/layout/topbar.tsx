import React, { useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { AccountCircleRounded, Brightness4, MenuRounded, Notifications } from '@material-ui/icons'

import { RootState } from '../../modules'
import { topbarStyle } from '../../styles/layout/topbar'
import { toDark, toWhite } from '../../modules/theme'
import UserInfo from '../items/tooltip/userInfo'
import { IUser } from '../../types/user.types'
import { fetchSet } from '../context/fetch'
import AlertDialog from '../items/tooltip/alarm'

interface ITopbarProps {
  toggle: boolean
  setToggle: React.Dispatch<React.SetStateAction<boolean>>
}

function Topbar(props: ITopbarProps) {
  const { toggle, setToggle } = props
  const classes = topbarStyle()
  const theme = useSelector((state: RootState) => state.theme).theme
  const dispatch = useDispatch()
  const [openUserInfo, setOpenUserInfo] = useState<boolean>(false)
  const [openAlert, setOpenAlert] = useState<boolean>(false)
  const [userData, setUserData] = useState<IUser | null>(null)

  const getUserData = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { user, code } = await response.json()

    if (code === 200) {
      setUserData(user)
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

  return (
    <div className={classes.topBar}>
      <div className={classes.toggle}>
        <div className={classes.toggleIcon} onClick={handleToggle}>
          <MenuRounded />
        </div>
      </div>
      <div className={classes.interaction}>
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
      {openAlert === true && <AlertDialog open={openAlert} setOpen={setOpenAlert} />}
    </div>
  )
}

export default Topbar
