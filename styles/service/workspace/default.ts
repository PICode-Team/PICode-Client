import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../../theme'

export const defaultStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      width: '100%',
      height: '100%',
      padding: '32px',
    },
    title: {
      fontSize: '24px',
      color: theme.font.high.color,
      paddingBottom: '20px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 50px)',
      background: '#3b434d',
      color: theme.font.high.color,
      display: 'grid',
      gridTemplateColumns: 'repeat(4, calc(25% - 21px))',
      gap: '28px 28px',
      padding: '30px',
      gridTemplateRows: 'repeat(4, 195px)',
    },
    item: {
      backgroundColor: '#2c3239',
      cursor: 'pointer',
      borderRadius: '6px',
      padding: '20px',
      '&:hover': {
        backgroundColor: '#242c36',
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
          color: '#ffffff',
        },
      },
    },
    infoWrapper: {
      marginBottom: '3px',
      display: 'flex',
    },
    infoKey: { width: '90px' },
    infoValue: {},

    buttonGroup: {
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px',
      marginTop: '8px',
    },
  })
)
