import { makeStyles } from '@material-ui/styles'
import createStyles from '@material-ui/styles/createStyles'
import { IThemeStyle } from '../theme'

export const layoutStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      width: '100%',
      height: '100%',
    },
    title: {
      fontSize: theme.font.high.size,
      color: theme.font.high.color,
      padding: '20px 30px',
      paddingBottom: '0px',
    },
    content: {
      width: '100%',
      height: 'calc(100% - 61px)',
      display: 'flex',
      gap: '30px',
      padding: '30px',
      borderRadius: '8px',
    },
  })
)
