import React, { useEffect, useState } from 'react'
import { IKanban, IMilestone } from '../../../../types/issue.types'
import { IUser } from '../../../../types/user.types'
import { fetchSet } from '../../../context/fetch'
import { useWs } from '../../../context/websocket'
import CustomDate from '../../../items/input/date'
import CustomSelect from '../../../items/input/select'

import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import CustomUserInput from '../../../items/input/userInput'
import Modal from '../../../items/modal/modal'

interface ICreateIssueState {
  title: string
  content: string
  creator: string
  assigner: string[]
  label: string
  column: string
  milestone: string
  startDate: string
  dueDate: string
  workspaceId: string
}

const initialState: ICreateIssueState = {
  title: '',
  content: '',
  creator: '',
  assigner: [],
  label: '',
  column: '',
  milestone: '',
  startDate: '',
  dueDate: '',
  workspaceId: '',
}

interface ICreateIssueProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  kanbanUUID?: string
  mileList: IMilestone[]
  column?: string
  workspaceId?: string
}

interface IMilestoneSelect {
  name: string
  value: string
}

function CreateIssue(props: ICreateIssueProps) {
  const { modal, setModal, kanbanUUID, mileList, column, workspaceId } = props
  const [payload, setPayload] = useState<ICreateIssueState>(initialState)
  const [tempUUID, setTempUUID] = useState<string>('')
  const [userList, setUserList] = useState<string[]>([])
  const [userInfo, setUserInfo] = useState<IUser | null>(null)
  const [optionList, setOptionList] = useState<IMilestoneSelect[]>([])
  const [kanbanList, setKanbanList] = useState<IKanban[]>([])
  const ws: any = useWs()

  const getUserData = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { user, code } = await response.json()

    if (code === 200) {
      setUserInfo(user)
    }
  }

  useEffect(() => {
    if (column !== undefined) {
      setPayload({ ...payload, column })
    }
  }, [column])

  useEffect(() => {
    if (userInfo !== null) {
      setPayload({ ...payload, creator: userInfo.userId })
    }
  }, [userInfo])

  useEffect(() => {
    if (workspaceId !== undefined) {
      setPayload({ ...payload, workspaceId })
    }
  }, [workspaceId])

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const getKanban = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'getKanban',
          data: {},
        })
      )
    }
  }

  const handleSubmit = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'createIssue',
          data: {
            issueData: {
              ...payload,
              startDate: payload.startDate.slice(2),
              dueDate: payload.dueDate.slice(2),
            },
            kanbanUUID: kanbanUUID ?? '',
          },
        })
      )

      setModal(false)
    }
  }

  const issueWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban':
          setKanbanList(message.data.kanbans)
          break
        default:
      }
    }
  }

  useEffect(() => {
    if (mileList.length > 0) {
      setOptionList(mileList.reduce((a: IMilestoneSelect[], c: IMilestone) => [...a, { name: c.title, value: c.uuid }], []))
    }
  }, [mileList])

  useEffect(() => {
    setPayload({ ...payload, assigner: userList })
  }, [userList])

  useEffect(() => {
    getUserData()
  }, [])

  useEffect(() => {
    ws.addEventListener('message', issueWebSocketHandler)
    if (kanbanList.length === 0) {
      getKanban()
    }
    return () => {
      ws.removeEventListener('message', issueWebSocketHandler)
    }
  }, [ws?.readyState])

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, startDate: event.target.value })
  }

  const handleDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, dueDate: event.target.value })
  }

  const handleTempUUID = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTempUUID(event.target.value)
  }

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="Create Issue" size="lg">
      <React.Fragment>
        <CustomTextInput id="title" value={payload.title} label="Title" placeholder="title" onChange={handlePayload} />
        <CustomTextarea id="content" value={payload.content} label="Content" placeholder="content" onChange={handlePayload} />
        <CustomUserInput value={userList} setValue={setUserList} label="Project Participant" />
        <CustomTextInput id="label" value={payload.label} label="Label" placeholder="label" onChange={handlePayload} />
        {kanbanUUID === undefined && (
          <CustomSelect
            id="tempWorkspaceId"
            value={tempUUID}
            label="Kanban"
            onChange={handleTempUUID}
            optionList={kanbanList.reduce((a: { name: string; value: string }[], c) => {
              return [...a, { name: c.title, value: c.uuid }]
            }, [])}
          />
        )}
        <CustomSelect id="milestone" value={payload.milestone} label="Milestone" placeholder="select milestone" onChange={handlePayload} optionList={optionList} />
        <CustomDate id="startDate" onChange={handleStartDate} value={payload.startDate} label="Start Date" placeholder="StartDate" />
        <CustomDate id="dueDate" onChange={handleDueDate} value={payload.dueDate} label="Due Date" placeholder="dueDate" />
      </React.Fragment>
    </Modal>
  )
}

export default CreateIssue
