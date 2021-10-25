import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const noteStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    note: {
      width: '100%',
      minHeight: 'calc(100% - 50px)',
      position: 'relative',
      display: 'flex',
      background: theme.backgroundColor.step1,
    },
    fileView: {
      width: '300px',
      minHeight: '100%',
      display: 'inline-block',
      background: theme.backgroundColor.step3,
      color: theme.font.high.color,
    },
    content: {
      width: 'calc(100% - 300px)',
      display: 'inline-block',
      minHeight: '100%',
    },
    leftTool: {
      width: '60px',
      color: theme.font.high.color,
      display: 'inline-block',
      height: '16px',
      visibility: 'hidden',
      position: 'absolute',
      top: 0,
      left: 0,
      '&:hover': {
        visibility: 'visible',
      },
    },
    iconButtonColor: {
      width: '20px',
      height: '20px',
      color: theme.font.high.color,
    },
    write: {
      color: theme.font.high.color,
      paddingLeft: '60px',
      display: 'inline-block',
      width: '100%',
      height: 'fit-content',
    },
    title: {
      width: '100%',
      textAlign: 'center',
      backgroundColor: theme.backgroundColor.step4,
      padding: '30px 0px',
      marginBottom: '15px',
    },
    titleContent: {
      color: theme.font.high.color,
      width: '50%',
      display: 'inline-block',
      textAlign: 'left',
    },
    writeRoot: {
      width: '100%',
      height: 'calc(100% - 245px)',
      textAlign: 'center',
    },
    writeContent: {
      width: 'calc(50% + 120px)',
      display: 'inline-block',
      height: '100%',
      cursor: 'text',
    },
    defaultTitle: {
      color: theme.font.high.color,
      background: 'inherit',
      border: 'none',
      '&:focus': {
        border: 'none',
        outline: 'none',
      },
      resize: 'none',
      height: 'auto',
      overflowWrap: 'break-word',
      width: '100%',
      fontSize: '14px',
      padding: '8px 0',
      overflowaY: 'hidden',
      boxSizing: 'border-box',
    },
    defaultInput: {
      background: 'inherit',
      border: 'none',
      '&:focus': {
        border: 'none',
        outline: 'none',
      },
      lineHeight: '22px',
      textAlign: 'left',
      resize: 'none',
      minHeight: '22px',
      height: 'fit-content',
      overflowWrap: 'break-word',
      width: '100%',
      fontSize: '14px',
      overflowY: 'hidden',
      boxSizing: 'border-box',
      whiteSpace: 'pre-wrap',
      '&:empty:before': {
        content: 'attr(placeholder)',
        display: 'inline-block',
      },
    },
    h1Input: {
      fontSize: '28px',
      fontWeight: 700,
      padding: '15px 0',
    },
    h2Input: {
      fontSize: '21px',
      fontWeight: 700,
      padding: '10px 0',
    },
    h3Input: {
      fontSize: '16px',
      fontWeight: 700,
      padding: '6px 0',
    },
    mouseOver: {
      cursor: 'move',
      float: 'left',
      width: '20px',
      height: '20px',
      '&:hover': {
        background: 'black',
      },
    },
    add: {
      float: 'left',
      width: '20px',
      height: '20px',
    },
    settingTool: {
      background: theme.backgroundColor.step2,
      fontSize: theme.font.small.size,
      width: '100px',
      height: 'fit-content',
      zIndex: 3,
      position: 'absolute',
    },
    settingLine: {
      display: 'flex',
      width: '100%',
      padding: '2.5px 10px',
      justifyContent: 'space-between',
      alignContent: 'center',
      height: '25px',
      lineHeight: '20px',
    },
    settingButton: {
      border: 'none',
      background: 'inherit',
      cursor: 'pointer',
    },
    clicked: {
      background: theme.backgroundColor.step4,
    },
    fileRow: {
      display: 'flex',
      position: 'relative',
      height: '25px',
      cursor: 'pointer',
      alignItems: 'center',
      paddingLeft: '16px',
      '&:hover': {
        backgroundColor: '#515d6b',
      },
      '&>input': {
        outline: 'none',
        border: 'none',
        background: 'none',
        color: theme.font.high.color,
      },
    },

    fileEdit: {
      height: '28px',
      width: '100%',
      position: 'relative',
      borderBottom: `2px solid #c6c6c6`,
    },
    buttonColor: {
      color: theme.font.low.color,
    },
    iconButton: {
      position: 'absolute',
      right: 0,
      padding: 0,
      height: '30px',
      paddingRight: '12px',
    },
    contextWrapper: {
      position: 'absolute',
      width: '150px',
      height: '200px',
      background: theme.backgroundColor.step3,
      color: theme.font.high.color,
      padding: '10px 0px',
      boxShadow: '2px 1px 10px 2px rgba(0, 0, 0, 0.2)',
    },
    contextRow: {
      width: '100%',
      height: '26px',
      padding: '3px 10px',
      lineHeight: '20px',
      fontSize: '14px',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      '&:hover': {
        background: theme.backgroundColor.step4,
      },
    },
    delete: {
      position: 'absolute',
      right: 0,
      padding: 0,
      height: '30px',
      paddingRight: '12px',
    },
    expandMoreRounded: {
      height: '30px',
      transition: 'all 0.3s',
    },
    key: {
      display: 'flex',
      paddingLeft: '4px',
      lineHeight: '24px',
    },
    contextIcon: {
      height: '20px',
    },
    addFile: {
      position: 'absolute',
      right: 0,
      top: 0,
      padding: 0,
      paddingRight: '12px',
    },

    contentWrapper: {
      height: 'fit-content',
      width: '100%',
      position: 'relative',
    },
    description: {
      height: '20px',
    },
    drawRoot: {
      width: '100%',
      height: 'calc(100% - 226px)',
      marginTop: '-15px',
      display: 'flex',
    },
  })
)
