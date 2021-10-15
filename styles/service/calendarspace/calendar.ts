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
        realCalendar: {
            width: "100%",
            height: "100%",
            background: theme.backgroundColor.step2,
            color: theme.font.high.color,
            border: "none",
        },
        tile: {
            width: "14%",
        },
    })
);
