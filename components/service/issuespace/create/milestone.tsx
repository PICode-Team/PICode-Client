import React, { useEffect, useState } from 'react'
import { IMilestone } from '../../../../types/issue.types'
import { IWorkspaceSpec } from '../../../../types/workspace.types'
import { fetchSet } from '../../../context/fetch'
import { useWs } from '../../../context/websocket'
import CustomDate from '../../../items/input/date'
import CustomSelect from '../../../items/input/select'
import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import Modal from '../../../items/modal/modal'

interface ICreateMilestoneProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalMile: IMilestone | null
  workspaceId?: string
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
  const [workspaceData, setWorkspaceData] = useState<IWorkspaceSpec[]>([])
  const [tempWorkspaceId, setTempWorkspaceId] = useState<string>('')
  const ws: any = useWs()

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const handleWorkspaceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempWorkspaceId(event.target.value)
  }

  const createMilestone = (payload: ICreateMileState, workspaceId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'createMilestone',
          data: { ...payload, workspaceId, startDate: payload.startDate.slice(2), endDate: payload.endDate.slice(2) },
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
          data: { ...payload, workspaceId, startDate: payload.startDate.slice(2), endDate: payload.endDate.slice(2) },
        })
      )
    }
  }

  const handleSubmit = (isCreate: boolean) => () => {
    if (isCreate) {
      createMilestone(payload, workspaceId ?? tempWorkspaceId)
    } else {
      updateMilestone(payload, workspaceId ?? tempWorkspaceId)
    }
    setPayload(initialState)
    setModal(false)
  }

  const getWorkspaceData = async () => {
    const response = await fetchSet('/workspace', 'GET', true)
    const { workspaceList, code } = await response.json()

    if (code === 200) {
      setWorkspaceData(workspaceList)
    }
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

  useEffect(() => {
    if (workspaceId !== undefined) return

    getWorkspaceData()
  }, [workspaceId])

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit(modalMile === null)} title={modalMile === null ? 'Create Milestone' : 'Edit Milestone'} size="lg">
      <React.Fragment>
        <CustomTextInput required={true} id="title" onChange={handlePayload} value={payload.title} label="Title" placeholder="title" />
        <CustomTextarea id="content" onChange={handlePayload} value={payload.content} label="Content" placeholder="content" />
        <CustomDate id="startDate" onChange={handleStartDate} value={payload.startDate} label="Start Date" placeholder="StartDate" />
        <CustomDate id="endDate" onChange={handleEndDate} value={payload.endDate} label="End Date" placeholder="EndDate" />
        {workspaceId === undefined && (
          <CustomSelect
            id="tempWorkspaceId"
            value={tempWorkspaceId}
            label="Workspace"
            onChange={handleWorkspaceId}
            optionList={workspaceData.reduce((a: { name: string; value: string }[], c) => {
              return [...a, { name: c.name, value: c.workspaceId }]
            }, [])}
          />
        )}
      </React.Fragment>
    </Modal>
  )
}

export default CreateMilestone
