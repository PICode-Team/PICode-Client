import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const defaultStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      width: '100%',
      height: 'calc(100% - 50px)',
      padding: '32px',
    },
    title: {
      fontSize: '24px',
      color: theme.font.high.color,
      paddingBottom: '20px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 20px)',
      backgroundColor: theme.backgroundColor.step2,
      color: theme.font.high.color,
      display: 'grid',
      gridTemplateColumns: 'repeat(3, calc(33% - 16px))',
      gap: '28px 28px',
      padding: '30px',
      overflow: 'auto',
      '@media screen and (max-width: 960px)': {
        gridTemplateColumns: 'repeat(2, calc(50% - 14px))',
      },
      '@media screen and (max-width: 600px)': {
        gridTemplateColumns: 'repeat(1, calc(100%))',
      },
    },
    button: {
      width: '45%',
      height: '28px',
      textAlign: 'center',
      fontSize: '14px',
      lineHeight: '28px',
    },
    item: {
      backgroundColor: theme.backgroundColor.step1,
      borderRadius: '6px',
      padding: '20px',
      display: 'flex',
      height: 'fit-content',
      flexDirection: 'column',
      '&:hover': {
        backgroundColor: theme.backgroundColor.step1,
        filter: theme.brightness.step0,
      },
    },
    top: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    bottom: {},
    projectName: {
      fontSize: '16px',
    },
    iconWrapper: {
      display: 'flex',
      alignItems: 'center',
    },
    icon: {
      '&>svg': {
        width: '20px',
        height: '20px',
        marginLeft: '4px',
        color: '#b6c1cf',
        '&:hover': {
          color: theme.font.high.color,
        },
      },
    },
    infoWrapper: {
      marginBottom: '8px',
      display: 'flex',
    },
    infoKey: { width: '90px' },
    infoValue: {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
    },

    buttonGroup: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginTop: '20px',
      flex: 1,
      alignItems: 'flex-end',
    },
  })
)
