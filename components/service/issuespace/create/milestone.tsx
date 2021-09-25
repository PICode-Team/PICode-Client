import React, { useState } from 'react'
import CustomDate from '../../../items/input/date'
import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import Modal from '../../../items/modal/modal'

interface ICreateMilestoneProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface ICreateMileState {
  title: string
  content: string
  startDate: string
  endDate: string
}

const initialState: ICreateMileState = {
  title: '',
  content: '',
  startDate: '',
  endDate: '',
}

function CreateMilestone(props: ICreateMilestoneProps) {
  const { modal, setModal } = props
  const [payload, setPayload] = useState<ICreateMileState>(initialState)

  const handleSubmit = () => {}

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="CreateMilestone">
      <React.Fragment>
        <CustomTextInput value={payload.title} label="title" placeholder="title" />
        <CustomTextarea value={payload.content} label="content" placeholder="content" />
        <CustomDate value={payload.startDate} label="StartDate" placeholder="StartDate" />
        <CustomDate value={payload.endDate} label="EndDate" placeholder="EndDate" />
      </React.Fragment>
    </Modal>
  )
}

export default CreateMilestone
