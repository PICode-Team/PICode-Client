import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps } from '../../../types/item.types'

const bodyStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modalBody: {
      flex: 1,
    },
  })
)

function ModalBody(props: IItemDefautlProps) {
  const { children } = props
  const classes = bodyStyle()
  return <div className={classes.modalBody}>{children}</div>
}

export default ModalBody
