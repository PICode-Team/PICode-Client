import React, { useEffect, useState } from 'react'
import { IMilestone } from '../../../../types/issue.types'
import { useWs } from '../../../context/websocket'
import CustomDate from '../../../items/input/date'
import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import Modal from '../../../items/modal/modal'

interface ICreateMilestoneProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalMile: IMilestone | null
  workspaceId: string
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
  const { modal, setModal, modalMile, workspaceId } = props
  const [payload, setPayload] = useState<ICreateMileState>(initialState)
  const ws: any = useWs()

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const createMilestone = (payload: ICreateMileState, workspaceId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'createMilestone',
          data: { ...payload, workspaceId },
        })
      )
    }
  }

  const updateMilestone = (payload: ICreateMileState, workspaceId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'updateMilestone',
          data: { ...payload, workspaceId },
        })
      )
    }
  }

  const handleSubmit = (isCreate: boolean) => () => {
    if (isCreate) {
      createMilestone(payload, workspaceId)
    } else {
      updateMilestone(payload, workspaceId)
    }
    setPayload(initialState)
    setModal(false)
  }

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, startDate: event.target.value })
  }

  const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, endDate: event.target.value })
  }

  useEffect(() => {
    if (modalMile !== null) {
      setPayload(modalMile)
    }
  }, [modalMile])

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit(modalMile === null)} title={modalMile === null ? 'Create Milestone' : 'Edit Milestone'} size="lg">
      <React.Fragment>
        <CustomTextInput required={true} id="title" onChange={handlePayload} value={payload.title} label="title" placeholder="title" />
        <CustomTextarea id="content" onChange={handlePayload} value={payload.content} label="content" placeholder="content" />
        <CustomDate id="startDate" onChange={handleStartDate} value={payload.startDate} label="StartDate" placeholder="StartDate" />
        <CustomDate id="endDate" onChange={handleEndDate} value={payload.endDate} label="EndDate" placeholder="EndDate" />
      </React.Fragment>
    </Modal>
  )
}

export default CreateMilestone
