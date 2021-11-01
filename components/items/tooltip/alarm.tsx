import React, { useEffect, useRef, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'
import { Clear } from '@material-ui/icons'

import { IThemeStyle } from '../../../styles/theme'
import { useWs } from '../../context/websocket'
import { IAlarm } from '../../../types/alarm.types'

const alertDialogStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    content: {
      width: '300px',
      height: '400px',
      position: 'absolute',
      backgroundColor: theme.backgroundColor.step2,
      filter: theme.brightness.step0,
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
      backgroundColor: theme.backgroundColor.step2,
      filter: theme.brightness.step0,
    },
    row: {
      color: theme.font.high.color,
      padding: '6px 14px',
      backgroundColor: theme.backgroundColor.step2,
      display: 'flex',
      fontSize: '12px',
      justifyContent: 'space-between',
      width: '100%',
      cursor: 'pointer',
      '&:hover': {
        filter: theme.brightness.step0,
      },
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
      alignItems: 'flex-start',
      zIndex: 999,
    },
    footer: {
      width: '100%',
      height: '20px',
    },
    notification: {
      top: '12px',
      right: '108px',
      width: '10px',
      height: '10px',
      borderRadius: '10px',
      background: 'red',
      position: 'absolute',
    },

    wrapper: {
      position: 'absolute',
      zIndex: 99999,
      bottom: '15px',
      right: '0px',
      maxHeight: 'calc(100% - 55px)',
      overflowY: 'hidden',
      width: '260px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
    },
    toast: {
      width: '180px',
      height: '100px',
      backgroundColor: theme.backgroundColor.step1,
      borderRadius: '12px',
      marginTop: '10px',
      marginRight: '25px',
      filter: theme.brightness.step1,
      color: theme.font.high.color,
      padding: '10px',
      animation: '$slidein 1s',
      transition: 'all ease-in 0.2s',
      overflow: 'hidden',
    },
    toastTitle: {
      fontWeight: 'bold',
    },
    toastContent: {
      width: '100%',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      display: '-webkit-box',
      WebkitLineClamp: 3,
      marginTop: '6px',
    },
    disapper: {
      animation: '$disappear 1s',
    },

    '@keyframes slidein': {
      from: {
        transform: 'translateX(-60px)',
        opacity: 0.2,
      },
      to: {
        transform: 'translateX(0)',
        opacity: 1,
      },
    },

    '@keyframes disappear': {
      from: {
        opacity: 1,
      },
      to: {
        opacity: 0,
      },
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
  const [wsCheck, setWsCheck] = useState<number>(0)
  const [toastList, setToastList] = useState<IAlarm[]>([])
  const toastWrapperRef = useRef<HTMLDivElement>(null)
  const ws: any = useWs()

  const checkAlarm = (alarmId: string, alarmRoom: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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
          setAlarmList(message.data.filter((v: any) => v.checkAlarm))
          break
        case 'checkAlarm':
          if (alarmList !== null) {
            setAlarmList(alarmList.filter((v) => v.alarmId !== message.data.alarmId))
          }
          break
        case 'createAlarm':
          const newAlarm = message.data

          if (toastWrapperRef !== null && toastWrapperRef.current !== null) {
            const toast = document.createElement('div')
            toast.id = newAlarm.alarmId
            toast.classList.add(classes.toast)

            const title = document.createElement('div')
            title.classList.add(classes.toastTitle)
            title.innerText = `${newAlarm.userId}'s ${newAlarm.type}`

            const content = document.createElement('div')
            content.classList.add(classes.toastContent)
            content.innerText = newAlarm.content

            toast.appendChild(title)
            toast.appendChild(content)

            toastWrapperRef.current.appendChild(toast)

            const target = document.getElementById(newAlarm.alarmId)

            if (target !== null) {
              setTimeout(() => {
                target.classList.add(classes.disapper)
              }, 2000)

              setTimeout(() => {
                toastWrapperRef.current?.removeChild(target)
              }, 2700)
            }
          }

          setToastList([...toastList, newAlarm])
          setTimeout(() => {
            setToastList(toastList.slice(1))
          }, 5000)
          if (alarmList !== null) {
            setAlarmList([...alarmList, newAlarm])
          }
          break
      }
    }
  }

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', alertWebSocketHandler)
      if (alarmList === null) {
        getAlarm()
      }
      return () => {
        ws.removeEventListener('message', alertWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [ws?.readyState, wsCheck, alarmList, toastList, toastWrapperRef])

  return (
    <React.Fragment>
      {open === true && (
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
      )}
      {alarmList !== null && alarmList.length > 0 && <div className={classes.notification} />}
      <div className={classes.wrapper} ref={toastWrapperRef}></div>
    </React.Fragment>
  )
}
