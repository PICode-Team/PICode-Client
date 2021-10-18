import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const createWorkspaceStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    create: {
      width: '100%',
      height: 'calc(100% - 90px)',
      padding: '32px',
    },
    header: {
      width: '100%',
      fontSize: theme.font.high.size,
      color: theme.font.high.color,
      marginBottom: '30px',
    },
    createWrapper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      backgroundColor: theme.backgroundColor.step1,
      padding: '30px',
      height: 'calc(100% - 75px)',
    },

    stepper: {
      display: 'flex',
      alignItems: 'center',
      margin: '30px 0px',
      marginBottom: '65px',
      width: '120vh',
      justifyContent: 'center',
    },
    step: {
      width: '24px',
      height: '24px',
      borderRadius: '15px',
      backgroundColor: theme.font.high.color,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '16px',
      fontWeight: 'bold',
      paddingTop: '24px',
    },
    lail: {
      width: '30%',
      height: '1px',
      backgroundColor: 'rgba(255, 255, 255, 0.55)',
      margin: '0px 10px',
    },
    active: {
      backgroundColor: '#90CAF9',
    },
    stepNumber: {
      paddingTop: '8px',
      paddingBottom: '10px',
      fontSize: '12px',
      '&>svg': {
        paddingTop: '2px',
        width: '18px',
        height: '18px',
      },
      '&>span': {
        width: '18px',
        height: '18px',
      },
    },
    stepText: {
      whiteSpace: 'nowrap',
      fontSize: '14px',
      fontWeight: 'normal',
      color: 'rgba(255, 255, 255, 0.55)',
    },

    content: {
      width: '100%',
      height: 'fit-content',
      maxHeight: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginBottom: '5px',
    },
    typeContent: {
      width: '100%',
      height: 'fit-content',
      display: 'flex',
      gap: '30px',
      marginTop: '40px',
    },
    typeNode: {
      cursor: 'pointer',
      width: '250px',
      display: 'flex',
      minWidth: '242px',
      alignItems: 'center',
      flexDirection: 'column',
      padding: '70px 30px',
      color: theme.font.medium.color,
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step0,
      '&:hover': {
        background: '#4d5763',
        transition: 'all 0.3s',
        color: theme.font.low.color,
      },
      '&>svg': {
        width: '80px',
        height: '80px',
      },
      '&>div': {
        fontSize: '22px',
        fontWeight: 'bold',
        paddingTop: '15px',
      },
    },

    inputContent: {
      minWidth: '500px',
      width: '100%',
    },
    buttonBox: {
      display: 'flex',
      width: '100%',
      justifyContent: 'flex-end',
      marginTop: '15px',
    },
    inputWrapper: {
      overflow: 'auto',
    },

    subTitle: {
      color: theme.font.high.color,
      marginBottom: '10px',
      fontSize: '16px',
    },
    divider: {
      width: '100%',
      height: '36px',
      display: 'flex',
      alignItems: 'center',
      '&>div': {
        width: '100%',
        height: '1px',
        background: '#505050',
      },
    },
    doubleContent: {
      display: 'flex',
      justifyContent: 'space-around',
      gap: '25px',
    },

    imageUpload: {
      height: '100px',
      width: '100%',
      marginTop: '8px',
      marginBottom: '14px',
      border: `1px solid ${theme.font.small.color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.font.high.color,
    },

    textarea: {
      flex: 1,
      '&>textarea': {
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
        height: '100px',
      },
      '&>span': {
        color: theme.font.high.color,
        fontSize: theme.font.small.size,
      },
    },
    required: {
      color: '#C33030',
    },
    sectionTitle: {
      fontSize: '14px',
      color: theme.font.high.color,
    },
    radioWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '30px',
    },
    radioLabel: {
      color: theme.font.high.color,
      marginRight: '20px',
      marginLeft: '-5px',
    },

    upload: {
      textAlign: 'center',
      pointerEvents: 'none',
    },
    uploadIcon: {
      width: '40px',
      height: '40px',
    },

    textAlignCenter: {
      textAlign: 'center',
    },

    displayNone: {
      display: 'none',
    },

    isExtract: {
      display: 'inline-block',
      color: theme.font.high.color,
      fontSize: '12px',
      float: 'right',
    },

    verticalAlignMiddle: {
      verticalAlign: 'middle',
    },
  })
)
