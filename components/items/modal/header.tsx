import { makeStyles, createStyles } from '@material-ui/core'
import { Close } from '@material-ui/icons'

import { IThemeStyle } from '../../../styles/theme'
import { IModalChildProps } from '../../../types/item.types'

const headerStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modalHeader: {
      width: '100%',
      height: '15%',
      fontWeight: 'bold',
      fontSize: '28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.font.medium.color,
      marginBottom: '12px',
      '&>div': {
        display: 'flex',
        alignItems: 'center',
      },
      '&>div>svg': {
        width: '28px',
        height: '28px',
        cursor: 'pointer',
      },
    },
  })
)

function ModalHeader(props: IModalChildProps) {
  const { handleCloseModal, title } = props
  const classes = headerStyle()
  return (
    <div className={classes.modalHeader}>
      <span>{title ?? ''}</span>
      <div onClick={handleCloseModal}>
        <Close />
      </div>
    </div>
  )
}

export default ModalHeader
