import React from "react";
import { viewStyle } from "../../../styles/service/calendarspace/day";
import { checkDate, IDate } from "./calendar";


export default function DayView(props: IDate) {
    const classes = viewStyle();
    let scheduleDay: string = checkDate(props.tmpViewDay);
    return <div className={classes.day}>
        {(props.schedule !== undefined && props.schedule[scheduleDay] !== undefined) && props.schedule[scheduleDay].map((v) => {
            return <div key={v.scheduleId} className={classes.dayContainer} draggable={true} onDragStart={() => {

            }}>
                {v.title}
            </div>
        })}
    </div>
}