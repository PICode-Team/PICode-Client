import React, { useEffect, useState } from 'react'
import { IKanban } from '../../../../types/issue.types'
import { useWs } from '../../../context/websocket'

import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'

interface ICreateKanbanProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  modalKanban: IKanban | null
  workspaceId: string
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
  const ws: any = useWs()

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const createKanban = (payload: ICreateKanbanState, workspaceId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'updateKanban',
          data: { ...payload, workspaceId },
        })
      )
    }
  }

  const handleSubmit = (isCreate: boolean) => () => {
    if (isCreate === true) {
      createKanban(payload, workspaceId)
    } else {
      updateKanban(payload, workspaceId)
    }
    setPayload(initialState)
    setModal(false)
  }

  useEffect(() => {
    if (modalKanban !== null) {
      setPayload(modalKanban)
    }
  }, [modalKanban])

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit(modalKanban === null)} title={modalKanban === null ? 'Create Kanban' : 'Edit Kanban'}>
      <React.Fragment>
        <CustomTextInput id="title" value={payload.title} label="title" placeholder="title" onChange={handlePayload} />
      </React.Fragment>
    </Modal>
  )
}

export default CreateKanban
