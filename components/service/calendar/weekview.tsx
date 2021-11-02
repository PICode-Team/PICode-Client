import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import React from 'react'
import { viewStyle } from '../../../styles/service/calendarspace/day'
import { calDay, checkDate, getToday, ICalendarData, IDate } from './calendar'

export const getWeek = (date: Date) => {
  let today = cloneDeep(date).getDay()
  let startDate
  let endDate
  if (today === 0) {
    let tmpData = cloneDeep(date)
    tmpData.setDate(date.getDate() + 6)
    startDate = date
    endDate = tmpData
  } else if (today === 6) {
    let tmpData = cloneDeep(date)
    tmpData.setDate(date.getDate() - 6)
    endDate = date
    startDate = tmpData
  } else {
    let tmpStartData = cloneDeep(date)
    let tmpEndData = cloneDeep(date)
    tmpStartData.setDate(tmpStartData.getDate() - today)
    tmpEndData.setDate(tmpEndData.getDate() + 6 - today)
    startDate = tmpStartData
    endDate = tmpEndData
  }

  return {
    startDate: startDate,
    endDate: endDate,
  }
}

export default function WeekView(props: IDate & { setModalDate: React.Dispatch<React.SetStateAction<Date>>; setDetailData: React.Dispatch<React.SetStateAction<ICalendarData | null>> }) {
  const classes = viewStyle()

  const weekData = getWeek(props.tmpViewDay)
  let today = new Date()

  return (
    <div className={classes.week}>
      {calDay.map((v, idx) => {
        let startDate = cloneDeep(weekData.startDate)
        startDate.setDate(weekData.startDate.getDate() + idx)
        let scheduleDay: string = checkDate(startDate)
        let id = calDay[weekData.startDate.getDay() + idx]
        let checkToday = false
        return (
          <div
            key={v}
            id={id}
            className={clsx(classes.weekday, idx === 6 && classes.weekdayend)}
            onDragOver={(e) => {
              e.preventDefault()
              e.stopPropagation()
              let node = document.getElementById(`${id}`)
              if (node !== null) {
                node.style.background = '#1D2228'
              }
            }}
            onDragLeave={(e) => {
              e.preventDefault()
              e.stopPropagation()
              let node = document.getElementById(`${id}`)
              if (node !== null) {
                node.style.background = 'none'
              }
            }}
            onDrop={(e) => {
              e.preventDefault()
              e.stopPropagation()
              let node = document.getElementById(`${id}`)
              if (node !== null) {
                node.style.background = 'none'
              }
            }}
            onClick={() => {
              props.setModalDate(startDate)
              props.setModal(true)
            }}
          >
            <div
              className={clsx(classes.dayInfo, (idx === 6 || idx === 0) && classes.holiday, getToday(props.today, 'day') === getToday(startDate, 'day') && classes.today)}
              onClick={() => {
                props.setTmpViewDay(startDate)
                props.setView('day')
              }}
            >
              <div className={clsx(classes.daydateinfo)}>{startDate.getDate()}</div>
              <div>{calDay[weekData.startDate.getDay() + idx]}</div>
            </div>
            <div className={classes.daycontentinfo}>
              {props.schedule !== undefined &&
                props.schedule[scheduleDay] !== undefined &&
                props.schedule[scheduleDay].map((v) => {
                  return (
                    <div
                      style={{ cursor: 'pointer' }}
                      key={v.scheduleId}
                      className={classes.dayContainer}
                      draggable={true}
                      onDragStart={() => {}}
                      onClick={(e: any) => {
                        props.setDetailData(v)
                        props.setModal(true)
                      }}
                    >
                      <div className={classes.titleName}>{v.title}</div>
                    </div>
                  )
                })}
            </div>
          </div>
        )
      })}
    </div>
  )
}
