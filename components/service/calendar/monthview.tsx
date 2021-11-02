import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import moment from 'moment'
import React from 'react'
import { viewStyle } from '../../../styles/service/calendarspace/day'
import { calDay, getToday, ICalendarData, IDate } from './calendar'
import { getWeek } from './weekview'

export default function MonthView(props: IDate & { setModalDate: React.Dispatch<React.SetStateAction<Date>>; setDetailData: React.Dispatch<React.SetStateAction<ICalendarData | null>> }) {
  const classes = viewStyle()
  const [dragId, setDragId] = React.useState<string>()
  let weekNum = [0, 1, 2, 3, 4, 5]
  let today = new Date()

  return (
    <div className={classes.monthview}>
      {weekNum.map((v) => {
        let tmpStartDate = cloneDeep(props.tmpViewDay)
        tmpStartDate.setDate(props.tmpViewDay.getDate() + 6 * v)
        let tmpWeekData = getWeek(tmpStartDate)
        return (
          <div key={v} className={clsx(classes.monthweek, v === 5 && classes.lastmonthweek)}>
            {calDay.map((day, idx) => {
              let tmpDay = cloneDeep(tmpWeekData.startDate)
              tmpDay.setDate(tmpWeekData.startDate.getDate() + idx)
              let scheduleDay: string = moment(tmpDay).format('YY-MM-DD')
              let tmpMonth = tmpDay.getMonth()
              let realMonth = props.tmpViewDay.getMonth()
              let checkToday = false
              if (getToday(today, 'day') === getToday(tmpDay, 'day')) {
                checkToday = true
              }
              return (
                <div
                  key={tmpDay.getTime()}
                  id={`time${tmpDay.getTime()}`}
                  className={clsx(classes.monthday, idx === 6 && classes.lastmonthday, tmpMonth !== realMonth && classes.anothermonth)}
                  onDragOver={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    let node = document.getElementById(`time${tmpDay.getTime()}`)
                    if (node !== null) {
                      node.style.background = '#1D2228'
                    }
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    let node = document.getElementById(`time${tmpDay.getTime()}`)
                    if (node !== null) {
                      node.style.background = 'none'
                    }
                  }}
                  onDrop={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    let node = document.getElementById(`time${tmpDay.getTime()}`)
                    if (node !== null) {
                      node.style.background = 'none'
                    }
                  }}
                  onClick={() => {
                    props.setModalDate(tmpDay)
                    props.setModal(true)
                  }}
                >
                  <div
                    className={clsx(classes.monthdayinfo, checkToday && classes.today)}
                    onClick={(e) => {
                      e.stopPropagation()
                      e.preventDefault()
                      props.setTmpViewDay(tmpDay)
                      props.setView('day')
                    }}
                  >
                    {`${tmpDay.getDate()}. ${day}`}
                  </div>
                  <div className={classes.monthdayschedule}>
                    {props.schedule !== undefined &&
                      props.schedule[scheduleDay] !== undefined &&
                      props.schedule[scheduleDay].map((v) => {
                        return (
                          <div
                            style={{ cursor: 'pointer' }}
                            key={v.scheduleId}
                            className={classes.monthschedule}
                            draggable={true}
                            onDragStart={() => {}}
                            onClick={(e: any) => {
                              props.setDetailData(v)
                              props.setModal(true)
                            }}
                          >
                            {v.title}
                          </div>
                        )
                      })}
                  </div>
                </div>
              )
            })}
          </div>
        )
      })}
    </div>
  )
}
