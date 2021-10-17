import { makeStyles } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import { IThemeStyle } from "../../theme";

export const calendarStyle = makeStyles((theme: IThemeStyle) =>
    createStyles({
        wrapper: {
            width: "100%",
            height: "calc(100% - 90px)",
            padding: "24px",
        },
        calendarContent: {
            width: "100%",
            height: "100%",
            background: theme.backgroundColor.step2,
        },
        topbar: {
            width: "100%",
            height: "72px",
            borderBottom: `2px solid ${theme.backgroundColor.step4}`,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
        },
        changeday: {
            width: "48px",
            height: "48px",
        },
        today: {
            width: "50%",
            minWidth: "320px",
            height: "48px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative",
        },
        calendar: {
            width: "100%",
            height: "calc(100% - 72px)",
        },
        iconcolor: {
            color: theme.font.high.color,
        },
        todaytext: {
            fontSize: theme.font.high.size,
            color: theme.font.high.color,
            cursor: "pointer",
            "&:hover": {
                color: theme.backgroundColor.step3,
            },
        },
        changeview: {
            paddingLeft: "16px",
        },
        selectview: {
            width: "72px",
            height: "48px",
            background: "rgba(0,0,0,0)",
            border: "none",
            color: "#fff",
            fontSize: theme.font.low.size,
            textAlign: "left",
            borderRadius: 0,
            "&>option": {
                background: theme.backgroundColor.step3,
                borderRadius: 0,
                "&>hover": {
                    background: `${theme.backgroundColor.step2}!important`,
                },
            },
        },
    })
);
