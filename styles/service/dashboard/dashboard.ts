import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const dashboardStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    dashboard: {
      width: '100%',
      height: '100%',
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
      backgroundColor: '#ffffff',
      marginRight: '8px',
    },

    issueName: {
      width: '60px',
    },
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
    },
    issueContent: {
      fontSize: '11px',
      display: 'flex',
      alignItems: 'center',
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
      color: '#ffffff',
    },
  })
)

export const noteStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    note: {
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
      padding: '15px',
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
      pointerEvents: 'none',
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
    recentWork: {},
    title: {},
    content: {},
  })
)
