import React, { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import Calendar from 'react-calendar';
import data from "./data.json";
import { calendarStyle } from "../../../styles/service/calendarspace/calendar";

interface ICalendarType {
    [key: string]: ICalendarData[]
}


interface ICalendarData {
    "type": string;
    "title": string;
    "content": string;
    "startDate": string;
    "dueDate": string;
    "milestone": string;
    "creator": string;
    "issue": string;
    "scheduleId": string;
}


export default function CalanderSpace() {
    const [calendarData, setCalendarData] = useState<ICalendarType>();
    const classes = calendarStyle();

    useEffect(() => {
        setCalendarData(data); ///get calendar data
    }, [])

    return <div className={classes.wrapper}>
        <div className={classes.calendarContent}>
            <Calendar
                className={classes.realCalendar}
                tileClassName={classes.tile}
            />
        </div>
    </div>
}