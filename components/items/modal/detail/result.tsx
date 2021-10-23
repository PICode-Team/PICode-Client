import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../../styles/theme'
import Modal from '../../../items/modal/modal'

const resultStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    text: {
      color: theme.font.high.color,
      textAlign: 'left',
    },
  })
)

interface IRequestResultProps {
  resultStatus: boolean
  modal: boolean
  text: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function RequestResult(props: IRequestResultProps) {
  const { resultStatus, modal, text, setModal } = props
  const classes = resultStyle()

  const handleSubmit = () => {
    setModal(false)
  }

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title={resultStatus === true ? 'Success' : 'Error'} hidden={true}>
      <React.Fragment>
        <div className={classes.text}>{text}</div>
      </React.Fragment>
    </Modal>
  )
}

export default RequestResult
