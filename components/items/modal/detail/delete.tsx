import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../../styles/theme'
import Modal from '../modal'

const deleteStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {},
    icon: {
      '&>svg': {
        width: '80px',
        height: '80px',
      },
    },
    text: {
      color: theme.font.high.color,
      fontSize: '18px',
    },
    name: {
      fontWeight: 'bold',
      padding: '0px 8px',
    },
  })
)

interface IDeleteWorkspaceProps {
  name: string
  uuid: string
  modal: boolean
  type: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  handleSubmit: any
}

function DeleteModal(props: IDeleteWorkspaceProps) {
  const { name, uuid, modal, setModal, handleSubmit, type } = props
  const classes = deleteStyle()

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit(uuid)} title="Delete Workspace">
      <div className={classes.wrapper}>
        <div className={classes.text}>
          Are you sure delete
          <span className={classes.name}>{name}</span>
          {type}?
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
