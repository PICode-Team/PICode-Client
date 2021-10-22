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
                <div className={classes.titleName}>
                    {v.title}
                </div>
                <div style={{ width: "100%", height: "calc(100% - 40px)" }}>
                    <div style={{ width: "100%", height: "100%" }}>
                        {v.content}
                    </div>
                </div>
            </div>
        })}
    </div>
}