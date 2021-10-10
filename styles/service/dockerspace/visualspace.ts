import { makeStyles } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import { IThemeStyle } from "../../theme";

export const visualizerStyle = makeStyles((theme: IThemeStyle) =>
    createStyles({
        root: {
            position: "relative",
            width: "100%",
            height: "calc(100% - 90px)",
            padding: "24px",
        },
        content: {
            background: theme.backgroundColor.step2,
            width: "100%",
            height: "100%",
        },
        nodeContainer: {
            width: "150px",
            borderRadius: "10px",
            padding: "10px",
            color: theme.font.high.color,
        },
        iconButton: {
            padding: 0,
            color: theme.font.high.color,
        },
    })
);
