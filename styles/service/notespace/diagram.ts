import { makeStyles } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import { IThemeStyle } from "../../theme";

export const diagrmStyle = makeStyles((theme: IThemeStyle) =>
    createStyles({
        panelWrapper: {
            position: "absolute",
            width: "120px",
            height: "100px",
            background: theme.backgroundColor.step3,
            right: "30px",
            top: "30px",
            zIndex: 99,
        },
        nodeContainer: {
            width: "100%",
            height: "30px",
            lineHeight: "30px",
            paddingLeft: "10px",
            color: theme.font.high.color,
            "&:hover": {
                background: theme.backgroundColor.step4,
            },
        },
    })
);
