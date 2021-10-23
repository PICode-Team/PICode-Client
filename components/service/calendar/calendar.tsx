/* eslint-disable react-hooks/exhaustive-deps */
import { Button, IconButton, MenuItem, Select } from "@material-ui/core";
import { ArrowBackIosOutlined, ArrowForwardIosOutlined, CalendarViewDayOutlined } from "@material-ui/icons";
import { cloneDeep } from "lodash";
import React, { useEffect, useState } from "react";
import 'react-calendar/dist/Calendar.css';
import { calendarStyle } from "../../../styles/service/calendarspace/calendar";
import { useWs } from "../../context/websocket";
import CustomSelect from "../../items/input/select";
import { viewData } from "./constant";
import data from "./data.json";
import DayView from "./dayview";
import MonthView from "./monthview";
import WeekView, { getWeek } from "./weekview";

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

export const checkDate = (date: Date) => {
    return `${String(date.getFullYear()).slice(2, 4)}-${date.getMonth() + 1}-${date.getDate()}`;
}

export interface IDate {
    today: Date,
    tmpViewDay: Date,
    schedule: ICalendarType | undefined,
    setTmpViewDay: React.Dispatch<React.SetStateAction<Date>>,
    setView: React.Dispatch<React.SetStateAction<string>>
}

export const calDay = ["Sun", "Mon", "Tue", "Wen", "Tur", "Fri", "Sat"]

export const getToday = (date: Date, type: string) => {
    let tmpData = getWeek(date);
    if (type === "day") {
        return `${date.getFullYear()}.${date.getMonth() + 1}.${date.getDate()} ${calDay[date.getDay()]}`;
    } else if (type === "week") {
        if (tmpData.endDate.getMonth() + 1 !== date.getMonth() + 1) {
            return `${date.getFullYear()}.${date.getMonth() + 1} - ${tmpData.endDate.getMonth() + 1}`;
        } else if (tmpData.startDate.getMonth() + 1 !== date.getMonth() + 1) {
            return `${date.getFullYear()}.${tmpData.startDate.getMonth() + 1} - ${date.getMonth() + 1} `;
        } else {
            return `${date.getFullYear()}.${date.getMonth() + 1}`;
        }
    } else {
        return `${date.getFullYear()}.${date.getMonth() + 1}`;
    }
}

export default function CalanderSpace(props: any) {
    const [calendarData, setCalendarData] = useState<ICalendarType>();
    const ws: any = useWs();
    const classes = calendarStyle();
    const [view, setView] = React.useState<string>("day");
    const [today, setToday] = React.useState<Date>(new Date())
    const [tmpViewDay, setTmpViewDay] = React.useState<Date>(new Date());

    const calendarWebsocketHanlder = (msg: any) => {
        const message = JSON.parse(msg.data);
        if (message.category === "calendar") {
            switch (message.type) {
                case "getCalendar": {
                    console.log(message)
                    setCalendarData(message.data.schedules);
                    break;
                }
            }
        }
    };

    useEffect(() => {
        setCalendarData(data)
    }, [])

    useEffect(() => {
        if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
            console.log(ws)
            ws.addEventListener("message", calendarWebsocketHanlder);
            let payload = {
                category: "calendar",
                type: "getCalendar",
                data: {}
            }
            ws.send(JSON.stringify(payload))
        }
    }, [ws?.readyState])

    useEffect(() => {
        if (view === "month") {
            if (tmpViewDay === undefined) return;

            let tmpYear = tmpViewDay.getFullYear();
            let tmpMonth = tmpViewDay.getMonth();

            let newDate = new Date(tmpYear, tmpMonth, 1);
            setTmpViewDay(newDate)
        }
    }, [view])


    const returnValue: {
        [key: string]: JSX.Element
    } = {
        day: <DayView today={today}
            tmpViewDay={tmpViewDay}
            schedule={calendarData}
            setTmpViewDay={setTmpViewDay}
            setView={setView} />,
        week: <WeekView
            today={today}
            tmpViewDay={tmpViewDay}
            schedule={calendarData}
            setTmpViewDay={setTmpViewDay}
            setView={setView}
        />,
        month: <MonthView
            today={today}
            tmpViewDay={tmpViewDay}
            schedule={calendarData}
            setTmpViewDay={setTmpViewDay}
            setView={setView}
        />
    }

    return <div className={classes.wrapper}>
        <div className={classes.calendarContent}>
            <div className={classes.topbar}>
                <div className={classes.changeday}>
                    <IconButton onClick={() => {
                        if (view === "day") {
                            let tmpData = cloneDeep(tmpViewDay);
                            tmpData.setDate(tmpViewDay.getDate() - 1)
                            setTmpViewDay(tmpData)
                        } else if (view === "week") {
                            let tmpData = cloneDeep(tmpViewDay);
                            tmpData.setDate(tmpViewDay.getDate() - 7)
                            setTmpViewDay(tmpData)
                        } else {
                            let tmpData = cloneDeep(tmpViewDay);
                            tmpData.setMonth(tmpData.getMonth() - 1);
                            setTmpViewDay(tmpData)
                        }
                    }}>
                        <ArrowBackIosOutlined className={classes.iconcolor} />
                    </IconButton>
                </div>
                <div className={classes.today}>
                    <div className={classes.todaytext} onClick={() => {
                        setTmpViewDay(today);
                    }}>
                        {getToday(tmpViewDay, view)}
                    </div>
                    <div className={classes.changeview}>
                        <select className={classes.selectview}
                            value={view}
                            onChange={(e) => {
                                setView(e.target.value)
                            }}
                        >
                            {viewData.map((v) => {
                                return <option key={v} value={v}>{v}</option>
                            })}
                        </select>
                    </div>
                </div>
                <div className={classes.changeday}>
                    <IconButton onClick={() => {
                        if (view === "day") {
                            let tmpData = cloneDeep(tmpViewDay);
                            tmpData.setDate(tmpViewDay.getDate() + 1)
                            setTmpViewDay(tmpData)
                        }
                        else if (view === "week") {
                            let tmpData = cloneDeep(tmpViewDay);
                            tmpData.setDate(tmpViewDay.getDate() + 7)
                            setTmpViewDay(tmpData)
                        } else {
                            let tmpData = cloneDeep(tmpViewDay);
                            tmpData.setMonth(tmpData.getMonth() + 1);
                            setTmpViewDay(tmpData)
                        }
                    }}>
                        <ArrowForwardIosOutlined className={classes.iconcolor} />
                    </IconButton>
                </div>
            </div>
            <div className={classes.calendar}>
                {calendarData !== undefined && returnValue[view]}
            </div>
        </div>
    </div>
}