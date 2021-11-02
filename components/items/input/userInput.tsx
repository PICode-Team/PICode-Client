import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'
import { IUser } from '../../../types/user.types'
import { fetchSet } from '../../context/fetch'

const userInputStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    participant: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
    },
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
      width: '106px',
      marginRight: '8px',
      marginTop: '2px',
    },
    input: {
      width: '100%',
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step0,
      padding: '4px 8px',
      border: 'none',
      borderRadius: '2px',
      height: '32px',
      flex: 1,
      outline: 'none',
      lineHeight: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      color: '#757575',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      fontSize: '13.3px',
      '&:hover': {
        filter: theme.brightness.step2,
      },
      '@media screen and (max-width: 600px)': {
        fontSize: '10px',
      },
    },
    item: {
      height: '16px',
      padding: '2px 4px',
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step4,
      borderRadius: '4px',
      marginRight: '8px',
      color: theme.font.high.color,
      fontSize: '10px',
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      display: 'flex',
      alignItems: 'center',
    },
    delete: {
      marginLeft: '4px',
      width: '10px !important',
      height: '10px !important',
      cursor: 'pointer',
    },

    user: {
      display: 'flex',
      justifyContent: 'space-between',
      padding: '4px 12px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: theme.backgroundColor.step1,
        filter: theme.brightness,
      },
    },
    userList: {
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step0,
      width: 'calc(100% - 174px)',
      marginLeft: '114px',
      marginTop: '1px',
      position: 'absolute',
      maxWidth: '386px',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 15px',
      zIndex: 99,
    },
    userInfo: {
      display: 'flex',
    },
    thumbnail: {
      width: '18px',
      height: '18px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      marginRight: '6px',
    },
    userName: {
      color: theme.font.high.color,
    },
    privileges: {},

    onlyContentUserList: {
      marginLeft: '0px',
      width: '100%',
    },
  })
)

interface IUserInputProps {
  value: string[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>
  label: string
  placeholder: string
  onlyContent?: boolean
  style?: React.CSSProperties
}

function CustomUserInput(props: IUserInputProps) {
  const { value, label, setValue, placeholder, onlyContent, style } = props
  const classes = userInputStyle()
  const [participantList, setParticipantList] = useState<IUser[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const classList = [classes.input, classes.user, classes.userName, classes.thumbnail, classes.userInfo]

  const getParticipantList = async () => {
    const myId = await getUserData()

    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code === 200 && user !== undefined) {
      setParticipantList([myId, ...user])
    }
  }

  const getUserData = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { user, code } = await response.json()

    if (code === 200) {
      return user
    }
  }

  const focusOutHandler = (event: any) => {
    const check = classList.some((v) => event.target.classList.contains(v))
    if (visible === true) {
      setVisible(check)
    }
  }

  const handleClickInput = () => {
    setVisible(!visible)
  }

  const handleDeleteItem = (userId: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setValue(value.filter((item) => item !== userId))
  }

  useEffect(() => {
    getParticipantList()
  }, [])

  useEffect(() => {
    window.addEventListener('click', focusOutHandler)

    return () => {
      window.removeEventListener('click', focusOutHandler)
    }
  }, [visible])

  useEffect(() => {
    if (value.length === participantList.length) {
      setVisible(false)
    }
  }, [value])

  if (onlyContent === true) {
    return (
      <React.Fragment>
        <div className={classes.input} onClick={handleClickInput} style={style}>
          {participantList.length > 0 && value.length > 0 ? (
            <React.Fragment>
              {value.map((v, i) => (
                <div className={classes.item} key={`participant-input-user-${i}`}>
                  {participantList.map((item) => {
                    if (item.userId === v) return item.userName
                  })}
                  <div className={classes.icon} onClick={handleDeleteItem(v)}>
                    <Close className={classes.delete} />
                  </div>
                </div>
              ))}
            </React.Fragment>
          ) : (
            placeholder
          )}
        </div>
        {visible && (
          <div className={`${classes.userList} ${classes.onlyContentUserList}`}>
            {participantList
              .filter((item) => {
                let check = true
                value.forEach((v) => {
                  if (v === item.userId) check = false
                })
                return check
              })
              .map((v, i) => (
                <div
                  className={classes.user}
                  key={`participant-${i}`}
                  onClick={() => {
                    setValue([...value, v.userId])
                  }}
                >
                  <div className={classes.userInfo}>
                    <div className={classes.thumbnail}></div>
                    <div className={classes.userName}>{v.userName}</div>
                  </div>
                  <div className={classes.privileges}></div>
                </div>
              ))}
          </div>
        )}
      </React.Fragment>
    )
  }

  return (
    <React.Fragment>
      <div className={classes.participant}>
        <span className={classes.label}>{label}</span>
        <div className={classes.input} onClick={handleClickInput}>
          {participantList.length > 0 && value.length > 0 ? (
            <React.Fragment>
              {value.map((v, i) => (
                <div className={classes.item} key={`participant-input-user-${i}`}>
                  {participantList.map((item) => {
                    if (item.userId === v) return item.userName
                  })}
                  <div className={classes.icon} onClick={handleDeleteItem(v)}>
                    <Close className={classes.delete} />
                  </div>
                </div>
              ))}
            </React.Fragment>
          ) : (
            placeholder
          )}
        </div>
      </div>
      {visible && (
        <div className={classes.userList}>
          {participantList
            .filter((item) => {
              let check = true
              value.forEach((v) => {
                if (v === item.userId) check = false
              })
              return check
            })
            .map((v, i) => (
              <div
                className={classes.user}
                key={`participant-${i}`}
                onClick={() => {
                  setValue([...value, v.userId])
                }}
              >
                <div className={classes.userInfo}>
                  <div className={classes.thumbnail}></div>
                  <div className={classes.userName}>{v.userName}</div>
                </div>
                <div className={classes.privileges}></div>
              </div>
            ))}
        </div>
      )}
    </React.Fragment>
  )
}

export default CustomUserInput
