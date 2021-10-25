import React, { useEffect, useState } from 'react'
import { IKanban } from '../../../../types/issue.types'
import { IWorkspaceSpec } from '../../../../types/workspace.types'
import { fetchSet } from '../../../context/fetch'
import { useWs } from '../../../context/websocket'
import CustomSelect from '../../../items/input/select'

import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'

interface ICreateKanbanProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalKanban: IKanban | null
  workspaceId?: string
}

interface ICreateKanbanState {
  title: string
}

const initialState: ICreateKanbanState = {
  title: '',
}

function CreateKanban(props: ICreateKanbanProps) {
  const { modal, setModal, modalKanban, workspaceId } = props
  const [payload, setPayload] = useState<ICreateKanbanState>(initialState)
  const [workspaceData, setWorkspaceData] = useState<IWorkspaceSpec[]>([])
  const [tempWorkspaceId, setTempWorkspaceId] = useState<string>('')
  const ws: any = useWs()

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const handleWorkspaceId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempWorkspaceId(event.target.value)
  }

  const createKanban = (payload: ICreateKanbanState, workspaceId: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'createKanban',
          data: { ...payload, workspaceId },
        })
      )
    }
  }

  const updateKanban = (payload: ICreateKanbanState, workspaceId: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'updateKanban',
          data: { ...payload, workspaceId },
        })
      )
    }
  }

  const getWorkspaceData = async () => {
    const response = await fetchSet('/workspace', 'GET', true)
    const { workspaceList, code } = await response.json()

    if (code === 200) {
      if (workspaceList.length > 0) {
        setTempWorkspaceId(workspaceList[0].workspaceId)
      }
      setWorkspaceData(workspaceList)
    }
  }

  const handleSubmit = (isCreate: boolean) => () => {
    if (payload.title === '' || (workspaceId === undefined && tempWorkspaceId === '')) {
      alert('Please fill in the empty space.')

      return
    }

    if (isCreate === true) {
      createKanban(payload, workspaceId ?? tempWorkspaceId)
    } else {
      updateKanban(payload, workspaceId ?? tempWorkspaceId)
    }
    setPayload(initialState)
    setModal(false)
  }

  useEffect(() => {
    if (modalKanban !== null) {
      setPayload(modalKanban)
    }
  }, [modalKanban])

  useEffect(() => {
    if (workspaceId !== undefined) return

    getWorkspaceData()
  }, [workspaceId])

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit(modalKanban === null)} title={modalKanban === null ? 'Create Kanban' : 'Edit Kanban'}>
      <React.Fragment>
        <CustomTextInput id="title" value={payload.title} label="Title" placeholder="title" onChange={handlePayload} />
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

export default CreateKanban
