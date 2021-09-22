import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const textInputStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '16px',
    },
    input: {
      width: '100%',
      background: '#3b434c',
      padding: '4px 8px',
      border: 'none',
      borderRadius: '2px',
      color: theme.font.high.color,
      height: '32px',
      lineHeight: '32px',
      flex: 1,
      outline: 'none',
    },
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
      marginRight: '8px',
      marginTop: '2px',
      width: '106px',
    },
  })
)

function CustomTextInput(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style, label, isPassword, placeholder, value } = props
  const classes = textInputStyle()

  return (
    <div className={classes.wrapper}>
      <span className={classes.label}>{label}</span>
      <input type={isPassword ? 'password' : 'text'} onChange={onChange} className={`${classes.input} ${className}`} style={style} placeholder={placeholder} value={value as string} />
    </div>
  )
}

export default CustomTextInput
