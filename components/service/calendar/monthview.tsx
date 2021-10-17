import clsx from "clsx";
import { cloneDeep } from "lodash";
import React from "react";
import { viewStyle } from "../../../styles/service/calendarspace/day";
import { calDay, checkDate, IDate } from "./calendar";
import { getWeek } from "./weekview";


export default function MonthView(props: IDate) {
    const classes = viewStyle();
    const [dragId, setDragId] = React.useState<string>();
    let weekNum = [0, 1, 2, 3, 4]

    return <div className={classes.monthview}>
        {
            weekNum.map((v) => {
                let tmpStartDate = cloneDeep(props.tmpViewDay);
                tmpStartDate.setDate(props.tmpViewDay.getDate() + 6 * v)
                let tmpWeekData = getWeek(tmpStartDate)
                return <div key={v} className={clsx(classes.monthweek, v === 4 && classes.lastmonthweek)}>
                    {calDay.map((day, idx) => {
                        let tmpDay = cloneDeep(tmpWeekData.startDate);
                        tmpDay.setDate(tmpWeekData.startDate.getDate() + idx);
                        let scheduleDay: string = checkDate(tmpDay);
                        return <div key={tmpDay.getTime()}
                            className={clsx(classes.monthday, idx === 6 && classes.lastmonthday)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                console.log(3)
                            }}
                        >
                            <div className={classes.monthdayinfo} onClick={() => {
                                props.setTmpViewDay(tmpDay)
                                props.setView("day")
                            }}>
                                {`${tmpDay.getDate()}. ${day}`}
                            </div>
                            <div className={classes.monthdayschedule}>
                                {(props.schedule !== undefined && props.schedule[scheduleDay] !== undefined) && props.schedule[scheduleDay].map((v) => {
                                    return <div key={v.scheduleId} className={classes.monthschedule} draggable={true} onDragStart={() => {

                                    }}>
                                        {v.title}
                                    </div>
                                })}
                            </div>
                        </div>
                    })}
                </div>
            })
        }
    </div>
}