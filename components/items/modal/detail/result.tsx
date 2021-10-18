import React from 'react'

import Modal from '../../../items/modal/modal'

interface IRequsetResultProps {
  resultStatus: boolean
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function RequsetResult(props: IRequsetResultProps) {
  const { resultStatus, modal, setModal } = props

  const handleSubmit = () => {
    setModal(false)
  }

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title={`${resultStatus === true ? 'Success' : 'Error'}`}>
      <React.Fragment>
        <div>{resultStatus === true ? `DELETE {workspaceId}` : `ERROR in DELETE {workspaceId}`}</div>
      </React.Fragment>
    </Modal>
  )
}

export default RequsetResult
