import React, { useEffect, useState } from 'react'

import { Radio, RadioProps } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'
import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IKanban, IMilestone } from '../../../types/issue.types'
import CustomDate from '../../items/input/date'
import CustomSelect from '../../items/input/select'
import CustomTextInput from '../../items/input/text'
import CustomTextarea from '../../items/input/textarea'
import Modal from '../../items/modal/modal'
import moment from 'moment'
import { useWs } from '../../context/websocket'

const createCalenderStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    radioWrapper: {
      display: 'flex',
      alignItems: 'center',
      height: '30px',
    },
    radioLabel: {
      color: theme.font.high.color,
      marginRight: '20px',
      marginLeft: '-5px',
    },
  })
)

interface ICreateSchedule {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  kanbanList: IKanban[] | undefined
  tmpDay: Date
  milestoneList: IMilestone[] | undefined
}

interface IPayload {
  title: string
  content: string
  startDate: string
  dueDate: string
  type: string
  milestoneId: string
  kanbanId: string
}

interface IOptionData {
  name: string
  value: string
}

const initialState: IPayload = {
  title: '',
  content: '',
  startDate: '',
  dueDate: '',
  type: '',
  milestoneId: '',
  kanbanId: '',
}

const CustomRadio = withStyles({
  root: {
    color: '#4078b8 !important',
    '&$checked': {
      color: '#488cd9',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

export default function CreateSchedule(props: ICreateSchedule) {
  const { modal, setModal, kanbanList, tmpDay, milestoneList } = props
  const classes = createCalenderStyle()
  const [payload, setPayload] = useState<IPayload>(initialState)
  const [isPublic, setIsPublic] = useState<boolean>(true)
  const kanbanData: IOptionData[] = [{ name: 'Select kanban', value: '' }]
  const mileData: IOptionData[] = [{ name: 'Select milestone', value: '' }]
  const ws: any = useWs()

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, startDate: event.target.value })
  }

  const handleDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, dueDate: event.target.value })
  }

  if (kanbanList !== undefined) {
    kanbanList.map((v) => {
      if (v === null) return
      kanbanData.push({
        name: v.title,
        value: v.uuid,
      })
    })
  }

  if (milestoneList !== undefined) {
    milestoneList.map((v) => {
      if (v === null) return
      mileData.push({
        name: v.title,
        value: v.uuid,
      })
    })
  }

  useEffect(() => {
    const date = new Date()
    const today = moment(date).format('YYYY-MM-DD')

    setPayload({ ...payload, startDate: today, dueDate: today })
  }, [])

  const handleSubmit = () => {
    if (payload.title === '') {
      alert('Please fill in the empty space.')

      return
    }

    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'calendar',
          type: 'createSchedule',
          data: {
            type: isPublic === true ? 'public' : 'private',
            title: payload.title,
            content: payload.content,
            startDate: payload.startDate.slice(2),
            dueDate: payload.dueDate.slice(2),
            milestone: payload.milestoneId === '' ? undefined : payload.milestoneId,
            kanban: payload.kanbanId === '' ? undefined : payload.kanbanId,
          },
        })
      )
    }

    setPayload(initialState)
    setIsPublic(true)
    setModal(false)
  }

  const handleRadio = (e: any) => {
    if (e.currentTarget.id === 'add') {
      setIsPublic(true)
    } else {
      setIsPublic(false)
    }
  }

  return (
    <Modal modal={modal} setModal={setModal} title={'Create schedule'} onSubmit={handleSubmit}>
      <React.Fragment>
        <div className={classes.radioWrapper}>
          <label style={{ color: '#fff' }}>Type</label>
          <CustomRadio id="add" checked={isPublic} onChange={handleRadio} />
          <span className={classes.radioLabel}>Public</span>
          <CustomRadio id="delete" checked={!isPublic} onChange={handleRadio} />
          <span className={classes.radioLabel}>Private</span>
        </div>
        <CustomTextInput label="Title" value={payload.title} id="title" onChange={handlePayload} placeholder="Title" required={true} />
        <CustomDate id="startDate" onChange={handleStartDate} value={payload.startDate} label="Start Date" placeholder="Start Date" />
        <CustomDate id="dueDate" onChange={handleDueDate} value={payload.dueDate} label="Due Date" placeholder="Due Date" />
        <CustomTextarea id="content" label="content" value={payload.content} placeholder="Content" onChange={handlePayload} />
        <label style={{ color: '#fff' }}>Optional</label>
        <CustomSelect value={payload.milestoneId} label={'Milestone'} optionList={mileData} onChange={() => {}} />
        <CustomSelect value={payload.kanbanId} label={'Kanban'} optionList={kanbanData} onChange={() => {}} />
      </React.Fragment>
    </Modal>
  )
}
