import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IModalProps } from '../../../types/item.types'
import ModalHeader from './header'
import ModalBody from './body'
import ModalFooter from './footer'

const modalStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modal: {
      position: 'fixed',
      backgroundColor: '#2c3239',
      zIndex: 99999,
      top: 0,
      left: 0,
      marginLeft: '35%',
      marginTop: '15%',
      padding: '30px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
    },
    overlay: {
      width: '100%',
      height: '100%',
      position: 'fixed',
      backgroundColor: 'black',
      top: 0,
      left: 0,
      opacity: 0.4,
      zIndex: 9999,
    },
    xs: {},
    sm: {},
    md: {
      width: '30%',
      height: '42%',
    },
    lg: {
      height: '47%',
      width: '35%',
    },
    xl: {},
    xxl: {},
  })
)

function Modal(props: IModalProps) {
  const { children, modal, size, setModal, onSubmit, title } = props
  const classes = modalStyle()

  const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    setModal(false)
  }

  return (
    <React.Fragment>
      {modal && (
        <React.Fragment>
          <div className={`${classes.modal} ${classes[size ?? 'md']}`}>
            <ModalHeader handleCloseModal={handleCloseModal} title={title} />
            <ModalBody>{children}</ModalBody>
            <ModalFooter handleCloseModal={handleCloseModal} onSubmit={onSubmit} />
          </div>
          <div className={classes.overlay} onClick={handleCloseModal} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Modal
