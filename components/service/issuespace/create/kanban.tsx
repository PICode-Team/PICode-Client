import React, { useState } from 'react'
import { IKanban } from '../../../../types/issue.types'

import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'

interface ICreateKanbanProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalKanban: IKanban | null
}

interface ICreateKanbanState {
  title: string
}

const initialState: ICreateKanbanState = {
  title: '',
}

function CreateKanban(props: ICreateKanbanProps) {
  const { modal, setModal, modalKanban } = props
  const [payload, setPayload] = useState<ICreateKanbanState>(initialState)

  const handleSubmit = () => {}

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="CreateKanban">
      <React.Fragment>
        <CustomTextInput value={payload.title} label="title" placeholder="title" />
      </React.Fragment>
    </Modal>
  )
}

export default CreateKanban
