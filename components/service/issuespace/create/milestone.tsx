import React, { useEffect, useState } from 'react'
import { IMilestone } from '../../../../types/issue.types'
import CustomDate from '../../../items/input/date'
import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import Modal from '../../../items/modal/modal'

interface ICreateMilestoneProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalMile: IMilestone | null
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
  const { modal, setModal, modalMile } = props
  const [payload, setPayload] = useState<ICreateMileState>(initialState)

  useEffect(() => {
    if (modalMile !== null) {
      setPayload(modalMile)
    }
  }, [modalMile])

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
