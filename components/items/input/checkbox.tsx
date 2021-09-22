import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const checkboxStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'inline-block',
    },
    checkbox: {
      marginRight: '4px',
      border: 'none',

      '&:checked': {},

      '&:disabled': {},
    },
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
    },
  })
)

function CustomCheckbox(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style } = props
  const classes = checkboxStyle()

  return (
    <div className={classes.wrapper}>
      <input type="checkbox" onChange={onChange} className={className} style={style} />
      <label htmlFor=""></label>
    </div>
  )
}

export default CustomCheckbox
