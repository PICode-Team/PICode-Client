import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const messengerStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    chatButton: {
      backgroundColor: theme.font.high.color,
      width: '60px',
      height: '60px',
      borderRadius: '30px',
      position: 'fixed',
      right: '40px',
      bottom: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&>svg': {
        width: '32px',
        height: '32px',
        color: theme.backgroundColor.step0,
      },
      '&:hover': {
        boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
      },
    },
    messenger: {
      backgroundColor: theme.backgroundColor.step2,
      width: '360px',
      height: '720px',
      position: 'fixed',
      right: '30px',
      bottom: '24px',
      borderRadius: '8px',
      boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 10px',
      zIndex: 9,
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

    wrapper: {
      width: '100%',
      height: '100%',
    },

    header: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      boxShadow: 'rgba(0, 0, 0, 0.15) 0px 1px 15px',
    },

    back: {
      cursor: 'pointer',
      '&>svg': {
        width: '28px',
        height: '28px',
        color: theme.font.high.color,
      },
    },
    opponent: {
      width: '90%',
    },
    name: {
      color: theme.font.high.color,
    },
    text: {
      marginRight: '4px',
      fontSize: '18px',
      fontWeight: 'bold',
    },

    online: {
      display: 'flex',
      fontSize: '11px',
      color: theme.font.high.color,
      '&>svg': {
        width: '12px',
        height: '12px',
        color: 'green',
      },
    },
    expand: {
      cursor: 'pointer',
      '&>svg': {
        width: '15px',
        height: '15px',
        transform: 'rotate(0.5turn)',
        marginRight: '4px',
        color: theme.font.high.color,
      },
    },
    cancel: {
      cursor: 'pointer',
      color: theme.font.high.color,
    },

    body: {
      width: '100%',
      height: 'calc(100% - 129px)',
      flex: 1,
      display: 'flex',
      overflow: 'auto',
    },
    contentBox: {
      height: '100%',
      width: '100%',
    },
    content: {
      height: 'fit-content',
      minHeight: 'calc(100% - 20px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      margin: '10px 0px',
    },

    timeWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '30px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    dayBoundary: {
      width: '100%',
      borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      position: 'relative',
      top: '11px',
    },
    timeTicket: {
      position: 'relative',
      color: 'rgba(255, 255, 255, 1)',
      width: 'fit-content',
      height: '22px',
      lineHeight: '22px',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0px 12px',
      borderRadius: '8px',
      backgroundColor: theme.backgroundColor.step2,
    },

    messageBox: {
      padding: '8px 20px',
      display: 'flex',
      paddingBottom: '4px',
      width: '100%',
    },
    user: {
      backgroundColor: '#E8912D',
      width: '22px',
      height: '22px',
      borderRadius: '11px',
    },
    info: {},
    userName: {
      color: 'rgba(255, 255, 255, 1)',
      fontWeight: 'bold',
      marginLeft: '6px',
    },
    time: {
      fontSize: '10px',
      margin: '0px 5px',
      width: '46px',
      whiteSpace: 'nowrap',
      color: theme.font.high.color,
    },
    textWrapper: {
      marginLeft: '6px',
      marginTop: '4px',
      display: 'flex',
      alignItems: 'flex-end',
      maxWidth: '280px',
    },
    messageText: {
      backgroundColor: 'rgba(255, 255, 255, 0.25)',
      borderRadius: '3px',
      padding: '4px 10px',
      color: theme.font.high.color,
    },

    footer: {
      display: 'flex',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px',
      paddingTop: '15px',
      alignItems: 'center',
    },
    attachFile: {
      cursor: 'pointer',
      marginLeft: '6px',
      '&>svg': {
        transform: 'rotate(0.125turn)',
        width: '20px',
        height: '20px',
        color: 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      display: 'flex',
      alignItems: 'center',
    },
    imoji: {
      cursor: 'pointer',
      marginLeft: '6px',
      '&>svg': {
        width: '22px',
        height: '22px',
        color: 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
          color: 'rgba(255, 255, 255 0.7)',
        },
      },
      display: 'flex',
      alignItems: 'center',
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      padding: '8px 12px',
      paddingTop: '2px',
      backgroundColor: 'inherit',
      color: theme.font.high.color,
    },
    send: {
      cursor: 'pointer',
      '&>svg': {
        width: '22px',
        height: '22px',
        color: 'rgba(255, 255, 255, 0.4)',
        '&:hover': {
          color: 'rgba(255, 255, 255, 0.7)',
        },
      },
      display: 'flex',
      alignItems: 'center',
    },

    homeHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: '20px',
    },
    homeBody: {
      width: '100%',
      height: 'calc(100% - 129px)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
    },
    homeFooter: {
      display: 'flex',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px',
      paddingTop: '15px',
      alignItems: 'center',
    },

    backspace: {
      width: '28px',
      height: '28px',
    },
    row: {
      padding: '10px 20px',
      height: '60px',
      width: '100%',
      display: 'flex',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    createChannel: {
      padding: '10px 20px',
      height: '60px',
      width: '100%',
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
    },
    add: {
      color: theme.font.high.color,
      width: '30px !important',
      height: '30px !important',
    },

    users: {
      width: '40px',
      height: '40px',
      backgroundColor: theme.font.high.color,
      borderRadius: '20px',
      marginRight: '12px',
      backgroundImage: "url('/images/picode-7.svg')",
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },

    titleWrapper: {
      flex: 1,
    },
    title: {
      display: 'flex',
      color: theme.font.high.color,
    },
    titleText: {
      fontSize: '11px',
      fontWeight: 'bold',
      color: theme.font.high.color,
    },
    participant: {
      fontSize: '11px',
      marginLeft: '4px',
      color: theme.font.high.color,
    },
    etc: {},
    thumbnail: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '10px',
      fontWeight: 'bold',
    },

    chatInfo: {
      textAlign: 'right',
    },
    lastTime: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.3)',
      width: '55px',
    },
    count: {
      fontSize: '10px',
      backgroundColor: 'red',
      color: theme.font.high.color,
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '10px',
      width: 'fit-content',
      float: 'right',
    },

    messageInfo: {
      '&:hover': {
        '&>div>span>span': {
          display: 'none',
        },
        '&>div>span>div': {
          display: 'flex',
        },
      },
    },
    target: {
      color: theme.font.high.color,
      fontWeight: 'bold',
      marginLeft: '6px',
    },

    interactionDivider: {
      width: '1px',
      height: '16px',
      margin: '2px 0px',
      backgroundColor: '#8092a8',
    },
    interactionIcon: {
      padding: '4px',
      height: '18px',
      cursor: 'pointer',
      '&>svg': {
        width: '14px',
        height: '14px',
        color: '#afc3db',
      },
      '&:hover': {
        '&>svg': {
          color: theme.font.high.color,
        },
      },
    },
    messageInteraction: {
      display: 'none',
      backgroundColor: '#667485',
      borderRadius: '4px',
    },

    customInput: {
      height: '38px',
      width: '100%',
      backgroundColor: 'inherit',
      outline: 'none',
      border: 'none',
      padding: '8px',
      fontSize: '16px',
      overflow: 'auto',
      color: theme.font.high.color,
      '& img': {
        maxWidth: '300px',
      },
    },

    mentionHelper: {
      position: 'absolute',
      width: '200px',
      bottom: '40px',
      backgroundColor: theme.backgroundColor.step3,
      marginLeft: '80px',
      color: theme.font.high.color,
    },

    mentionTarget: {
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      borderBottom: `1px solid ${theme.font.high.color}`,
      lineHeight: '26px',
      padding: '0px 8px',
      cursor: 'pointer',
      '&:nth-last-child(1)': {
        borderBottom: 'none',
      },
      '&:hover': {
        backgroundColor: theme.backgroundColor.step4,
      },
    },

    active: {
      backgroundColor: '#525252',
    },

    newMessage: {
      color: theme.font.high.color,
      width: '100%',
      height: '30px',
      position: 'absolute',
      top: '0px',
      display: 'flex',
      alignItems: 'center',
      pointerEvents: 'none',
      justifyContent: 'center',
      paddingBottom: '15px',
      '&>div': {
        backgroundColor: theme.backgroundColor.step3,
        width: '130px',
        height: '30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '15px',
        cursor: 'pointer',
        opacity: 0,
        pointerEvents: 'none',
        transition: 'ease-in 0.4s opacity',
        '&:after': {
          content: "''",
          position: 'absolute',
          top: 'calc(100% - 7px)',
          left: '50%',
          marginLeft: '-8px',
          marginBottom: '9px',
          border: '8px solid transparent',
          borderTopColor: theme.backgroundColor.step3,
        },
      },
    },
    visible: {
      pointerEvents: 'auto !important' as any,
      '&>div': {
        opacity: '1 !important',
        pointerEvents: 'auto !important' as any,
      },
    },
    togglePosition: {
      width: '100%',
    },
  })
)
