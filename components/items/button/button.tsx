import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IButtonProps } from '../../../types/item.types'

const buttonStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    button: {
      width: '100px',
      marginLeft: '12px',
      height: '28px',
      color: '#ffffff',
      fontSize: '15px',
      borderRadius: '2px',
      border: 'none',
      backgroundColor: theme.backgroundColor.step2,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
    primary: {
      backgroundColor: '#566372',
      '&:hover': {
        backgroundColor: '#647487',
        transition: 'all 0.3s',
      },
    },
    secondary: {
      backgroundColor: '#4078b8',
      '&:hover': {
        backgroundColor: '#488cd9',
        transition: 'all 0.3s',
      },
    },
    disabled: {
      backgroundColor: '#627285 !important',
    },
  })
)

function CustomButton(props: IItemDefautlProps & IButtonProps) {
  const { onClick, className, style, color, text, disable } = props
  const classes = buttonStyle()

  return (
    <button onClick={onClick} className={`${classes.button} ${classes[color ?? 'primary']} ${className} ${disable === true && classes.disabled}`} style={style}>
      {text}
    </button>
  )
}

export default CustomButton
