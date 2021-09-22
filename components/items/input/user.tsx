import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const userInputStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

function userInput(props: IItemDefautlProps & IInputProps) {
  const {} = props
  const classes = userInputStyle()

  return <div></div>
}

export default userInput
