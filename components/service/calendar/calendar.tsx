/* eslint-disable react-hooks/exhaustive-deps */
import { Button, IconButton, MenuItem, Select } from '@material-ui/core'
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, CalendarViewDayOutlined } from '@material-ui/icons'
import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import React, { useEffect, useState } from 'react'
import 'react-calendar/dist/Calendar.css'
import { calendarStyle } from '../../../styles/service/calendarspace/calendar'
import { useWs } from '../../context/websocket'
import CustomSelect from '../../items/input/select'
import { viewData } from './constant'
import CreateSchedule from './createschedule'
import DayView from './dayview'
import ScheduleDetail from './detail'
import MonthView from './monthview'
import WeekView, { getWeek } from './weekview'

interface ICalendarType {
  [key: string]: ICalendarData[]
}

export interface ICalendarData {
  type: string
  title: string
  content: string
  startDate: string
  dueDate: string
  milestone?: string
  creator: string
  issue: string
  scheduleId: string
  kanban?: string
  label?: string
  assigner?: string[]
}

export const checkDate = (date: Date) => {
  return `${String(date.getFullYear()).slice(2, 4)}-${date.getMonth() + 1}-${date.getDate()}`
}

export interface IDate {
  today: Date
  tmpViewDay: Date
  schedule: ICalendarType | undefined
  setTmpViewDay: React.Dispatch<React.SetStateAction<Date>>
  setView: React.Dispatch<React.SetStateAction<string>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

export const calDay = ['Sun', 'Mon', 'Tue', 'Wen', 'Tur', 'Fri', 'Sat']

export const getToday = (date: Date, type: string) => {
  let tmpData = getWeek(date)
  if (type === 'day') {
    return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${calDay[date.getDay()]}`
  } else if (type === 'week') {
    if (tmpData.endDate.getMonth() + 1 !== date.getMonth() + 1) {
      return `${date.getFullYear()}.${date.getMonth() + 1} - ${tmpData.endDate.getMonth() + 1}`
    } else if (tmpData.startDate.getMonth() + 1 !== date.getMonth() + 1) {
      return `${date.getFullYear()}.${tmpData.startDate.getMonth() + 1} - ${date.getMonth() + 1} `
    } else {
      return `${date.getFullYear()}.${date.getMonth() + 1}`
    }
  } else {
    return `${date.getFullYear()}.${date.getMonth() + 1}`
  }
}

export default function CalanderSpace(props: any) {
  const [calendarData, setCalendarData] = useState<ICalendarType>()
  const ws: any = useWs()
  const classes = calendarStyle()
  const [view, setView] = React.useState<string>('month')
  const [today, setToday] = React.useState<Date>(new Date())
  const [modal, setModal] = React.useState<boolean>(false)
  const [kanbanList, setKanbanList] = React.useState()
  const [milestoneList, setMilestoneList] = React.useState()
  const [tmpViewDay, setTmpViewDay] = React.useState<Date>(new Date())
  const [modalDate, setModalDate] = React.useState<Date>(new Date())
  const [openNum, setOpenNum] = React.useState<number>(0)
  const [scheduleDay, setScheduleDay] = React.useState<Date>()
  const [detailData, setDetailData] = React.useState<ICalendarData | null>(null)

  const calendarWebsocketHanlder = (msg: any) => {
    const message = JSON.parse(msg.data)
    if (message.category === 'calendar') {
      switch (message.type) {
        case 'getCalendar': {
          console.log(message.data.schedules)

          setCalendarData(message.data.schedules)
          break
        }
        case 'createSchedule': {
          if (message.data.code === 200) {
            ws.send(
              JSON.stringify({
                category: 'calendar',
                type: 'getCalendar',
                data: {},
              })
            )
          }

          break
        }
        case 'editSchedule': {
          if (message.data.code === 200) {
            ws.send(
              JSON.stringify({
                category: 'calendar',
                type: 'getCalendar',
                data: {},
              })
            )
          }
          break
        }
        case 'deleteSchedule': {
          if (message.data.code === 200) {
            ws.send(
              JSON.stringify({
                category: 'calendar',
                type: 'getCalendar',
                data: {},
              })
            )
          }
          break
        }
      }
    } else if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban': {
          setKanbanList(message.data.kanbans)
          break
        }
      }
    } else if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone': {
          setMilestoneList(message.data)
          break
        }
      }
    }
  }

  useEffect(() => {
    if (openNum < 0) return

    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', calendarWebsocketHanlder)
      let payload = {
        category: 'calendar',
        type: 'getCalendar',
        data: {},
      }
      let getKanbanPayload = {
        category: 'kanban',
        type: 'getKanban',
        data: {},
      }
      let getMilestonePayload = {
        category: 'milestone',
        type: 'getMilestone',
        data: {},
      }
      ws.send(JSON.stringify(payload))
      ws.send(JSON.stringify(getKanbanPayload))
      ws.send(JSON.stringify(getMilestonePayload))
      setOpenNum(-1)
    } else {
      setOpenNum(openNum + 1)
    }
  }, [openNum])

  useEffect(() => {
    if (view === 'month') {
      if (tmpViewDay === undefined) return

      let tmpYear = tmpViewDay.getFullYear()
      let tmpMonth = tmpViewDay.getMonth()

      let newDate = new Date(tmpYear, tmpMonth, 1)
      setTmpViewDay(newDate)
    }
  }, [view])

  useEffect(() => {
    if (modal === false) {
      setDetailData(null)
    }
  }, [modal])

  const returnValue: {
    [key: string]: JSX.Element
  } = {
    day: (
      <DayView
        setModalDate={setModalDate}
        setDetailData={setDetailData}
        today={today}
        tmpViewDay={tmpViewDay}
        schedule={calendarData}
        setTmpViewDay={setTmpViewDay}
        setView={setView}
        setModal={setModal}
      />
    ),
    week: (
      <WeekView
        setModalDate={setModalDate}
        setDetailData={setDetailData}
        today={today}
        tmpViewDay={tmpViewDay}
        schedule={calendarData}
        setTmpViewDay={setTmpViewDay}
        setView={setView}
        setModal={setModal}
      />
    ),
    month: (
      <MonthView
        setDetailData={setDetailData}
        today={today}
        tmpViewDay={tmpViewDay}
        schedule={calendarData}
        setTmpViewDay={setTmpViewDay}
        setModalDate={setModalDate}
        setView={setView}
        setModal={setModal}
      />
    ),
  }

  return (
    <div className={classes.wrapper}>
      <div className={classes.calendarContent}>
        <div className={classes.topbar}>
          <div className={classes.changeday}>
            <IconButton
              onClick={() => {
                if (view === 'day') {
                  let tmpData = cloneDeep(tmpViewDay)
                  tmpData.setDate(tmpViewDay.getDate() - 1)
                  setTmpViewDay(tmpData)
                } else if (view === 'week') {
                  let tmpData = cloneDeep(tmpViewDay)
                  tmpData.setDate(tmpViewDay.getDate() - 7)
                  setTmpViewDay(tmpData)
                } else {
                  let tmpData = cloneDeep(tmpViewDay)
                  tmpData.setMonth(tmpData.getMonth() - 1)
                  setTmpViewDay(tmpData)
                }
              }}
            >
              <ArrowBackIosOutlined className={classes.iconcolor} />
            </IconButton>
          </div>
          <div className={classes.today}>
            <div
              className={clsx(classes.todaytext, getToday(today, 'day') === getToday(tmpViewDay, 'day') && classes.highlightTodayText)}
              onClick={() => {
                setTmpViewDay(today)
              }}
            >
              {getToday(tmpViewDay, view)}
            </div>
            <div className={classes.changeview}>
              <select
                className={classes.selectview}
                value={view}
                onChange={(e) => {
                  setView(e.target.value)
                }}
              >
                {viewData.map((v) => {
                  return (
                    <option key={v} value={v}>
                      {v}
                    </option>
                  )
                })}
              </select>
            </div>
          </div>
          <div className={classes.changeday}>
            <IconButton
              onClick={() => {
                if (view === 'day') {
                  let tmpData = cloneDeep(tmpViewDay)
                  tmpData.setDate(tmpViewDay.getDate() + 1)
                  setTmpViewDay(tmpData)
                } else if (view === 'week') {
                  let tmpData = cloneDeep(tmpViewDay)
                  tmpData.setDate(tmpViewDay.getDate() + 7)
                  setTmpViewDay(tmpData)
                } else {
                  let tmpData = cloneDeep(tmpViewDay)
                  tmpData.setMonth(tmpData.getMonth() + 1)
                  setTmpViewDay(tmpData)
                }
              }}
            >
              <ArrowForwardIosOutlined className={classes.iconcolor} />
            </IconButton>
          </div>
        </div>
        <div className={classes.calendar}>{calendarData !== undefined && returnValue[view]}</div>
      </div>
      {detailData === null && <CreateSchedule modal={modal} setModal={setModal} kanbanList={kanbanList} tmpDay={modalDate} milestoneList={milestoneList} />}
      {detailData !== null && <ScheduleDetail modal={modal} setModal={setModal} detailData={detailData} kanbanList={kanbanList} milestoneList={milestoneList} />}
    </div>
  )
}
