import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { IThemeStyle } from '../../../styles/theme'
import { IUser } from '../../../types/user.types'
import { fetchSet } from '../../context/fetch'
import { useWs } from '../../context/websocket'

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
      backgroundColor: '#3b434c',
      padding: '4px 8px',
      border: 'none',
      borderRadius: '2px',
      color: '#757575',
      height: '32px',
      flex: 1,
      outline: 'none',
      lineHeight: '24px',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      '&:hover': {
        backgroundColor: '#4f5a66',
      },
    },
    item: {
      height: '16px',
      padding: '2px 4px',
      backgroundColor: '#5b6878',
      borderRadius: '4px',
      marginRight: '8px',
      color: '#ffffff',
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
        backgroundColor: '#3b4a4f',
      },
    },
    userList: {
      backgroundColor: '#3b434c',
      width: 'calc(100% - 174px)',
      marginLeft: '114px',
      marginTop: '1px',
      position: 'absolute',
      maxWidth: '386px',
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
      color: '#ffffff',
    },
    privileges: {},
  })
)

interface IUserInputProps {
  value: string[]
  setValue: React.Dispatch<React.SetStateAction<string[]>>
  label: string
}

function CustomMentionInput(props: IUserInputProps) {
  const { value, label, setValue } = props
  const classes = userInputStyle()
  const [participantList, setParticipantList] = useState<IUser[]>([])
  const [visible, setVisible] = useState<boolean>(false)
  const ws: any = useWs()

  const createAlarm = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'alarm',
          type: 'createAlarm',
          data: {},
        })
      )
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

  const handleDeleteItem = (userId: string) => (event: React.MouseEvent) => {
    event.preventDefault()
    event.stopPropagation()

    setValue(value.filter((item) => item !== userId))
  }

  useEffect(() => {
    getParticipantList()
  }, [])

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
          {participantList.length > 0 && value.length > 0 ? (
            <React.Fragment>
              {value.map((v, i) => (
                <div className={classes.item} key={`workspace-participant-${i}`}>
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
            `Input Workspace Participant`
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

export default CustomMentionInput
