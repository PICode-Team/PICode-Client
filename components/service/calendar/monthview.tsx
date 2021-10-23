import clsx from "clsx";
import { cloneDeep } from "lodash";
import React from "react";
import { viewStyle } from "../../../styles/service/calendarspace/day";
import { calDay, checkDate, getToday, IDate } from "./calendar";
import CreateSchedule from "./createschedule";
import { getWeek } from "./weekview";


export default function MonthView(props: IDate) {
    const classes = viewStyle();
    const [dragId, setDragId] = React.useState<string>();
    let weekNum = [0, 1, 2, 3, 4, 5]
    let today = new Date();
    console.log()

    return <div className={classes.monthview}>
        {
            weekNum.map((v) => {
                let tmpStartDate = cloneDeep(props.tmpViewDay);
                tmpStartDate.setDate(props.tmpViewDay.getDate() + 6 * v)
                let tmpWeekData = getWeek(tmpStartDate)
                return <div key={v} className={clsx(classes.monthweek, v === 5 && classes.lastmonthweek)}>
                    {calDay.map((day, idx) => {
                        let tmpDay = cloneDeep(tmpWeekData.startDate);
                        tmpDay.setDate(tmpWeekData.startDate.getDate() + idx);
                        let scheduleDay: string = checkDate(tmpDay);
                        let tmpMonth = tmpDay.getMonth();
                        let realMonth = props.tmpViewDay.getMonth();
                        let checkToday = false;
                        if (getToday(today, "day") === getToday(tmpDay, "day")) {
                            checkToday = true;
                        }
                        return <div key={tmpDay.getTime()}
                            id={`time${tmpDay.getTime()}`}
                            className={clsx(classes.monthday, idx === 6 && classes.lastmonthday, tmpMonth !== realMonth && classes.anothermonth)}
                            onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                let node = document.getElementById(`time${tmpDay.getTime()}`)
                                if (node !== null) {
                                    node.style.background = "#1D2228"
                                }
                            }}
                            onDragLeave={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                let node = document.getElementById(`time${tmpDay.getTime()}`)
                                if (node !== null) {
                                    node.style.background = "none"
                                }
                            }}
                            onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                let node = document.getElementById(`time${tmpDay.getTime()}`)
                                if (node !== null) {
                                    node.style.background = "none"
                                }
                            }}
                            onClick={() => {
                                props.setModal(true)
                            }}
                        >
                            <div className={clsx(classes.monthdayinfo, checkToday && classes.today)} onClick={(e) => {
                                e.stopPropagation();
                                e.preventDefault();
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