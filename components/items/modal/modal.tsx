import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IModalProps } from '../../../types/item.types'

const modalStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

function Modal(props: IModalProps) {
  const { children } = props
  const classes = modalStyle()

  return (
    <React.Fragment>
      <div>{children}</div>
      <div />
    </React.Fragment>
  )
}

export default Modal
