import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const layoutStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    layout: {
      backgroundColor: theme.backgroundColor.step0,
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    loginContent: {
      backgroundColor: theme.loginBackground,
      padding: '100px 60px',
      width: '460px',
      height: '565px',
      justifyContent: 'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      position: 'relative',
      color: theme.font.high.color,
    },
    signupContent: {
      backgroundColor: theme.loginBackground,
      padding: '100px 60px',
      width: '460px',
      height: '720px',
      justifyContent: 'center',
      textAlign: 'center',
      verticalAlign: 'middle',
      position: 'relative',
      color: theme.font.high.color,
    },
    themeChangeButton: {
      position: 'absolute',
      right: '20px',
      top: '20px',
    },
    header: {
      width: '100%',
      height: '449px',
      textAlign: 'center',
    },
    logo: {
      width: '110px',
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
    whiteButton: {
      color: '#fff',
    },
    blackButton: {
      color: '#414C50',
    },
  })
)
