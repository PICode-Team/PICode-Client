import React, { useState } from 'react'

import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'

interface ICreateKanbanProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface ICreateKanbanState {
  title: string
}

const initialState: ICreateKanbanState = {
  title: '',
}

function CreateKanban(props: ICreateKanbanProps) {
  const { modal, setModal } = props
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
