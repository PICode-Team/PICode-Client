import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const viewStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    day: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      overflowY: 'auto',
      padding: '32px',
    },
    dayContainer: {
      width: '100%',
      height: '150px',
      background: theme.backgroundColor.step3,
      marginBottom: '32px',
    },
    week: {
      display: 'flex',
      width: '100%',
      height: '100%',
    },
    weekday: {
      height: '100%',
      overflow: 'hidden',
      width: '100%',
      borderRight: `2px solid ${theme.backgroundColor.step3}`,
    },
    weekdayend: {
      borderRight: 'none',
    },
    dayInfo: {
      width: '100%',
      height: '82px',
      padding: '16px',
      color: theme.font.high.color,
      cursor: 'pointer',
      fontSize: theme.font.small.size,
      borderBottom: `2px solid ${theme.backgroundColor.step3}`,
    },
    holiday: {
      color: 'red',
    },
    daydateinfo: {
      height: '32px',
      lineHeight: '32px',
      color: theme.font.high.color,
      width: '100%',
      textAlign: 'left',
      fontSize: theme.font.medium.size,
    },
    daydayinfo: {
      height: '16px',
      lineHeight: '16px',
      width: '100%',
      color: theme.font.high.color,
      fontSize: theme.font.low.size,
    },
    daycontentinfo: {
      width: '100%',
      height: 'calc(100% - 82px)',
      overflow: 'hidden',
      padding: '16px',
      overflowY: 'auto',
    },
    highlightDate: {
      borderRadius: '16px',
      background: theme.backgroundColor.step4,
    },
    monthview: {
      display: 'flex',
      width: '100%',
      height: '100%',
      flexDirection: 'column',
    },
    monthweek: {
      width: '100%',
      height: '20%',
      display: 'flex',
      borderBottom: `2px solid ${theme.backgroundColor.step3}`,
    },
    lastmonthweek: {
      borderBottom: 'none',
    },
    monthday: {
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      borderRight: `2px solid ${theme.backgroundColor.step3}`,
    },
    lastmonthday: {
      borderRight: 'none',
    },
    monthdayinfo: {
      height: '32px',
      lineHeight: '32px',
      paddingLeft: '10px',
      color: theme.font.high.color,
      fontSize: theme.font.low.size,
      width: '100%',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      borderBottom: `1px solid ${theme.backgroundColor.step3}`,
      cursor: 'pointer',
    },
    monthdayschedule: {
      height: 'calc(100% - 32px)',
      widht: '100%',
      padding: '8px',
      overflow: 'hidden',
      overflowY: 'auto',
    },
    monthschedule: {
      height: '24px',
      lineHeight: '24px',
      color: theme.font.high.color,
      paddingLeft: '4px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      width: '100%',
      background: theme.backgroundColor.step3,
      marginBottom: '4px',
    },
    titleName: {
      width: '100%',
      height: '40px',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      lineHeight: '26px',
      padding: '7px',
      background: theme.backgroundColor.step1,
      color: theme.font.high.color,
    },
    anothermonth: {
      backdropFilter: 'brightness(70%)',
    },
    today: {
      background: '#4078B8',
    },

    contentWrapper: {
      width: '100%',
      height: 'calc(100% - 40px)',
      color: theme.font.high.color,
      padding: '20px',
    },
    content: {
      width: '100%',
      height: '100%',
      color: theme.font.high.color,
      wordBreak: 'break-word',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
)
