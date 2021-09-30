import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const sidebarStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    sideBar: {
      width: '200px',
      height: '100%',
      backgroundColor: theme.backgroundColor.step1,
      transition: 'ease-in left 0.2s',
      '@media screen and (max-width: 1920px)': {},
      '@media screen and (max-width: 1280px)': {},
      '@media screen and (max-width: 960px)': {
        width: '64px',
      },
      '@media screen and (max-width: 600px)': {
        position: 'absolute',
        zIndex: 1000,
        left: '-200px',
        width: '200px',
      },
    },
    logo: {
      height: '50px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      cursor: 'pointer',
      flex: 1,
    },
    logoImage: {
      width: '40px',
      height: '40px',
      lineHeight: '50px',
      paddingRight: '8px',
      '@media screen and (max-width: 1920px)': {},
      '@media screen and (max-width: 1280px)': {},
      '@media screen and (max-width: 960px)': {
        marginLeft: '10px',
      },
      '@media screen and (max-width: 600px)': {},
    },
    logoText: {
      color: theme.font.high.color,
      fontSize: '20px',
      fontWeight: 'bold',
      paddingTop: '5px',
      '@media screen and (max-width: 1920px)': {},
      '@media screen and (max-width: 1280px)': {},
      '@media screen and (max-width: 960px)': {
        display: 'none',
      },
      '@media screen and (max-width: 600px)': {
        display: 'inline-block',
      },
    },
    rowWrapper: {},
    toggle: {
      width: '64px',
      justifyContent: 'center',
      paddingLeft: '0px',
    },
    toggleLogo: {
      '&>img': {
        marginLeft: '10px',
      },
      '&>span': {
        display: 'none',
      },
    },
    show: {
      '@media screen and (max-width: 600px)': {
        left: '0px',
      },
    },
  })
)

export const rowStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    row: {
      width: '100%',
      height: '40px',
      display: 'flex',
      alignItems: 'center',
      paddingLeft: '20px',
      textDecoration: 'none',
      lineHeight: '40px',
      cursor: 'pointer',
      fontSize: '16px',
      color: theme.font.medium.color,
      '&>svg': {
        left: 20,
      },
    },
    content: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      '@media screen and (max-width: 1920px)': {},
      '@media screen and (max-width: 1280px)': {},
      '@media screen and (max-width: 960px)': {
        display: 'none',
      },
      '@media screen and (max-width: 600px)': {
        display: 'block',
      },
    },
    text: {
      whiteSpace: 'nowrap',
      marginLeft: '15px',
    },
    hidden: {
      visibility: 'hidden',
    },
    toggle: {
      width: '64px',
      justifyContent: 'center',
      paddingLeft: '0px',
    },
    active: {
      background: '#4078B8',
    },
    unactive: {
      '&:hover': {
        background: theme.loginBackground,
      },
    },
    collapseButton: {
      color: theme.font.high.color,
      height: '24px !important',
      width: '24px !important',
    },
    collapseWrapper: {
      transition: 'all ease 0.3s 0s',
      height: '80px',
      width: '100%',
      background: theme.backgroundColor.step2,
      overflow: 'hidden',
    },
    unOpenWrapper: {
      transition: 'all ease 0.3s 0s',
      height: '0',
      background: theme.backgroundColor.step2,
      width: '100%',
      overflow: 'hidden',
    },
  })
)
