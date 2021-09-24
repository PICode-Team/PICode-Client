import React, { useState } from 'react'
import Modal from '../../../items/modal/modal'

interface ICreateIssueProps {
  title: string
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateIssue(props: ICreateIssueProps) {
  const { modal, setModal, title } = props

  const handleSubmit = () => {}

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title={title}>
      <React.Fragment></React.Fragment>
    </Modal>
  )
}

export default CreateIssue
