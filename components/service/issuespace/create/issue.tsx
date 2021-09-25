import React, { useState } from 'react'
import CustomSelect from '../../../items/input/select'

import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import CustomUserInput from '../../../items/input/userInput'
import Modal from '../../../items/modal/modal'

interface ICreateIssueProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface ICreateIssueState {
  title: string
  assigner: string[]
  content: string
  milestone: string
  label: string
}

const initialState: ICreateIssueState = {
  title: '',
  assigner: [],
  content: '',
  milestone: '',
  label: '',
}

function CreateIssue(props: ICreateIssueProps) {
  const { modal, setModal } = props
  const [payload, setPayload] = useState<ICreateIssueState>(initialState)

  const handleSubmit = () => {}

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="CreateIssue">
      <React.Fragment>
        <CustomTextInput value={payload.title} label="title" placeholder="title" />
        <CustomUserInput value={payload.assigner} label="" placeholder="" />
        <CustomTextarea value={payload.content} label="content" placeholder="content" />
        <CustomSelect value={payload.milestone} label="milestone" placeholder="milestone" />
        <CustomTextInput value={payload.label} label="label" placeholder="label" />
      </React.Fragment>
    </Modal>
  )
}

export default CreateIssue
