import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const signupStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    login: {
      backgroundColor: theme.backgroundColor.step0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginForm: {
      backgroundColor: theme.loginBackground,
      padding: '100px 60px',
      width: '460px',
      height: '800px',
      justifyContent: 'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      position: 'relative',
      color: theme.font.high.color,
    },
    loginImage: {
      width: '30%',
      height: '100%',
      display: 'flex',
      color: theme.font.low.color,
      alignItems: 'center',
      justifyContent: 'center',
    },
    titleText: {
      marginTop: '5px',
      height: '32px',
      width: '100%',
      textAlign: 'center',
      fontWeight: 'bold',
      fontSize: '28px',
      lineHeight: '32px',
      color: theme.font.high.color,
    },
    subject: {
      fontSize: theme.font.high.size,
      width: '100%',
      textAlign: 'center',
    },
    inputBox: {
      textAlign: 'center',
      width: '100%',
      padding: '8px 0 24px 0',
    },
    buttonBox: {
      textAlign: 'center',
      fontSize: theme.font.small.size,
      width: '100%',
      '&>a:hover': {
        opacity: 0.7,
      },
    },
    themeChangeButton: {
      position: 'absolute',
      right: '20px',
      top: '20px',
    },
    stepper: {
      background: theme.loginBackground,
      padding: '24px 0 0 0',
      width: '100%',
      color: theme.font.high.color,
    },
    buttonGroup: {
      width: '100%',
      display: 'flex',
      marginTop: '20px',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    button: {
      width: '45%',
      height: '40px',
      background: '#609FF3',
      lineHeight: '40px',
      borderRadius: 4, //30
      fontSize: '18px',
      transition: '0.3s',
      color: theme.font.high.color,
      cursor: 'pointer',
    },
    activeButton: {
      color: theme.font.high.color,
      background: '#609FF3',
      '&:hover': {
        transition: '0.3s',
        background: '#217BF4',
      },
    },
    disableButton: {
      background: '#566372',
      color: theme.font.low.color,
    },
    activeCir: {
      '&>span>span>svg': {
        color: '#609FF3!important',
      },
    },
    disableCir: {
      '&>span>span>svg': {
        color: '#566372!important',
      },
    },
    stepperTextact: {
      '&>span>span': {
        color: `${theme.font.high.color}!important`,
        marginTop: '8px!important',
      },
    },
    stepperText: {
      '&>span>span': {
        color: '#566372!important',
        marginTop: '8px!important',
      },
    },
    uploadFile: {
      width: '100%',
      height: '150px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: `1px dashed ${theme.font.low.color}`,
      borderSpacing: '3px',
      position: 'relative',
    },
    fileContent: {
      width: '100%',
      height: '100%',
      cursor: 'pointer',
      lineHeight: '150px',
      position: 'relative',
    },
  })
)
