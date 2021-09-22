import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IButtonProps } from '../../../types/item.types'

const buttonStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

function CustomButton(props: IItemDefautlProps & IButtonProps) {
  const { onClick, className, style } = props
  const classes = buttonStyle()

  return <input type="radio" onClick={onClick} className={className} style={style} />
}

export default CustomButton
