import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const issueStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      width: '100%',
      height: 'calc(100% - 50px)',
    },
    title: {
      fontSize: theme.font.high.size,
      color: theme.font.high.color,
      padding: '20px 30px',
      paddingBottom: '0px',
      display: 'flex',
      alignItems: 'center',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 63px)',
      display: 'flex',
      gap: '30px',
      padding: '30px',
      borderRadius: '8px',
    },
    back: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    },
  })
)

export const colStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    column: {
      height: '100%',
      color: theme.font.high.color,
      width: '330px',
    },
    header: {
      backgroundColor: '#1D2228',
      height: '60px',
      padding: '15px',
      borderTopLeftRadius: '8px',
      borderTopRightRadius: '8px',
      display: 'flex',
      alignItems: 'center',
    },
    headerWrapper: {
      display: 'flex',
      marginBottom: '6px',
      justifyContent: 'space-between',
      flex: 1,
    },
    headerInfoBox: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    title: {
      fontSize: '18px',
      marginRight: '8px',
      fontWeight: 'bold',
    },
    issueCount: {
      fontSize: '13px',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    icon: {
      cursor: 'pointer',
      display: 'flex',
      alignItems: 'center',
    },
    add: {
      width: '22px',
      height: '22px',
    },
    issueWrapper: {
      backgroundColor: theme.backgroundColor.step2,
      height: 'calc(100% - 60px)',
      padding: '15px',
      borderBottomLeftRadius: '8px',
      borderBottomRightRadius: '8px',
    },
  })
)

export const cardStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    card: {
      backgroundColor: theme.backgroundColor.step1,
      padding: '15px',
      borderRadius: '6px',
      height: '120px',
      marginBottom: '15px',
      cursor: 'pointer',
      '&:hover': {
        filter: theme.brightness.step0,
      },
    },
    thumbnail: {
      width: '32px',
      height: '32px',
      borderRadius: '16px',
      backgroundColor: theme.font.high.color,
      marginRight: '8px',
    },
    header: {
      display: 'flex',
      alignItems: 'flex-end',
      marginBottom: '8px',
    },
    headerText: {
      fontSize: '11px',
    },
    content: {
      fontSize: '11px',
      marginBottom: '14px',
    },
    labelWrapper: {
      display: 'flex',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
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
      textOverflow: 'ellipsis',
      overflow: 'hidden',
    },
  })
)

export const boardStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    board: {
      width: '100%',
      height: '100%',
    },
    content: {
      width: '100%',
      height: '100%',
      backgroundColor: theme.backgroundColor.step2,
      color: theme.font.high.color,
      display: 'grid',
      gridTemplateRows: 'repeat(4, 155px)',
      gridTemplateColumns: 'repeat(4, calc(25% - 21px))',
      gap: '28px 28px',
      overflow: 'auto',
      '@media screen and (max-width: 960px)': {
        gridTemplateColumns: 'repeat(3, calc(33% - 16px))',
      },
      '@media screen and (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, calc(100%))',
      },
    },
    item: {
      backgroundColor: theme.backgroundColor.step1,
      cursor: 'pointer',
      borderRadius: '6px',
      padding: '20px',
      '&:hover': {
        filter: theme.brightness.step0,
      },
    },
    icon: {
      '&>svg': {
        color: '#b6c1cf',
        '&:hover': {
          color: theme.font.high.color,
        },
      },
    },
    title: {
      fontSize: '16px',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    edit: {
      width: '20px',
      height: '20px',
      marginRight: '4px',
    },
    delete: {
      width: '20px',
      height: '20px',
    },
    iconLayout: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    contentLayout: {
      marginBottom: '8px',
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

    description: {
      overflow: 'hidden',
      textOverflow: 'ellipsis',
      whiteSpace: 'nowrap',
    },
  })
)

export const manageStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    manage: {
      width: '100%',
      height: 'calc(100% - 50px)',
    },
    title: {
      fontSize: theme.font.high.size,
      color: theme.font.high.color,
      padding: '15px',
      display: 'flex',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 58px)',
      padding: '24px',
      paddingTop: 0,
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center',
    },
    projectContent: {
      width: '100%',
      background: theme.backgroundColor.step2,
      height: '100%',
    },
    projectHeader: {
      width: '100%',
      height: '50px',
      paddingLeft: '40px',
      borderBottom: `3px solid ${theme.backgroundColor.step3}`,
      display: 'flex',
      alignItems: 'center',
    },
    headerMenu: {
      padding: '10px 20px',
      height: '50px',
      lineHeight: '35px',
      display: 'inline-block',
      cursor: 'pointer',
      fontWeight: 500,
      color: theme.font.small.color,
      fontSize: theme.font.low.size,
    },
    makeLine: {
      color: theme.font.high.color,
      borderBottom: `3px solid rgba(255, 255, 255, 0.6)`,
    },
    notSelect: {
      '&:hover': {
        color: theme.font.high.color,
        borderBottom: `3px solid rgba(255, 255, 255, 0.3)`,
      },
    },
    manageContent: {
      width: '100%',
      display: 'flex',
      justifyContent: 'center',
      height: 'calc(100% - 60px)',
      padding: '20px',
      overflow: 'auto',
    },
    search: {
      width: '30%',
      height: '28px',
      backgroundColor: theme.backgroundColor.step2,
      filter: 'brightness(0.85)',
      borderRadius: '20px',
      display: 'flex',
      padding: '0px 12px',
      alignItems: 'center',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      '&>svg': {
        color: theme.font.high.color,
        marginRight: '6px',
        width: '16px',
        height: '16px',
        cursor: 'pointer',
      },
      '&>input': {
        width: '100%',
        backgroundColor: 'inherit',
        outline: 'none',
        border: 'none',
        color: theme.font.high.color,
        marginTop: '2px',
        '&::placeholder': {
          color: 'rgba(183, 183, 183, 0.42)',
          fontSize: '14px',
        },
      },
    },
  })
)

export const issueTableStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    issueTable: {
      width: '100%',
      height: '100%',
      color: theme.font.high.color,
    },
    headerWrapper: {
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step4,
      display: 'flex',
      justifyContent: 'space-between',
      height: '54px',
      padding: '16px',
      overflow: 'hidden',
    },
    leftHeader: {
      display: 'flex',
      alignItems: 'center',
      '@media screen and (max-width: 700px)': {
        display: 'none',
      },
    },
    rightHeader: {
      display: 'flex',
      alignItems: 'center',
    },

    checkbox: {
      width: '30px',
      height: '30px',
      display: 'flex',
    },
    active: {},
    filterMenu: {
      marginLeft: '12px',
      cursor: 'pointer',
    },

    noneBorderTop: {
      borderTop: 'none !important',
    },

    bodyWrapper: {
      backgroundColor: theme.backgroundColor.step2,
      filter: theme.brightness.step3,
      display: 'flex',
      height: '60px',
      padding: '8px 16px',
      alignItems: 'center',
      borderTop: `1px solid ${theme.backgroundColor.step1}`,
      '&:first-child': {
        borderTop: 'none !important',
      },
      '&:hover': {
        filter: theme.brightness.step2,
      },
    },
    activeStatus: {
      display: 'flex',
      alignItems: 'center',
      marginRight: '10px',
    },
    title: {
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
    },
    content: {},
    assignee: {},
    detail: {
      display: 'flex',
    },
    creation: {
      marginRight: '8px',
    },
    milestone: {},
    tag: {
      backgroundColor: theme.backgroundColor.step2,
      filter: theme.brightness.step4,
      color: theme.font.low.color,
      fontWeight: 'normal',
      fontSize: '14px',
      padding: '2px 8px',
      borderRadius: '12px',
      marginLeft: '8px',
    },
  })
)

export const issueDetailStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    detail: {
      width: '100%',
      height: 'calc(100% - 50px)',
      padding: '32px',
    },
    header: {
      width: '100%',
      fontSize: theme.font.high.size,
      color: theme.font.high.color,
      marginBottom: '20px',
      height: '85px',
      '@media screen and (max-width: 400px)': {
        height: '160px',
        marginBottom: '20px',
      },
    },
    wrapper: {
      backgroundColor: theme.backgroundColor.step1,
      padding: '30px',
      height: 'calc(100% - 105px)',
      display: 'flex',
      flexDirection: 'column',
      '@media screen and (max-width: 400px)': {
        height: 'calc(100% - 180px)',
      },
    },

    title: {},
    issueNumber: {
      opacity: 0.6,
      fontWeight: 'normal',
      marginLeft: '12px',
    },

    open: {
      backgroundColor: '#549F69',
    },
    close: {
      backgroundColor: '#CF222E',
    },
    activeStatus: {
      fontSize: theme.font.low.size,
      padding: '4px 12px',
      borderRadius: '16px',
      marginRight: '12px',
    },
    creation: {
      fontSize: '16px',
      opacity: 0.9,
      '@media screen and (max-width: 400px)': {
        marginTop: '10px',
      },
    },

    item: {
      color: theme.font.high.color,
      fontSize: '16px',
      marginBottom: '10px',
      display: 'flex',
      height: '32px',
      alignItems: 'center',
    },
    key: {
      width: '150px',
    },
    value: {
      flex: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      '&>select': {
        width: '50%',
      },
    },

    divider: {
      width: '100%',
      height: '2px',
      backgroundColor: theme.backgroundColor.step2,
    },

    description: {
      paddingTop: '20px',
      color: theme.font.high.color,
      fontSize: '14px',
      whiteSpace: 'pre-line',
      wordBreak: 'break-word',
      height: '100%',
      flex: 1,
    },

    titleWrapper: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      height: '45px',
      marginBottom: '10px',
      '@media screen and (max-width: 400px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 'fit-content',
      },
    },

    buttonWrapper: {
      display: 'flex',
      '@media screen and (max-width: 400px)': {
        marginTop: '10px',
      },
    },
    infoWrapper: {
      display: 'flex',
      alignItems: 'center',
      '@media screen and (max-width: 400px)': {
        flexDirection: 'column',
        alignItems: 'flex-start',
        marginTop: '15px',
      },
    },

    input: {
      width: '100%',
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step0,
      padding: '4px 8px',
      border: 'none',
      borderRadius: '2px',
      color: theme.font.high.color,
      height: '32px',
      lineHeight: '32px',
      flex: 1,
      outline: 'none',
      '@media screen and (max-width: 600px)': {
        fontSize: '10px',
      },
      marginRight: '15px',
    },
    textarea: {
      width: '100%',
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step0,
      padding: '6px 12px',
      border: 'none',
      borderRadius: '2px',
      color: theme.font.high.color,
      marginTop: '8px',
      lineHeight: '17px',
      fontFamily: 'Arial',
      resize: 'none',
      outline: 'none',
      height: '100%',
      flex: 1,
    },

    titleContent: {
      display: 'flex',
      flex: 1,
      width: '100%',
    },

    width50: {
      width: '50%',
    },
  })
)
