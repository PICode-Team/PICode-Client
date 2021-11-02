import React from 'react'
import { viewStyle } from '../../../styles/service/calendarspace/day'
import { checkDate, ICalendarData, IDate } from './calendar'

export default function DayView(props: IDate & { setModalDate: React.Dispatch<React.SetStateAction<Date>>; setDetailData: React.Dispatch<React.SetStateAction<ICalendarData | null>> }) {
  const classes = viewStyle()
  let scheduleDay: string = checkDate(props.tmpViewDay)
  return (
    <div
      className={classes.day}
      onClick={() => {
        props.setModalDate(props.tmpViewDay)
        props.setModal(true)
      }}
    >
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
              <div style={{ width: '100%', height: 'calc(100% - 40px)' }}>
                <div style={{ width: '100%', height: '100%' }}>{v.content}</div>
              </div>
            </div>
          )
        })}
    </div>
  )
}
