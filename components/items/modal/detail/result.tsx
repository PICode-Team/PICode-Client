import React from 'react'

import Modal from '../../../items/modal/modal'

interface IRequestResultProps {
  resultStatus: boolean
  modal: boolean
  text: string
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function RequestResult(props: IRequestResultProps) {
  const { resultStatus, modal, text, setModal } = props

  const handleSubmit = () => {
    setModal(false)
  }

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title={resultStatus === true ? 'Success' : 'Error'} hidden={true}>
      <React.Fragment>
        <div style={{ textAlign: 'left' }}>{text}</div>
      </React.Fragment>
    </Modal>
  )
}

export default RequestResult
