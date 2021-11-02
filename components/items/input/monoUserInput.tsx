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
  })
)

interface IUserInputProps {
  value: string
  setValue: React.Dispatch<React.SetStateAction<string>>
  label: string
}

function CustomMonoUserInput(props: IUserInputProps) {
  const { value, label, setValue } = props
  const classes = userInputStyle()
  const [participantList, setParticipantList] = useState<IUser[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const classList = [classes.input, classes.user, classes.userName, classes.thumbnail, classes.userInfo]

  const focusOutHandler = (event: any) => {
    const check = classList.some((v) => event.target.classList.contains(v))
    if (visible === true) {
      setVisible(check)
    }
  }

  const getParticipantList = async () => {
    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code === 200) {
      setParticipantList(user)
    }
  }

  const handleClickInput = () => {
    setVisible(!visible)
  }

  const handleDeleteItem = (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setValue('')
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

  return (
    <React.Fragment>
      <div className={classes.participant}>
        <span className={classes.label}>{label}</span>
        <div className={classes.input} onClick={handleClickInput}>
          {participantList.length > 0 && value !== '' ? (
            <div className={classes.item}>
              {participantList.map((item) => {
                if (item.userId === value) return item.userName
              })}
              <div className={classes.icon} onClick={handleDeleteItem}>
                <Close className={classes.delete} />
              </div>
            </div>
          ) : (
            `input direct message target`
          )}
        </div>
      </div>
      {visible && (
        <div className={classes.userList}>
          {participantList
            .filter((item) => value !== item.userId)
            .map((v, i) => (
              <div
                className={classes.user}
                key={`participant-${i}`}
                onClick={() => {
                  setValue(v.userId)
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

export default React.memo(CustomMonoUserInput)
