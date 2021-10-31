import React, { useEffect, useState } from 'react'

import { Search } from '@material-ui/icons'
import { useRouter } from 'next/router'
import clsx from 'clsx'

import { manageStyle } from '../../../styles/service/issuespace/issue'
import { IKanban, IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'
import CustomButton from '../../items/button/button'
import CreateMilestone from './create/milestone'
import CreateKanban from './create/kanban'
import Board from './board'
import Milestone from './milestone'
import Alert from '../../items/modal/alert'

interface IManageSpaceProps {}

export default function ManageSpace(props: IManageSpaceProps) {
  const classes = manageStyle()
  const router = useRouter()
  const manageMenu = ['Kanban', 'Milestone']
  const [menu, setMenu] = useState<string>('Kanban')
  const [modal, setModal] = useState<boolean>(false)
  const [kanbanList, setKanbanList] = useState<IKanban[]>([])
  const [modalKanban, setModalKanban] = useState<IKanban | null>(null)
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const [modalMile, setModalMile] = useState<IMilestone | null>(null)
  const [openResult, setOpenResult] = useState<boolean>(false)
  const [resultStatus, setResultStatus] = useState<boolean>(false)
  const [wsCheck, setWsCheck] = useState<number>(0)
  const [behaviorType, setBehaviorType] = useState<string>('')
  const [search, setSearch] = useState<string>('')
  const ws: any = useWs()
  const { workspaceId } = router.query

  const handleCreateButton = (event: React.MouseEvent<HTMLElement>) => {
    setModal(true)
  }

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

  const issueWebSocketHandler = async (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban':
          setKanbanList(message.data.kanbans)
          break

        case 'createKanban':
        case 'updateKanban':
          getKanbanList()
          break
        case 'deleteKanban':
          setBehaviorType('Kanban')
          if (message.data.code / 100 === 2) {
            setResultStatus(true)
            getKanbanList()
          } else {
            setResultStatus(false)
          }
          setOpenResult(true)
          break
        default:
      }
    } else if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone':
          setMileList(
            message.data.map((v: IMilestone) => {
              return { ...v, startDate: `20${v.startDate}`, endDate: `20${v.endDate}` }
            })
          )
          break

        case 'createMilestone':
        case 'updateMilestone':
          getMileList()
          break

        case 'deleteMilestone':
          setBehaviorType('Milestone')
          if (message.data.code / 100 === 2) {
            setResultStatus(true)
            getMileList()
          } else {
            setResultStatus(false)
          }
          setOpenResult(true)
          break
        default:
      }
    }
  }

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', issueWebSocketHandler)
      getKanbanList()
      getMileList()
      return () => {
        ws.removeEventListener('message', issueWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [ws?.readyState, wsCheck])

  const handleChangeMenu = (name: string) => () => {
    setMenu(name)
  }

  return (
    <div className={classes.manage}>
      <div className={classes.title}>
        <div className={classes.search}>
          <Search />
          <input
            type="text"
            placeholder="Search User or Channel"
            value={search}
            onChange={(event: any) => {
              setSearch(event.target.value)
            }}
          />
        </div>
        <CustomButton text="Create" onClick={handleCreateButton} />
      </div>
      <div className={classes.content}>
        <div className={classes.projectContent}>
          <div className={classes.projectHeader}>
            {manageMenu.map((v: string) => (
              <div className={clsx(classes.headerMenu, v === menu && classes.makeLine, v !== menu && classes.notSelect)} onClick={handleChangeMenu(v)} key={v}>
                {v}
              </div>
            ))}
          </div>
          <div className={classes.manageContent}>
            {menu === 'Kanban' ? (
              <Board search={search} kanbanList={kanbanList} setModal={setModal} setModalKanban={setModalKanban} />
            ) : (
              <Milestone search={search} milestoneList={mileList} setModal={setModal} setModalMile={setModalMile} />
            )}
          </div>
        </div>
      </div>
      {menu === 'Kanban' ? (
        <CreateKanban modal={modal} setModal={setModal} modalKanban={modalKanban} workspaceId={workspaceId as string} />
      ) : (
        <CreateMilestone modal={modal} setModal={setModal} modalMile={modalMile} workspaceId={workspaceId as string} />
      )}
      {openResult && <Alert modal={openResult} setModal={setOpenResult} title={behaviorType} description={resultStatus ? `Success Deleting ${behaviorType}` : `Error in Deleting ${behaviorType}`} />}
    </div>
  )
}
