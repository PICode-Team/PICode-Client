import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const codeStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    codeWrapper: {
      width: '100%',
      height: 'calc(100% - 50px)',
      display: 'flex',
      flexDirection: 'column',
    },
    topMenu: {
      width: '100%',
      height: '20px',
      position: 'relative',
      background: theme.backgroundColor.step3,
    },
    contentWrapper: {
      width: '100%',
      height: 'calc(100% - 20px)',
      display: 'flex',
      background: '#1e1e1e',
    },
    sidebar: {
      width: '150px',
      minWidth: '150px',
      height: '100%',
      position: 'relative',
      display: 'inline-block',
      background: theme.backgroundColor.step2,
    },
    codeConent: {
      width: '100%',
      height: '100%',
      display: 'inline-block',
      flexDirection: 'column',
      background: 'inherit',
    },
    positionWrapper: {
      width: '100%',
      height: '100%',
      display: 'inline-block',
      position: 'relative',
    },
    topFileView: {
      width: '100%',
      height: '30px',
      overflowX: 'auto',
      overflowY: 'hidden',
      whiteSpace: 'nowrap',
      background: theme.backgroundColor.step0,
      '&::-webkit-scrollbar': {
        width: '5px!important',
        height: '4px!important',
      },
      '&::-webkit-scrollbar-thumb': {
        background: `${theme.scroll.thumb}!important`,
      },
    },
    realCode: {
      width: '100%',
      height: 'calc(100% - 54px)',
    },
    sideFile: {
      width: '100%',
      height: '28px',
      lineHeight: '28px',
      padding: '0 15px',
      position: 'relative',
      color: theme.font.high.color,
      cursor: 'pointer',
      '&:hover': {
        background: theme.backgroundColor.step1,
      },
    },
    dragEventer: {
      width: 0,
      height: 0,
      position: 'absolute',
      zIndex: 4,
      pointerEvents: 'none',
      transition: 'width 0.05s,height 0.05s,left 0.05s,top 0.05s',
    },
    topFile: {
      width: 'auto',
      maxWidth: '200px',
      paddingRight: '35px',
      height: '30px',
      color: '#fff',
      display: 'inline-block',
      lineHeight: '30px',
      border: '1px solid #1e1e1e',
      paddingLeft: '15px',
      background: '#2C3239',
      position: 'relative',
      cursor: 'pointer',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
    activeTopFile: {
      background: '#1e1e1e',
    },
    projectNameContainer: {
      width: '100%',
      height: '25px',
      position: 'absolute',
      boxShadow: '0 4px 4px rgba(0, 0, 0, 0.4)',
    },
    projectName: {
      height: '25px',
      width: '100%',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      lineHeight: '25px',
      paddingLeft: '10px',
      fontWeight: 'bold',
      color: theme.font.high.color,
      display: 'inline-block',
    },
    fileName: {
      paddingLeft: '22px',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      width: '100%',
      overflow: 'hidden',
    },
    fileImage: {
      position: 'absolute',
      width: '15px',
      height: '28px',
      lineHeight: '28px',
      display: 'flex',
      alignItems: 'center',
    },
    topFileImage: {
      position: 'absolute',
      width: '15px',
      height: '30px',
      lineHeight: '30px',
      display: 'flex',
      alignItems: 'center',
    },
    itemContainer: {
      width: '100%',
      height: 'calc(100% - 25px)',
      top: '25px',
      overflowY: 'auto',
      position: 'absolute',
      whiteSpace: 'nowrap',
      '&>input': {
        outline: 'none',
        border: `1px solid ${theme.backgroundColor.step3}`,
        background: 'none',
        color: theme.font.high.color,
      },
    },
    sidebarItemContainer: {
      width: '110px',
      height: '110px',
      position: 'absolute',
      display: 'none',
      zIndex: 4,
      background: theme.backgroundColor.step4,
    },
    sidebarItem: {
      width: '100%',
      height: '25px',
      padding: '5px 10px',
      lineHeight: '17px',
      display: 'flex',
      justifyContent: 'space-between',
      color: theme.font.high.color,
      fontSize: '12px',
      cursor: 'pointer',
      '&:hover': {
        background: theme.backgroundColor.step3,
      },
      borderBottom: `2px solid ${theme.backgroundColor.step3}`,
    },
    topMenuContainer: {
      position: 'absolute',
      right: '5px',
      top: 0,
      display: 'none',
    },
    topButton: {
      height: '25px',
      width: '25px',
    },
    topIconSize: {
      height: '20px',
      color: '#fff',
    },
  })
)

export const terminalStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    terminal: {
      width: '100%',
      position: 'relative',
      padding: '12px',
      backgroundColor: '#1E1E1E',
      borderTop: `2px solid #383838`,
      zIndex: 100,
      '&:focus': {
        outline: 'none',
      },
      overflow: 'hidden',
      paddingBottom:"24px"
    },
    resizerBar: {
      height: '10px',
      width: '100%',
      position: 'absolute',
      marginTop: '-12px',
      marginLeft: '-12px',
      '&:hover': {
        background: theme.backgroundColor.step2,
        cursor: 'row-resize',
      },
    },
  })
)
