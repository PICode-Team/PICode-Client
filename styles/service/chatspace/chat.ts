import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const chatStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    chat: {
      backgroundColor: '#2c3239',
      width: '100%',
      height: 'calc(100% - 90px)',
      display: 'flex',
    },
    emptyWrapper: {
      flex: 1,
      height: '100%',
      color: theme.font.high.color,
      fontSize: theme.font.high.size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor.step0,
      textAlign: 'center',
      '@media screen and (max-width: 1280px)': {
        display: 'none',
      },
    },
  })
)

export const activitybarStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    activitybar: {
      width: '350px',
      height: '100%',
      borderLeft: '1px solid #505050',
      '@media screen and (max-width: 1280px)': {
        display: 'none',
      },
    },
  })
)

export const activitybarHeaderStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    activitybarHeader: {
      height: '60px',
      width: '100%',
      borderBottom: '1px solid #505050',
      color: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 20px',
      justifyContent: 'space-between',
    },
    activitybarTitle: {
      fontSize: '28px',
      fontWeight: 'bold',
      marginRight: '8px',
    },
    activitybarTarget: {},
    activitybarClose: {
      marginTop: '8px',
      cursor: 'pointer',
    },
  })
)

export const activitybarContentStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    activitybarContent: {
      maxHeight: 'calc(100% - 60px)',
      overflow: 'auto',
      paddingBottom: '50px',
    },
    contentBox: {
      height: 'fit-content',
      minHeight: 'calc(100% - 20px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginBottom: '10px',
      marginTop: '10px',
    },
  })
)

export const contentStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    contentWrapper: {
      height: '100%',
      flex: 1,
      backgroundColor: '#2C3239',
      '@media screen and (max-width: 1280px)': {
        display: 'none',
      },
    },
    content: {
      height: 'calc(100% - 165px)',
      width: '100%',
      flex: 1,
      display: 'flex',
      overflow: 'auto',
    },
    contentBox: {
      height: 'fit-content',
      minHeight: 'calc(100% - 20px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      marginBottom: '10px',
      marginTop: '10px',
    },
  })
)

export const boundaryStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    boundaryWrapper: {
      display: 'flex',
      flexDirection: 'column',
      height: '30px',
      justifyContent: 'center',
      alignItems: 'center',
    },
    boundary: {
      width: '100%',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      position: 'relative',
      top: '11px',
    },
    boundaryTicket: {
      position: 'relative',
      color: theme.font.high.color,
      width: 'fit-content',
      height: '22px',
      lineHeight: '22px',
      fontSize: '12px',
      fontWeight: 'bold',
      padding: '0px 12px',
      borderRadius: '8px',
      border: '1px solid rgba(255, 255, 255, 0.15)',
      backgroundColor: theme.backgroundColor.step0,
    },
  })
)

export const messageBoxStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    messageBox: {
      padding: '8px 20px',
      display: 'flex',
    },
    messageInfo: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-end',
      '&:hover': {
        '&>div>span>strong>span': {
          display: 'none',
        },
        '&>div>span>strong>div': {
          display: 'flex',
        },
      },
    },
    thumbnail: {
      backgroundColor: '#ffffff',
      width: '22px',
      height: '22px',
      borderRadius: '11px',
      backgroundImage: "url('/images/picode-7.svg')",
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    target: {
      color: theme.font.high.color,
      fontWeight: 'bold',
      marginLeft: '6px',
    },
    textWrapper: {
      marginLeft: '6px',
      marginTop: '4px',
      display: 'flex',
      alignItems: 'flex-end',
    },
    messageText: {
      backgroundColor: theme.backgroundColor.step3,
      borderRadius: '14px',
      padding: '4px 14px',
      color: theme.font.high.color,
      maxWidth: '750px',
      height: 'fit-content',
    },
    time: {
      color: theme.font.high.color,
      fontSize: '10px',
      margin: '0px 5px',
      height: '18px',
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
          color: '#ffffff',
        },
      },
    },
    messageInteraction: {
      display: 'none',
      backgroundColor: '#667485',
      borderRadius: '4px',
    },
    thread: {
      height: '24px',
      display: 'flex',
      alignItems: 'center',
      padding: '2px 10px',
      borderRadius: '10px',
      backgroundColor: '#5a687a',
      marginTop: '6px',
      marginLeft: '6px',
      cursor: 'pointer',
    },
    threadParticipant: {
      display: 'flex',
      marginRight: '6px',
      '&>div': {
        width: '18px',
        height: '18px',
        borderRadius: '9px',
        backgroundColor: '#ffffff',
        marginRight: '4px',
      },
    },
    threadCount: {
      marginRight: '6px',
      color: '#ffffff',
      fontSize: '12px',
    },
    lastThread: {
      color: '#ffffff',
      fontSize: '12px',
    },
    reversedMessageBox: {
      display: 'flex',
      justifyContent: 'flex-end',
    },
    reversedTextWrapper: {
      display: 'flex',
      flexDirection: 'row-reverse',
    },

    preview: {
      cursor: 'pointer',
      width: '300px',
      float: 'right',
      marginTop: '10px',
      backgroundColor: theme.backgroundColor.step2,
    },
    image: {
      cursor: 'pointer',
      height: '140px',
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundColor: theme.backgroundColor.step3,
    },

    title: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
      padding: '0px 10px',
      paddingTop: '5px',
    },
    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      color: theme.font.low.color,
      fontSize: theme.font.small.size,
      padding: '0px 10px',
    },
    link: {
      color: theme.font.low.color,
      fontSize: theme.font.small.size,
      opacity: 0.6,
      padding: '0px 10px',
      paddingBottom: '5px',
    },

    imageWrapper: {
      display: 'flex',
      justifyContent: 'flex-end',
    },

    contentImage: {
      marginTop: '2px',
      marginLeft: '10px',
    },
  })
)

export const enteringStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    entering: {
      height: '24px',
      display: 'flex',
      alignItems: 'center',
    },
    enterIcon: {
      marginRight: '2px',
      '&>svg': {
        width: '10px',
        height: '9px',
        color: theme.font.medium.color,
        transition: 'all ease-in 0.2s',
        animation: '$entering 2s infinite',
        '&:nth-child(1)': {},
        '&:nth-child(2)': { animationDelay: '0.25s' },
        '&:nth-child(3)': { animationDelay: '0.5s' },
      },
    },
    enterText: {
      color: theme.font.medium.color,
      fontSize: '11px',
      fontWeight: 'bold',
      lineHeight: '24px',
    },
  })
)

export const chatInputStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    input: {
      height: '105px',
      padding: '0px 20px',
      paddigTop: '10px',
    },
    inputBox: {
      height: 'calc(100% - 24px)',
      width: '100%',
      border: '1px solid rgba(255, 255, 255, 0.5)',
      color: theme.font.medium.color,
      backgroundColor: theme.backgroundColor.step1,
    },
    customInput: {
      height: '38px',
      width: '100%',
      backgroundColor: 'inherit',
      color: 'inherit',
      outline: 'none',
      border: 'none',
      padding: '8px',
      fontSize: '16px',
      overflow: 'auto',
    },
    interaction: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      height: '51px',
      padding: '4px 8px 0px',
      '&>div': {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      },
      '&>div>div>svg': {
        color: '#515C60',
        cursor: 'pointer',
        '&:hover': {
          color: '#ffffff',
        },
      },
    },
    formatBold: {},
    formatItalic: {},
    formatStrikethrough: {
      marginRight: '1px',
    },
    code: {
      marginRight: '4px',
    },
    link: {
      marginRight: '1px',
    },
    formatListNumbered: {
      marginRight: '4px',
    },
    formatListBulleted: {},
    textFormat: {
      marginRight: '1px',
    },
    alternateEmail: {
      marginRight: '4px',
    },
    sentimentSatisfied: {
      marginRight: '4px',
    },
    attachFile: {
      marginRight: '4px',
    },
    send: {},

    mentionHelper: {
      position: 'absolute',
      width: '200px',
      bottom: '100px',
      backgroundColor: theme.backgroundColor.step3,
      marginLeft: '20px',
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
      backgroundColor: 'red',
    },
  })
)

export const chatSidebarStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    sidebar: {
      width: '350px',
      height: '100%',
      backgroundColor: '#3b434d',
      padding: '20px',
      '@media screen and (max-width: 600px)': {
        display: 'none',
      },
    },

    sidebarHeader: {
      padding: '0px 12px',
      marginBottom: '20px',
    },

    search: {
      width: '100%',
      height: '40px',
      backgroundColor: '#434D59',
      borderRadius: '20px',
      display: 'flex',
      padding: '0px 12px',
      alignItems: 'center',
      '&>svg': {
        color: '#ffffff',
        marginRight: '6px',
      },
      '&>input': {
        backgroundColor: 'inherit',
        outline: 'none',
        border: 'none',
        color: '#ffffff',
        marginTop: '4px',
        '&::placeholder': {
          color: 'rgba(183, 183, 183, 0.42)',
          fontSize: '17px',
        },
      },
    },

    sidebarContent: {},

    channel: {
      margin: '0px -15px',
      width: 'calc(100% + 30px)',
      height: '60px',
      display: 'flex',
      color: '#ffffff',
      padding: '10px 26px',
      borderRadius: '10px',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#505866',
      },
    },
    channelThumbnail: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      marginRight: '12px',
      backgroundImage: "url('/images/picode-7.svg')",
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    channelBody: {
      flex: 1,
    },
    channelInfo: {},
    channelName: {
      marginRight: '8px',
      fontWeight: 'bold',
    },
    channelParticipant: {},
    lastContent: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      width: '160px',
      marginRight: '6px',
      height: '20px',
    },
    channelTail: {
      width: '70px',
    },
    unreadMessage: {},
    lastTime: {
      marginTop: '20px',
      fontSize: '12px',
    },
    createChannel: {
      margin: '0px -15px',
      width: 'calc(100% + 30px)',
      height: '60px',
      display: 'flex',
      color: '#ffffff',
      padding: '10px 26px',
      borderRadius: '10px',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
      '&>svg': {
        color: '#ffffff',
        width: '40px',
        height: '40px',
      },
      '&:hover': {
        backgroundColor: '#505866',
      },
    },
  })
)

export const chatHeaderStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    contentHeader: {
      height: '60px',
      width: '100%',
      borderBottom: '1px solid #505050',
      display: 'flex',
      alignItems: 'center',
      padding: '0px 20px',
    },

    targetThumbnail: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      marginRight: '12px',
      backgroundImage: "url('/images/picode-7.svg')",
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    },
    targetInfo: {
      color: '#ffffff',
    },
    targetName: {
      fontWeight: 'bold',
    },
    targetLast: {
      fontSize: '12px',
    },
    targetParticipant: {},
  })
)

export const responsiveChatStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    responsiveChat: {
      width: '100%',
      display: 'none',
      '@media screen and (max-width: 1280px)': {
        display: 'flex',
      },
    },
    emptyWrapper: {
      flex: 1,
      height: '100%',
      color: theme.font.high.color,
      fontSize: theme.font.high.size,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: theme.backgroundColor.step0,
      textAlign: 'center',
      '@media screen and (min-width: 1280px)': {
        display: 'none',
      },
      '@media screen and (max-width: 600px)': {
        display: 'none',
      },
    },
  })
)

export const responsiveHomeStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    home: {
      width: '100%',
      display: 'none',
      '@media screen and (max-width: 600px)': {
        display: 'flex',
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
    },
    channel: { width: '90%' },
    name: {
      color: '#ffffff',
      '&>span': {
        marginRight: '4px',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    online: {
      display: 'flex',
      fontSize: '11px',
      color: '#ffffff',
      '&>svg': {
        width: '12px',
        height: '12px',
        color: 'green',
      },
    },
    body: {
      width: '100%',
      height: 'calc(100% - 129px)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar': {
        backgroundColor: 'rgba(230, 230, 230, 0.3) !important',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(230, 230, 230, 0.3) !important',
      },
    },
    footer: {
      display: 'flex',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px',
      paddingTop: '15px',
      alignItems: 'center',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&>svg': {
        color: '#ffffff',
        width: '30px',
        height: '30px',
      },
    },
    users: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      marginRight: '12px',
    },
    titleWrapper: {
      flex: 1,
    },
    title: {
      display: 'flex',
      color: '#ffffff',
    },
    titleText: {
      fontSize: '11px',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    participant: {
      fontSize: '11px',
      marginLeft: '4px',
      color: '#ffffff',
    },
    etc: {},
    thumbnail: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '10px',
      fontWeight: 'bold',
      width: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    chatInfo: {
      textAlign: 'right',
    },
    lastTime: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.3)',
      width: '44px',
    },
    count: {
      fontSize: '10px',
      backgroundColor: 'red',
      color: '#ffffff',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '10px',
      width: 'fit-content',
      float: 'right',
    },
  })
)

export const responsiveContentStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    content: {
      width: '100%',
      height: 'calc(100% - 90px)',
      position: 'absolute',
      backgroundColor: '#2C3239',
      '@media screen and (min-width: 600px)': {
        width: 'calc(100% - 550px)',
      },
    },
    toggleContent: {
      '@media screen and (min-width: 600px)': {
        width: 'calc(100% - 414px) !important',
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
    },
    channel: { width: '90%' },
    name: {
      color: '#ffffff',
      '&>span': {
        marginRight: '4px',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    online: {
      display: 'flex',
      fontSize: '11px',
      color: '#ffffff',
      '&>svg': {
        width: '12px',
        height: '12px',
        color: 'green',
      },
    },
    body: {
      width: '100%',
      height: 'calc(100% - 129px)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar': {
        backgroundColor: 'rgba(230, 230, 230, 0.3) !important',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(230, 230, 230, 0.3) !important',
      },
    },
    footer: {
      display: 'flex',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px',
      paddingTop: '15px',
      alignItems: 'center',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&>svg': {
        color: '#ffffff',
        width: '30px',
        height: '30px',
      },
    },
    users: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      marginRight: '12px',
    },
    titleWrapper: {
      flex: 1,
    },
    title: {
      display: 'flex',
      color: '#ffffff',
    },
    titleText: {
      fontSize: '11px',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    participant: {
      fontSize: '11px',
      marginLeft: '4px',
      color: '#ffffff',
    },
    etc: {},
    thumbnail: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '10px',
      fontWeight: 'bold',
      width: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    chatInfo: {
      textAlign: 'right',
    },
    lastTime: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.3)',
      width: '44px',
    },
    count: {
      fontSize: '10px',
      backgroundColor: 'red',
      color: '#ffffff',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '10px',
      width: 'fit-content',
      float: 'right',
    },

    back: {
      cursor: 'pointer',
      '&>svg': {
        width: '28px',
        height: '28px',
        color: '#ffffff',
      },
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
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      padding: '8px 12px',
      paddingTop: '2px',
      backgroundColor: 'inherit',
      color: '#ffffff',
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
    },

    contentBox: {
      height: 'fit-content',
      minHeight: 'calc(100% - 20px)',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      margin: '10px 0px',
    },
  })
)

export const responsiveThreadStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    thread: {
      width: '100%',
      height: 'calc(100% - 90px)',
      position: 'absolute',
      backgroundColor: '#2C3239',
      '@media screen and (min-width: 600px)': {
        width: 'calc(100% - 550px)',
      },
    },
    toggleThread: {
      '@media screen and (min-width: 600px)': {
        width: 'calc(100% - 414px) !important',
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
    },
    channel: { width: '90%' },
    name: {
      color: '#ffffff',
      '&>span': {
        marginRight: '4px',
        fontSize: '18px',
        fontWeight: 'bold',
      },
    },
    online: {
      display: 'flex',
      fontSize: '11px',
      color: '#ffffff',
      '&>svg': {
        width: '12px',
        height: '12px',
        color: 'green',
      },
    },
    body: {
      width: '100%',
      height: 'calc(100% - 129px)',
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      '&::-webkit-scrollbar': {
        backgroundColor: 'rgba(230, 230, 230, 0.3) !important',
      },
      '&::-webkit-scrollbar-thumb': {
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
      },
      '&::-webkit-scrollbar-track': {
        backgroundColor: 'rgba(230, 230, 230, 0.3) !important',
      },
    },
    footer: {
      display: 'flex',
      borderTop: '1px solid rgba(255, 255, 255, 0.1)',
      padding: '10px',
      paddingTop: '15px',
      alignItems: 'center',
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
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '&>svg': {
        color: '#ffffff',
        width: '30px',
        height: '30px',
      },
    },
    users: {
      width: '40px',
      height: '40px',
      backgroundColor: '#ffffff',
      borderRadius: '20px',
      marginRight: '12px',
    },
    titleWrapper: {
      flex: 1,
    },
    title: {
      display: 'flex',
      color: '#ffffff',
    },
    titleText: {
      fontSize: '11px',
      fontWeight: 'bold',
      color: '#ffffff',
    },
    participant: {
      fontSize: '11px',
      marginLeft: '4px',
      color: '#ffffff',
    },
    etc: {},
    thumbnail: {
      color: 'rgba(255, 255, 255, 0.4)',
      fontSize: '10px',
      fontWeight: 'bold',
      width: '200px',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
    chatInfo: {
      textAlign: 'right',
    },
    lastTime: {
      fontSize: '10px',
      color: 'rgba(255, 255, 255, 0.3)',
      width: '44px',
    },
    count: {
      fontSize: '10px',
      backgroundColor: 'red',
      color: '#ffffff',
      fontWeight: 'bold',
      padding: '2px 6px',
      borderRadius: '10px',
      width: 'fit-content',
      float: 'right',
    },

    back: {
      cursor: 'pointer',
      '&>svg': {
        width: '28px',
        height: '28px',
        color: '#ffffff',
      },
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
    },
    input: {
      width: '100%',
      border: 'none',
      outline: 'none',
      padding: '8px 12px',
      paddingTop: '2px',
      backgroundColor: 'inherit',
      color: '#ffffff',
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
  })
)
