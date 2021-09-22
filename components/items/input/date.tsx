import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const dateStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

function CustomDate(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style } = props
  const classes = dateStyle()

  return <input type="date" onChange={onChange} className={className} style={style} />
}

export default CustomDate
