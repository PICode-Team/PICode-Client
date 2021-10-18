import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const textInputStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
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
    },
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
      marginRight: '8px',
      marginTop: '2px',
      width: '106px',
    },
    required: {
      color: '#C33030',
    },
  })
)

function CustomTextInput(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style, label, isPassword, placeholder, value, required, id } = props
  const classes = textInputStyle()

  return (
    <div className={classes.wrapper}>
      <span className={classes.label}>
        {label}
        {required && <span className={classes.required}>*</span>}
      </span>
      <input id={id} type={isPassword ? 'password' : 'text'} onChange={onChange} className={`${classes.input} ${className}`} style={style} placeholder={placeholder} value={value as string} />
    </div>
  )
}

export default CustomTextInput
