import React, { useEffect, useState } from 'react'
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
  const [userList, setUserList] = useState<string[]>([])

  useEffect(() => {
    setPayload({ ...payload, assigner: userList })
  }, [userList])

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const handleSubmit = () => {}

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="CreateIssue">
      <React.Fragment>
        <CustomTextInput id="title" value={payload.title} label="title" placeholder="title" onChange={handlePayload} />
        <CustomUserInput value={userList} setValue={setUserList} label="Project Participant" />
        <CustomTextarea id="content" value={payload.content} label="content" placeholder="content" onChange={handlePayload} />
        <CustomSelect id="milestone" value={payload.milestone} label="milestone" placeholder="milestone" onChange={handlePayload} />
        <CustomTextInput id="label" value={payload.label} label="label" placeholder="label" onChange={handlePayload} />
      </React.Fragment>
    </Modal>
  )
}

export default CreateIssue
