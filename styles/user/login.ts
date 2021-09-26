import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const loginStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    button: {
      width: '100%',
      height: '40px',
      background: '#609FF3',
      lineHeight: '40px',
      borderRadius: 4, //30
      fontSize: '18px',
      transition: '0.3s',
      color: theme.font.high.color,
      cursor: 'pointer',
      marginTop: '40px',
      '&:hover': {
        transition: '0.3s',
        background: '#217BF4',
      },
    },
    signUpbutton: {
      color: theme.font.low.color,
      marginTop: '20px',
      '&>a': {
        color: '#609FF3 !important',
        transition: '0.3s',
        '&:hover': {
          transition: '0.3s',
          color: '#217BF4',
        },
      },
    },
  })
)
