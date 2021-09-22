import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const radioStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

function CustomCheckbox(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style } = props
  const classes = radioStyle()

  return (
    <div>
      <span></span>
      <input type="radio" onChange={onChange} className={className} style={style} />
    </div>
  )
}

export default CustomCheckbox
