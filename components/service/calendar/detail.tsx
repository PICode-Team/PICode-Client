import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { ICalendarData } from './calendar'
import CustomTextInput from '../../items/input/text'
import CustomDate from '../../items/input/date'
import CustomTextarea from '../../items/input/textarea'
import CustomSelect from '../../items/input/select'
import CustomUserInput from '../../items/input/userInput'
import { IKanban, IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'
import ModalBody from '../../items/modal/body'
import ModalFooter from '../../items/modal/footer'
import { DeleteForever, Settings } from '@material-ui/icons'
import DeleteModal from '../../items/modal/detail/delete'

const calenderDetailStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    modal: {
      position: 'fixed',
      backgroundColor: theme.backgroundColor.step1,
      zIndex: 99999,
      top: 0,
      left: 0,
      marginLeft: '35%',
      marginTop: '15%',
      padding: '30px',
      borderRadius: '12px',
      display: 'flex',
      flexDirection: 'column',
      height: 'fit-content',
      width: '30%',
    },
    overlay: {
      width: '100%',
      height: '100%',
      position: 'fixed',
      backgroundColor: 'black',
      top: 0,
      left: 0,
      opacity: 0.4,
      zIndex: 9999,
    },

    modalHeader: {
      width: '100%',
      height: '15%',
      fontWeight: 'bold',
      fontSize: '28px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: theme.font.medium.color,
      marginBottom: '12px',
      '&>div': {
        display: 'flex',
        alignItems: 'center',
      },
      '&>div>div>svg': {
        cursor: 'pointer',
      },
    },

    wrapper: {
      color: theme.font.high.color,
      fontSize: '16px',
      marginBottom: '10px',
      display: 'flex',
      height: '32px',
      alignItems: 'center',
    },
    key: {
      width: '150px',
    },
    value: {
      flex: 1,
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      '&>select': {
        width: '50%',
      },
    },

    divider: {
      width: '100%',
      height: '2px',
      backgroundColor: theme.backgroundColor.step2,
      margin: '10px 0px',
    },

    subTitle: {
      marginBottom: '10px',
      color: theme.font.high.color,
    },
  })
)

interface IScheduleDetail {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  detailData: ICalendarData
  kanbanList: IKanban[] | undefined
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

const initialState: IPayload = {
  title: '',
  content: '',
  startDate: '',
  dueDate: '',
  type: '',
  milestoneId: '',
  kanbanId: '',
}

interface IOptionData {
  name: string
  value: string
}

function ScheduleDetail(props: IScheduleDetail) {
  const { modal, setModal, detailData, kanbanList, milestoneList } = props
  const classes = calenderDetailStyle()
  const [editing, setEditing] = useState<boolean>(false)
  const [payload, setPayload] = useState<IPayload>({
    type: detailData.type,
    title: detailData.title,
    content: detailData.content,
    startDate: `20${detailData.startDate}`,
    dueDate: `20${detailData.dueDate}`,
    milestoneId: detailData?.milestone ?? '',
    kanbanId: detailData?.kanban ?? '',
  })
  const [userList, setUserList] = useState<string[]>(detailData?.assigner ?? [])
  const [label, setLabel] = useState<string>(detailData?.label ?? '')
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const kanbanData: IOptionData[] = []
  const mileData: IOptionData[] = []
  const ws: any = useWs()

  const handleSubmit = () => {
    if (payload.title === '') {
      alert('Please fill in the empty space.')

      return
    }

    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'calendar',
          type: 'updateSchedule',
          data: {
            scheduleId: detailData.scheduleId,
            title: payload.title,
            content: payload.content,
            startDate: payload.startDate.slice(2),
            dueDate: payload.dueDate.slice(2),
            milestone: payload.milestoneId === '' ? undefined : payload.milestoneId,
            kanban: payload.kanbanId === '' ? undefined : payload.kanbanId,
            label: payload.kanbanId === '' ? undefined : label === '' ? undefined : label,
            assigner: payload.kanbanId === '' ? undefined : userList,
          },
        })
      )
    }

    setPayload(initialState)
    setModal(false)
  }

  const handleDeleteSubmit = (scheduleId: string) => () => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'calendar',
          type: 'deleteSchedule',
          data: {
            scheduleId,
          },
        })
      )
    }
    setOpenDelete(false)
    setModal(false)
  }

  const handleClickDelete = (event: any) => {
    event.stopPropagation()
    event.preventDefault()

    setOpenDelete(true)
  }

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, startDate: event.target.value })
  }

  const handleDueDate = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, dueDate: event.target.value })
  }

  const handleLabel = (event: any) => {
    setLabel(event.target.value)
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
    setPayload({
      type: detailData.type,
      title: detailData.title,
      content: detailData.content,
      startDate: `20${detailData.startDate}`,
      dueDate: `20${detailData.dueDate}`,
      milestoneId: detailData?.milestone ?? '',
      kanbanId: detailData?.kanban ?? '',
    })
    setLabel(detailData?.label ?? '')
    setUserList(detailData?.assigner ?? [])
  }, [editing])

  const handleCloseModal = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    setModal(false)
  }

  return (
    <React.Fragment>
      {modal && !openDelete && (
        <React.Fragment>
          <div className={classes.modal}>
            <div className={classes.modalHeader}>
              <span>Schedule</span>
              <div>
                <div onClick={handleClickDelete} style={{ marginRight: '4px' }}>
                  <DeleteForever />
                </div>
                <div
                  onClick={() => {
                    setEditing(!editing)
                  }}
                >
                  <Settings />
                </div>
              </div>
            </div>

            <ModalBody>
              {editing === true ? (
                <React.Fragment>
                  {console.log(payload.kanbanId)}
                  {console.log(detailData.kanban)}

                  <CustomTextInput label="Title" value={payload.title} id="title" onChange={handlePayload} placeholder="Title" required={true} />
                  <CustomDate id="startDate" onChange={handleStartDate} value={payload.startDate} label="Start Date" placeholder="Start Date" />
                  <CustomDate id="dueDate" onChange={handleDueDate} value={payload.dueDate} label="Due Date" placeholder="Due Date" />
                  <CustomTextarea id="content" label="Content" value={payload.content} placeholder="Content" onChange={handlePayload} />
                  <label style={{ color: '#fff' }}>Optional</label>
                  <CustomSelect id="milestoneId" placeholder="select milestone" value={payload.milestoneId} label={'Milestone'} optionList={mileData} onChange={handlePayload} />
                  <CustomSelect id="kanbanId" placeholder="select kanban" value={payload.kanbanId} label={'Kanban'} optionList={kanbanData} onChange={handlePayload} />
                  {payload.kanbanId !== '' && <CustomUserInput value={userList} setValue={setUserList} label="Assignees" placeholder="input issue assignees" />}
                  {payload.kanbanId !== '' && <CustomTextInput id="label" value={label} label="Label" placeholder="label" onChange={handleLabel} />}
                </React.Fragment>
              ) : (
                <React.Fragment>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Title</div>
                    <div className={classes.value}>{detailData.title}</div>
                  </div>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Start Date</div>
                    <div className={classes.value}>{detailData.startDate}</div>
                  </div>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Due Date</div>
                    <div className={classes.value}>{detailData.dueDate}</div>
                  </div>
                  <div className={classes.divider}></div>
                  <div className={classes.subTitle}>Optional</div>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Milestone</div>
                    <div className={classes.value}>{milestoneList?.find((v) => v.uuid === detailData.milestone)?.title ?? 'Empty'}</div>
                  </div>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Kanban</div>
                    <div className={classes.value}>{kanbanList?.find((v) => v.uuid === detailData.kanban)?.title ?? 'Empty'}</div>
                  </div>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Assigness</div>
                    <div className={classes.value}>{(detailData?.assigner ?? []).join(', ')}</div>
                  </div>
                  <div className={classes.wrapper}>
                    <div className={classes.key}>Label</div>
                    <div className={classes.value}>{detailData?.label ?? 'Empty'}</div>
                  </div>
                </React.Fragment>
              )}
            </ModalBody>
            <ModalFooter handleCloseModal={handleCloseModal} onSubmit={handleSubmit} hidden={!editing} />
          </div>
          <div className={classes.overlay} onClick={handleCloseModal} />
        </React.Fragment>
      )}
      {openDelete && (
        <DeleteModal name={detailData.title} uuid={detailData.scheduleId} modal={openDelete} setModal={setOpenDelete} handleSubmit={handleDeleteSubmit} type="calendar" title="Delete Schedule" />
      )}
    </React.Fragment>
  )
}

export default ScheduleDetail
