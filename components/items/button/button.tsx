import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IButtonProps } from '../../../types/item.types'

const buttonStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    button: {
      width: '100px',
      marginLeft: '12px',
      height: '28px',
      color: theme.font.high.color,
      fontSize: '15px',
      borderRadius: '2px',
      border: 'none',
      background: theme.backgroundColor.step2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    primary: {
      background: '#566372',
      '&:hover': {
        background: '#647487',
        transition: 'all 0.3s',
      },
    },
    secondary: {
      background: '#4078b8',
      '&:hover': {
        background: '#488cd9',
        transition: 'all 0.3s',
      },
    },
  })
)

function CustomButton(props: IItemDefautlProps & IButtonProps) {
  const { onClick, className, style, color, text } = props
  const classes = buttonStyle()

  return (
    <button onClick={onClick} className={`${classes.button} ${classes[color ?? 'primary']} ${className}`} style={style}>
      {text}
    </button>
  )
}

export default CustomButton
