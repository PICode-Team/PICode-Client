import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IconButton } from '@material-ui/core'
import { Edit, ClearRounded } from '@material-ui/icons'
import { fetchSet } from '../../context/fetch'
import { IUser } from '../../../types/user.types'

const userInfoStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    userInfo: {
      position: 'absolute',
      zIndex: 4,
      right: '43px',
      top: '35px',
      backgroundColor: theme.backgroundColor.step4,
      width: '240px',
      height: '300px',
      borderRadius: '6px',
    },
    topbar: {
      float: 'right',
    },
    content: {
      marginTop: '48px',
      height: '240px',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
    },
    contentText: {
      fontSize: '14px',
      marginTop: '12px',
      width: '100%',
      color: theme.font.high.color,
    },
    logout: {
      width: '100px',
      marginTop: '22px',
      marginLeft: '12px',
      height: '32px',
      color: theme.font.high.color,
      fontSize: '15px',
      borderRadius: '2px',
      border: 'none',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#4078b8',
      cursor: 'pointer',
      '&:hover': {
        background: '#488cd9',
        transition: 'all 0.3s',
      },
    },
    iconButton: {
      color: `${theme.font.medium.color} !important`,
    },
    thumbnail: {
      width: '50%',
      height: '50%',
      backgroundColor: '#ffffff',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: '',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      flexDirection: 'column',
    },
    thumbnailEdit: {
      width: '32px',
      height: '32px',
      backgroundColor: '#4078b8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: '16px',
      cursor: 'pointer',
    },
    editIcon: {
      width: '20px',
      height: '20px',
      color: theme.font.high.color,
    },
    defaultThumbnail: {
      width: '100%',
      height: 'calc(50% - 32px)',
      fontSize: '52px',
      fontWeight: 'bold',
      marginTop: '-8px',
    },
    lastIssue: {
      color: theme.font.high.color,
    },
  })
)

interface IUserInfoProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function UserInfo(props: IUserInfoProps) {
  const { open, setOpen } = props
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const classes = userInfoStyle()

  const handleCloseUserInfo = () => {
    setOpen(false)
  }

  const handleEditThumbnail = () => {}

  const getUserData = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { user, code } = await response.json()

    if (code === 200) {
      setUserInfo(user)
    }
  }

  const handleLogout = async () => {
    await fetchSet('/user/sign', 'DELETE', true)
    localStorage.removeItem('userId')

    window.location.reload()
  }

  useEffect(() => {
    getUserData()
  }, [])

  return (
    <div className={classes.userInfo}>
      <div className={classes.topbar}>
        <IconButton className={classes.iconButton} onClick={handleCloseUserInfo}>
          <ClearRounded />
        </IconButton>
      </div>
      <div className={classes.content}>
        <div className={classes.thumbnail} style={{ backgroundImage: `url('http://localhost:8000/api/temp/${userInfo?.userThumbnail}')` }}>
          <div className={classes.thumbnailEdit} onClick={handleEditThumbnail}>
            <Edit className={classes.editIcon} />
          </div>
          {userInfo?.userThumbnail === undefined && <div className={classes.defaultThumbnail}>{userInfo?.userName.slice(0, 1)}</div>}
        </div>
        <div className={classes.contentText}>Hello, {userInfo?.userName ?? ''}</div>
        <div className={classes.lastIssue}>You had to {4} issues in 7 days</div>
        <button className={classes.logout} onClick={handleLogout}>
          logout
        </button>
      </div>
    </div>
  )
}
