import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const selectStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '16px',
    },
    select: {
      flex: 1,
      borderRadius: '2px',
      color: theme.font.high.color,
      background: '#3b434c',
      padding: '4px 8px',
      width: '100%',
      height: '32px',
      outline: 'none',
      border: 'none',
    },
    option: {
      height: '32px',
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

function CustomSelect(props: IItemDefautlProps & IInputProps) {
  const {} = props
  const classes = selectStyle()

  return (
    <div>
      <span></span>
      <select name="" id="">
        <option value=""></option>
      </select>
    </div>
  )
}

export default CustomSelect
