import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const signupStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
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
        color: '#609FF3 !important',
      },
    },
    disableCir: {
      '&>span>span>svg': {
        color: '#566372 !important',
      },
    },
    stepperTextact: {
      '&>span>span': {
        color: `${theme.font.high.color} !important`,
        marginTop: '8px !important',
      },
    },
    stepperText: {
      '&>span>span': {
        color: '#566372 !important',
        marginTop: '8px !important',
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
    userImageCancel: {
      position: 'absolute',
      right: 15,
      top: 15,
      cursor: 'pointer',
    },
    userImage: {
      '&>img': {
        width: '50px',
        height: '50px',
      },
      '&>p': {
        width: '100%',
        marginTop: '6px',
      },
    },
  })
)
