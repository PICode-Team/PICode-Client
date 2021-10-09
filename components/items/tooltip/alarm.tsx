import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'
import { IconButton } from '@material-ui/core'
import { Cancel, Clear, ClearRounded } from '@material-ui/icons'

import { IThemeStyle } from '../../../styles/theme'
import { useWs } from '../../context/websocket'
import { IAlarm } from '../../../types/alarm.types'

const alertDialogStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    content: {
      width: '300px',
      height: '400px',
      position: 'absolute',
      background: '#6d7681',
      zIndex: 4,
      right: '135px',
      top: '30px',
      borderRadius: '6px',
    },
    header: {
      width: '100%',
      height: '43px',
      fontSize: '18px',
      lineHeight: '30px',
      color: theme.font.high.color,
      position: 'relative',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '10px',
    },
    alarmContent: {
      width: '100%',
      height: 'calc(100% - 63px)',
      overflowY: 'auto',
      backgroundColor: '#505965',
    },
    row: {
      color: '#ffffff',
      padding: '6px 14px',
      backgroundColor: '#505965',
      display: 'flex',
      fontSize: '12px',
      justifyContent: 'space-between',
      width: '100%',
      cursor: 'pointer',
    },
    rowBody: {
      display: 'flex',
    },
    thumbnail: {
      width: '32px',
      height: '32px',
      backgroundColor: '#ffffff',
      borderRadius: '16px',
      marginRight: '6px',
    },
    rowTitle: {
      fontWeight: 'bold',
    },
    rowContent: {
      wordBreak: 'break-word',
    },
    clear: {
      width: '18px',
      height: '18px',
    },
    clearWrapper: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      zIndex: 999,
    },
    footer: {
      width: '100%',
      height: '20px',
    },
    notification: {
      top: '10px',
      left: '30px',
      width: '10px',
      height: '10px',
      borderRadius: '10px',
      background: 'red',
      position: 'absolute',
    },
  })
)

interface IAlertDialogProps {
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export default function AlertDialog(props: IAlertDialogProps) {
  const { open, setOpen } = props
  const classes = alertDialogStyle()
  const [alarmList, setAlarmList] = useState<IAlarm[] | null>(null)
  const ws: any = useWs()

  const checkAlarm = (alarmId: string, alarmRoom: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'alarm',
          type: 'checkAlarm',
          data: {
            alarmId: alarmId,
            alarmRoom: alarmRoom,
          },
        })
      )
    }
  }

  const getAlarm = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'alarm',
          type: 'getAlarmData',
        })
      )
    }
  }

  const handleClickRow = (alarmId: string, alarmRoom: string, location: string) => () => {
    checkAlarm(alarmId, alarmRoom)
    window.location.href = location
  }

  const handleClear = (alarmId: string, alarmRoom: string) => () => {
    checkAlarm(alarmId, alarmRoom)
  }

  const alertWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'alarm') {
      switch (message.type) {
        case 'getAlarm':
          console.log(message.data)

          setAlarmList(message.data.filter((v: any) => !v.checkAlarm))
          break
        case 'checkAlarm':
          if (alarmList !== null) {
            setAlarmList(alarmList.filter((v) => v.alarmId !== message.data.alarmId))
          }
          break
        case 'createAlarm':
          break
      }
    }
  }

  useEffect(() => {
    ws.addEventListener('message', alertWebSocketHandler)
    getAlarm()

    return () => {
      ws.removeEventListener('message', alertWebSocketHandler)
    }
  }, [ws?.readyState])

  useEffect(() => {
    if (alarmList === null) {
      setAlarmList([])
    }
  }, [])

  return (
    <React.Fragment>
      <div className={classes.content}>
        <div className={classes.header}>Recent Alarm</div>
        <div className={classes.alarmContent}>
          {alarmList !== null &&
            alarmList.length > 0 &&
            alarmList.map((v: any, i: number) => {
              return (
                <div key={`alarm-${i}`} className={classes.row}>
                  <div className={classes.rowBody} onClick={handleClickRow(v.alarmId, v.alarmRoom, v.location)}>
                    <div>
                      <div className={classes.thumbnail}></div>
                    </div>
                    <div>
                      <div className={classes.rowTitle}>{`${v.userId}'s ${v.type}`}</div>
                      <div className={classes.rowContent}>{v.content}</div>
                    </div>
                  </div>
                  <div className={classes.clearWrapper} onClick={handleClear(v.alarmId, v.alarmRoom)}>
                    <Clear className={classes.clear} />
                  </div>
                </div>
              )
            })}
        </div>
        <div className={classes.footer}></div>
      </div>
      {alarmList !== null && alarmList.length > 0 && false && <div className={classes.notification} />}
    </React.Fragment>
  )
}
