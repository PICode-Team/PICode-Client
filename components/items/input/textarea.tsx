import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const textareaStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      flex: 1,
      marginTop: '16px',
    },
    textarea: {
      width: '100%',
      background: '#3b434c',
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
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
    },
  })
)

function CustomTextarea(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style, label } = props
  const classes = textareaStyle()

  return (
    <div className={classes.wrapper}>
      <span className={classes.label}>{label}</span>
      <textarea onChange={onChange} className={`${classes.textarea} ${className}`} style={style} />
    </div>
  )
}

export default CustomTextarea
