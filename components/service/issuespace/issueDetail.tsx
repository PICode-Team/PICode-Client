import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { issueDetailStyle } from '../../../styles/service/issuespace/issue'
import { IKanban, IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'
import CustomButton from '../../items/button/button'
import CustomSelect from '../../items/input/select'
import CustomTextInput from '../../items/input/text'
import CustomUserInput from '../../items/input/userInput'

interface IIssueDetail {
  assigner: string[]
  column: string
  content: string
  creation: string
  creator: string
  dueDate: string
  issueId: number
  kanban: string
  label: string
  milestone: string
  startDate: string
  title: string
  uuid: string
}

const initialEditState: IIssueDetail = {
  assigner: [''],
  column: '',
  content: '',
  creation: '',
  creator: '',
  dueDate: '',
  issueId: -1,
  kanban: '',
  label: '',
  milestone: '',
  startDate: '',
  title: '',
  uuid: '',
}

interface IOptionData {
  name: string
  value: string
}

function IssueDetail() {
  const classes = issueDetailStyle()
  const router = useRouter()
  const { issueUUID } = router.query
  const [issueInfo, setIssueInfo] = useState<IIssueDetail | null>(null)
  const [milestoneName, setMilestoneName] = useState<string>('')
  const [kanbanName, setKanbanName] = useState<string>('')
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const [kanbanList, setKanbanList] = useState<IKanban[]>([])
  const [wsCheck, setWsCheck] = useState<number>(0)
  const [editing, setEditing] = useState<boolean>(false)
  const [editPayload, setEditPayload] = useState<IIssueDetail>(initialEditState)
  const [value, setValue] = useState<string[]>([])
  const kanbanData: IOptionData[] = []
  const mileData: IOptionData[] = []
  const labelData: IOptionData[] = []
  const ws: any = useWs()

  if (kanbanList !== undefined && kanbanList !== null) {
    kanbanList.map((v) => {
      if (v === null) return
      kanbanData.push({
        name: v.title,
        value: v.uuid,
      })
    })
  }

  if (mileList !== undefined && mileList !== null) {
    mileList.map((v) => {
      if (v === null) return
      mileData.push({
        name: v.title,
        value: v.uuid,
      })
    })
  }

  if (kanbanList !== undefined) {
    const columns = kanbanList.find((v) => v.uuid === issueInfo?.kanban)?.columns

    if (columns !== undefined) {
      columns.map((x) => {
        labelData.push({ name: x, value: x })
      })
    }
  }

  useEffect(() => {
    if (issueInfo === null) return

    setEditPayload(issueInfo)
    setValue(issueInfo.assigner)
  }, [editing])

  useEffect(() => {
    if (issueInfo !== null) {
      getKanbanList()
      getMileList()
    }
  }, [issueInfo])

  const getKanbanList = () => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'getKanban',
          data: {},
        })
      )
    }
  }

  const getMileList = () => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'getMilestone',
          data: {},
        })
      )
    }
  }

  const getIssueDetail = (issueUUID: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssueDetail',
          data: {
            issueUUID,
          },
        })
      )
    }
  }

  const updateIssue = (kanbanUUID: string, issueData: IIssueDetail) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'updateIssue',
          data: {
            kanbanUUID,
            issueData,
          },
        })
      )
    }
  }

  const issueWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'issue') {
      switch (message.type) {
        case 'getIssueDetail':
          if (message.data !== undefined) {
            setIssueInfo(message.data)
          }
          break
        case 'updateIssue':
          if (message.data.code === 200) {
            setIssueInfo(message.data.issue)
          }

          break
      }
    } else if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban':
          if (message.data.kanbans.length > 0) {
            setKanbanList(message.data.kanbans)
            setKanbanName(message.data.kanbans.find((v: any) => v.uuid)?.title ?? '')
          }

          break
      }
    } else if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone':
          if (message.data !== undefined) {
            setMileList(message.data)
            setMilestoneName(message.data.find((v: any) => v.uuid)?.title ?? '')
          }

          break
      }
    }
  }

  const handleEditButtonClick = () => {
    setEditing(true)
  }

  const handleCancelButtonClick = () => {
    setEditing(false)
  }

  const handleSaveButtonClick = () => {
    if (issueInfo === null) return
    if (editPayload === null) return

    updateIssue(issueInfo.kanban, editPayload)
    setEditing(false)
  }

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', issueWebSocketHandler)
      getIssueDetail(issueUUID as string)

      return () => {
        ws.removeEventListener('message', issueWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [ws?.readyState, wsCheck])

  const handleEditPayload = (event: any) => {
    setEditPayload({ ...editPayload, [event.target.id]: event.target.value })
  }

  return (
    <div className={classes.detail}>
      <div className={classes.header}>
        <div className={classes.titleWrapper}>
          <div className={classes.titleContent}>
            {editing === false ? (
              <React.Fragment>
                <span className={classes.title}>{issueInfo !== null && issueInfo.title}</span>
                <span className={classes.issueNumber}>#{issueInfo !== null && issueInfo.issueId}</span>
              </React.Fragment>
            ) : (
              <input id="title" placeholder="Title" className={classes.input} type="text" value={editPayload.title} onChange={handleEditPayload} />
            )}
          </div>
          <div>
            {editing === false ? (
              <CustomButton text="Edit" color="secondary" onClick={handleEditButtonClick} />
            ) : (
              <div className={classes.buttonWrapper}>
                <CustomButton text="Save" color="secondary" onClick={handleSaveButtonClick} />
                <CustomButton text="Cancel" onClick={handleCancelButtonClick} />
              </div>
            )}
          </div>
        </div>

        <div className={classes.infoWrapper}>
          <div className={`${classes.activeStatus} ${classes.open}`}>Open</div>
          <div className={classes.creation}>{issueInfo !== null && issueInfo.creator} opened this issue</div>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.item}>
          <div className={classes.key}>Assignees</div>
          <div className={classes.value}>
            {editing === false ? (
              issueInfo !== null && (issueInfo.assigner.length === 0 ? 'Empty' : issueInfo.assigner.join(', '))
            ) : (
              <CustomUserInput style={{ width: '50%' }} label="" placeholder="" value={value} setValue={setValue} onlyContent={true} />
            )}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Labels</div>
          <div className={classes.value}>
            {editing === false ? (
              issueInfo !== null && (issueInfo.label === '' ? 'Empty' : issueInfo.label)
            ) : (
              <input id="label" placeholder="Label" className={`${classes.input} ${classes.width50}`} type="text" value={editPayload.label} onChange={handleEditPayload} />
            )}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Kanban Board</div>
          <div className={classes.value}>
            {editing === false ? (
              issueInfo !== null && issueInfo.kanban === '' ? (
                'Empty'
              ) : kanbanName === '' ? (
                'Empty'
              ) : (
                kanbanName
              )
            ) : (
              <CustomSelect id="kanban" placeholder="select kanban" value={editPayload.kanban} label={'Kanban'} optionList={kanbanData} onChange={handleEditPayload} onlyContent={true} />
            )}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Column</div>
          <div className={classes.value}>
            {editing === false ? (
              issueInfo !== null && issueInfo.column
            ) : (
              <CustomSelect id="milestone" placeholder="select column" value={editPayload.column} label={'Column'} optionList={labelData} onChange={handleEditPayload} onlyContent={true} />
            )}
          </div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Milestone</div>
          <div className={classes.value}>
            {editing === false ? (
              issueInfo !== null && (issueInfo.milestone === '' ? 'Empty' : milestoneName === '' ? 'Empty' : milestoneName)
            ) : (
              <CustomSelect id="milestone" placeholder="select milestone" value={editPayload.milestone} label={'Milestone'} optionList={mileData} onChange={handleEditPayload} onlyContent={true} />
            )}
          </div>
        </div>

        <div className={classes.divider} />

        <div className={classes.description}>{editing === false ? issueInfo !== null && issueInfo.content : <textarea className={classes.textarea}></textarea>}</div>
      </div>
    </div>
  )
}

export default IssueDetail
