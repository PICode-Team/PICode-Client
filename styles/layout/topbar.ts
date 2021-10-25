import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const topbarStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    topBar: {
      backgroundColor: theme.backgroundColor.step2,
      width: '100%',
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    titleName: {
      color: theme.font.high.color,
      fontSize: theme.font.medium.size,
    },
    toggleIcon: {
      color: theme.font.high.color,
      padding: '0px 6px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      cursor: 'pointer',
      '&>svg': {
        width: '31px',
        height: '31px',
      },
    },
    loginUserInfo: {
      lineHeight: '50px',
      display: 'flex',
      float: 'right',
      marginRight: '5px',
      paddingTop: '3px',
      color: theme.font.high.color,
      height: '100%',
      alignItems: 'center',
    },
    userInfoData: {
      width: '26px',
      height: '26px',
      background: theme.backgroundColor.step3,
      color: theme.font.high.color,
      border: `1px solid ${theme.font.high.color}`,
      borderRadius: '25px',
      marginLeft: '-8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
    },

    icon: {
      color: theme.font.high.color,
      padding: '0px 8px',
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      cursor: 'pointer',
      '&>svg': {
        width: '24px',
        height: '24px',
      },
    },

    toggle: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },

    interaction: {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
      marginRight: '20px',
    },
  })
)
