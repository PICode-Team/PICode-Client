import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const dashboardStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    dashboard: {
      width: '100%',
      height: 'calc(100% - 50px)',
    },
    row: {
      width: '100%',
      height: '40%',
      display: 'flex',
      padding: '0 20px',
      paddingBottom: '20px',
      gap: '20px',
    },
  })
)

export const issueStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    issue: {
      width: '32%',
      height: '100%',
    },
    title: {
      fontSize: '24px',
      color: theme.font.high.color,
      paddingBottom: '20px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 54px)',
      background: theme.backgroundColor.step1,
      padding: '24px',
      display: 'block',
      overflowY: 'auto',
      justifyContent: 'center',
      alignContent: 'center',
    },
    empty: {
      color: theme.font.high.color,
    },
    card: {
      color: theme.font.high.color,
      backgroundColor: theme.backgroundColor.step2,
      padding: '15px',
      borderRadius: '6px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      cursor: 'pointer',
      '&:hover': {
        filter: theme.brightness.step0,
      },
    },
    top: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    bottom: {},
    thumbnail: {
      width: '32px',
      height: '32px',
      borderRadius: '16px',
      backgroundColor: theme.font.high.color,
      marginRight: '8px',
    },

    issueName: {},
    issueTitle: {
      fontSize: '11px',
      fontWeight: 'bold',
    },
    issueId: { fontSize: '11px' },

    issueContentWrapper: {
      height: '100%',
      marginLeft: '12px',
      display: 'flex',
      alignItems: 'center',
      fontSize: '11px',
      flex: 1,
    },

    labelWrapper: {
      display: 'flex',
    },
    label: {
      fontSize: '10px',
      textAlign: 'center',
      width: '50px',
      height: '18px',
      backgroundColor: '#475261',
      marginRight: '6px',
      borderRadius: '6px',
      padding: '3px 0px',
      color: theme.font.high.color,
    },
  })
)

export const noteStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    note: {
      width: '44%',
      height: '100%',
    },
    title: {
      fontSize: '24px',
      color: theme.font.high.color,
      paddingBottom: '20px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 54px)',
      background: theme.backgroundColor.step1,
      padding: '24px',
      display: 'block',
      overflowY: 'auto',
      justifyContent: 'center',
      alignContent: 'center',
    },
    empty: {
      color: theme.font.high.color,
    },
    card: {
      color: theme.font.high.color,
      backgroundColor: theme.backgroundColor.step2,
      padding: '15px',
      borderRadius: '6px',
      marginBottom: '8px',
      display: 'flex',
      justifyContent: 'space-between',
      cursor: 'pointer',
      '&:hover': {
        filter: theme.brightness.step0,
      },
    },
  })
)

export const milestoneStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    milestone: {
      width: '24%',
      height: '100%',
    },
    title: {
      fontSize: '24px',
      color: theme.font.high.color,
      paddingBottom: '20px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 54px)',
      background: theme.backgroundColor.step1,
      padding: '24px 15px',
      display: 'block',
      overflowY: 'auto',
      justifyContent: 'center',
      alignContent: 'center',
    },
    empty: {
      color: theme.font.high.color,
    },
    card: {
      color: theme.font.high.color,
      backgroundColor: theme.backgroundColor.step2,
      borderRadius: '6px',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '8px 12px 10px',
      marginBottom: '12px',
      flexDirection: 'column',
      cursor: 'pointer',
      '&:hover': {
        filter: theme.brightness.step0,
      },
    },

    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '2px',
    },
    mileTitle: {
      fontSize: '16px',
    },
    topWrapper: {
      display: 'flex',
      alignItems: 'center',
    },

    bottom: {
      marginBottom: '4px',
    },
    percentage: {
      width: '100%',
      height: '10px',
      backgroundColor: '#6d7681',
      borderRadius: '6px',
    },
    gauge: {
      width: '0%',
      height: '10px',
      backgroundColor: '#4078b8',
      borderRadius: '6px',
    },
  })
)

export const recentWorkStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    recentWork: {
      width: '100%',
      height: '60%',
      minHeight: '400px',
      padding: '20px',
    },
    title: {
      fontSize: '24px',
      color: theme.font.high.color,
      paddingBottom: '20px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 54px)',
      background: theme.backgroundColor.step1,
      padding: '24px',
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    menuDialog: {
      position: 'absolute',
      width: '200px',
      right: '175px',
      top: '30px',
      height: '250px',
      background: theme.backgroundColor.step2,
      color: theme.font.high.color,
      zIndex: 3,
      overflow: 'hidden',
      overflowY: 'scroll',
      borderRadius: '2px',
    },
    leftButton: {
      position: 'absolute !important' as any,
      top: '45%',
      zIndex: 2,
      left: '10px',
      color: `${theme.font.high.color}!important `,
    },
    rightButton: {
      position: 'absolute !important' as any,
      right: '10px',
      top: '45%',
      zIndex: 2,
      color: `${theme.font.high.color} !important`,
    },
    carouselContent: {
      background: theme.backgroundColor.step2,
      height: '100%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: '12px',
      position: 'relative',
    },
    carouse: {
      height: '200px',
      display: 'inline-block',
      padding: '20px',
    },
    carouselButton: {
      color: `${theme.font.high.color} !important`,
    },
    alignCenter: {
      textAlign: 'center',
    },
    add: {
      color: theme.font.high.color,
    },
    createWorkspaceText: {
      display: 'block',
      textAlign: 'center',
      color: theme.font.high.color,
    },
    tableContent: {
      display: 'inline-block',
      color: theme.font.high.color,
    },
    carouseView: {
      padding: '0px 20px',
      height: '100%',
    },
    blockCarouseButton: {
      color: `${theme.font.high.color} !important`,
      display: 'block',
      textAlign: 'center',
    },

    projectName: {
      position: 'absolute',
      fontSize: '24px',
      fontWeight: 'bold',
      color: theme.font.high.color,
      width: '100%',
      textAlign: 'center',
      top: '10%',
    },
    full: {
      width: '100%',
      height: '100%',
    },
    edit: {
      position: 'absolute',
      right: '50px',
      cursor: 'pointer',
      top: '-25px',
      zIndex: 999,
    },
    export: {
      position: 'absolute',
      right: '80px',
      cursor: 'pointer',
      top: '-25px',
      zIndex: 999,
    },

    icon: {
      width: '24px',
      height: '24px',
    },

    delete: {
      position: 'absolute',
      right: '20px',
      cursor: 'pointer',
      top: '-25px',
      zIndex: 999,
    },
    imageContent: {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: '#fff',
      width: '120px',
      height: '120px',
      borderRadius: '60px',
      left: 'calc(50% - 60px)',
      top: '20%',
    },
    textContent: {
      background: theme.backgroundColor.step3,
      height: '65%',
      width: '100%',
      borderRadius: '0 0 12px 12px',
      paddingTop: '40px',
      color: theme.font.high.color,
    },
    image: {
      maxWidth: '80px',
      maxHeight: '80px',
    },

    space: {
      width: '100%',
      height: '35%',
    },

    cardContent: {
      paddingTop: '65px',
      background: theme.backgroundColor.step3,
      height: '65%',
      width: '100%',
      borderRadius: '0 0 12px 12px',
      color: theme.font.high.color,
    },

    wrapper: {
      width: '100%',
      padding: '0 25%',
      height: 'calc(100% - 56px)',
    },
    line: {
      width: '100%',
      height: '25%',
      display: 'flex',
      textAlign: 'left',
    },
    key: {
      width: '60%',
      fontSize: '16px',
    },
    value: {
      width: '40%',
      fontSize: '14px',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },

    footer: {
      width: '100%',
      padding: '0 100px',
      paddingBottom: '16px',
      height: '56px',
    },
    buttonGroup: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
    },
    button: {
      width: '45%',
      height: '40px',
      lineHeight: '40px',
      borderRadius: 4, //30
      fontSize: '18px',
      transition: '0.3s',
      cursor: 'pointer',
      color: theme.font.high.color,
      background: '#609FF3',
      '&:hover': {
        transition: '0.3s',
        background: '#217BF4',
      },
    },
    view: {
      alignContent: 'center',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
    },
    menuDialogRow: {
      width: '100%',
      padding: '8px',
      cursor: 'pointer',
      '&:hover': {
        background: theme.backgroundColor.step3,
        transition: 'all 0.3s',
      },
    },
    name: {},
  })
)
