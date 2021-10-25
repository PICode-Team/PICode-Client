import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import CustomButton from '../button/button'

const modalStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modal: {
      position: 'fixed',
      backgroundColor: theme.backgroundColor.step1,
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
      height: '30%',
    },
    lg: {
      height: '61%',
      width: '40%',
      marginLeft: '32.5% !important',
      marginTop: '15%',
    },
    xl: {},
    xxl: {},

    modalHeader: {
      width: '100%',
      height: '15%',
      fontWeight: 'bold',
      fontSize: '28px',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      color: theme.font.medium.color,
      marginBottom: '12px',
    },

    modalBody: {
      flex: 1,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: '20px',
    },

    modalFooter: {
      width: '100%',
      height: '15%',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'flex-end',
    },
  })
)

interface IAlertProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  title: string
  description: string
}

function Alert(props: IAlertProps) {
  const { modal, setModal, title, description } = props
  const classes = modalStyle()

  const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    setModal(false)
  }

  return (
    <React.Fragment>
      {modal && (
        <React.Fragment>
          <div className={`${classes.modal} ${classes.md}`}>
            <div className={classes.modalHeader}>{title}</div>
            <div className={classes.modalBody}>{description}</div>
            <div className={classes.modalFooter}>
              <CustomButton text="OK" color="secondary" onClick={handleCloseModal} />
            </div>
          </div>
          <div className={classes.overlay} onClick={handleCloseModal} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default Alert
