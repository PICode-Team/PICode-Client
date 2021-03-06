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
      '& *::-webkit-scrollbar': {
        height: '10px',
        width: '8px',
        backgroundColor: theme.scroll.bar,
      },
      '& *::-webkit-scrollbar-thumb': {
        borderRadius: '10px',
        backgroundColor: theme.scroll.thumb,
      },
      '& *::-webkit-scrollbar-track': {
        borderRadius: '10px',
        backgroundColor: theme.scroll.track,
      },
    },
    contentWrapper: {
      width: 'calc(100% - 200px)',
      height: '100%',
      overflowX: 'hidden',
      '@media screen and (max-width: 1920px)': {},
      '@media screen and (max-width: 1280px)': {},
      '@media screen and (max-width: 960px)': {
        width: 'calc(100% - 64px)',
      },
      '@media screen and (max-width: 600px)': {
        width: '100%',
      },
    },
    pageName: {
      height: '40px',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      color: theme.font.high.color,
      fontSize: '21px',
      '&>svg': {
        width: '30px',
        height: '30px',
        marginLeft: '12px',
        marginRight: '6px',
      },
      borderBottom: `1px solid ${theme.font.small.color}`,
    },

    toggle: {
      width: 'calc(100% - 64px)',
      '@media screen and (max-width: 600px)': {
        width: '100%',
      },
    },

    overlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      backgroundColor: 'rgb(0, 0, 0)',
      opacity: '0.35',
      zIndex: 9,
      top: 0,
      left: 0,
      display: 'none',
      '@media screen and (max-width: 600px)': {
        display: 'block',
        cursor: 'pointer',
      },
    },
  })
)
