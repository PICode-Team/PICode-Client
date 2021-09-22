import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IModalProps } from '../../../types/item.types'
import CustomButton from '../button/button'

const modalStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modal: {
      width: '30%',
      height: '40%',
      position: 'absolute',
      display: 'fixed',
      backgroundColor: '#2c3239',
      zIndex: 9999,
      top: 0,
      left: 0,
      marginLeft: '35%',
      marginTop: '10%',
      padding: '30px',
      borderRadius: '12px',
    },
    overlay: {
      width: '100%',
      height: '100%',
      position: 'absolute',
      display: 'fixed',
      backgroundColor: 'black',
      top: 0,
      left: 0,
      opacity: 0.4,
      zIndex: 9999,
    },
    xs: {},
    sm: {},
    md: {},
    lg: {},
    xl: {},
    xxl: {},
  })
)

function Modal(props: IModalProps) {
  const { children, modal, size, setModal, onSubmit } = props
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
            {children}
            <div>
              <CustomButton text="cancel" onClick={handleCloseModal} />
              <CustomButton text="ok" onClick={onSubmit} />
            </div>
          </div>
          <div className={classes.overlay} onClick={handleCloseModal} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Modal
