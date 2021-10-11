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
            position: "relative",
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
        buttonHolder: {
            position: "absolute",
            right: "12px",
            top: "12px",
            fontSize: "13px",
            background: theme.backgroundColor.step3,
            color: theme.font.high.color,
            display: "flex",
            justifyContent: "space-between",
            zIndex: 99,
            "&:hover": {
                background: theme.backgroundColor.step4,
            },
        },
        footerButton: {
            width: "100px",
            marginTop: "6px",
            marginLeft: "12px",
            height: "32px",
            color: theme.font.high.color,
            fontSize: theme.font.small.size,
            borderRadius: "2px",
            border: "none",
            background: theme.backgroundColor.step2,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            cursor: "pointer",
            "&:nth-child(1)": {
                background: "#566372",
                "&:hover": {
                    background: "#647487",
                    transition: "all 0.3s",
                },
            },
            "&:nth-child(2)": {
                background: "#4078b8",
                "&:hover": {
                    background: "#488cd9",
                    transition: "all 0.3s",
                },
            },
        },
        overlay: {
            "& .MuiDialog-paper": {
                background: "none",
            },
        },
    })
);
