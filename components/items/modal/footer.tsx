import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IModalChildProps } from '../../../types/item.types'
import CustomButton from '../button/button'

const footerStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modalFooter: {
      width: '100%',
      height: '15%',
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'flex-end',
    },
  })
)

function ModalFooter(props: IModalChildProps) {
  const { handleCloseModal, onSubmit } = props
  const classes = footerStyle()
  return (
    <div className={classes.modalFooter}>
      <CustomButton text="cancel" onClick={handleCloseModal} color="primary" />
      <CustomButton text="ok" onClick={onSubmit} color="secondary" />
    </div>
  )
}

export default ModalFooter
