import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const checkboxStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      color: '#ffffff',
      fontSize: '12px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    checkbox: {
      marginRight: '4px',
      border: 'none',
      verticalAlign: 'middle',
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
  const { className, style, value, onClick, label } = props
  const classes = checkboxStyle()

  return (
    <div className={classes.wrapper}>
      {label}
      <input type="checkbox" defaultChecked={value as boolean} onClick={onClick} />
    </div>
  )
}

export default CustomCheckbox
