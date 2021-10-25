import { makeStyles } from "@material-ui/styles";
import createStyles from "@material-ui/styles/createStyles";
import { IThemeStyle } from "../../theme";

export const modalStyle = makeStyles((theme: IThemeStyle) =>
    createStyles({
        modalWrapper: {
            position: 'absolute',
            width: 400,
            backgroundColor: "white",
            border: '2px solid #000',
            boxShadow: "2px 2px 2px 1px rgba(0, 0, 0, 0.2)",
            padding: "16px",
            "&:focus":{
                border:"none"
            }
        },
    })
);
