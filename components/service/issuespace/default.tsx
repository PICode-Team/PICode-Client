import { useEffect, useState } from 'react'

import { Search } from '@material-ui/icons'
import clsx from 'clsx'

import { manageStyle } from '../../../styles/service/issuespace/issue'
import CustomButton from '../../items/button/button'
import { IIssue, IKanban, IMilestone } from '../../../types/issue.types'
import CreateKanban from './create/kanban'
import CreateMilestone from './create/milestone'
import CreateIssue from './create/issue'
import Milestone from './milestone'
import Board from './board'
import Issue from './issue'
import { useWs } from '../../context/websocket'
import Label from './label'
import CreateLabel from './create/label'
import { useRouter } from 'next/router'
import Alert from '../../items/modal/alert'

function DefaultIssue() {
  const classes = manageStyle()
  const manageMenu = ['Issue', 'Kanban', 'Milestone']
  const [menu, setMenu] = useState<string>('Issue')
  const [modal, setModal] = useState<boolean>(false)
  const [kanbanList, setKanbanList] = useState<IKanban[]>([])
  const [modalKanban, setModalKanban] = useState<IKanban | null>(null)
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const [modalMile, setModalMile] = useState<IMilestone | null>(null)
  const [issueList, setIssueList] = useState<IIssue[] | null>(null)
  const [modalIssue, setModalIssue] = useState<IIssue | null>(null)
  const [resultStatus, setResultStatus] = useState<boolean>(false)
  const [openResult, setOpenResult] = useState<boolean>(false)
  const [behaviorType, setBehaviorType] = useState<string>('')
  const [wsCheck, setWsCheck] = useState<number>(0)
  const [search, setSearch] = useState<string>('')
  const router = useRouter()
  const ws: any = useWs()
  const { type } = router.query

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

  const getIssue = (kanbanUUID: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssue',
          data: {
            kanbanUUID,
          },
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
          if (message.data.kanbans.length > 0) {
            setKanbanList(message.data.kanbans)
          }
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
    } else if (message.category === 'issue') {
      switch (message.type) {
        case 'getIssue':
          if (message.data.issues.length > 0) {
            setIssueList([...(issueList ?? []), ...message.data.issues])
          }
          break
        case 'createIssue':
          if (message.data.code === 200) {
            setIssueList([...(issueList ?? []), message.data.issue])
          }
          break
        default:
          break
      }
    }
  }

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', issueWebSocketHandler)

      if (kanbanList.length === 0) {
        getKanbanList()
      }

      if (mileList.length === 0) {
        getMileList()
      }

      return () => {
        ws.removeEventListener('message', issueWebSocketHandler)
      }
    } else {
      setWsCheck(wsCheck + 1)
    }
  }, [wsCheck, issueList])

  const handleChangeMenu = (name: string) => () => {
    setMenu(name)
  }

  useEffect(() => {
    kanbanList.map((v: any) => {
      if (v !== null) {
        getIssue(v.uuid)
      }
    })
  }, [kanbanList])

  useEffect(() => {
    if (type !== undefined) {
      setMenu(type as string)
    }
  }, [])

  useEffect(() => {
    setWsCheck(0)
  }, [issueList])

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
            {menu === 'Issue' && <Issue search={search} issueList={issueList} setModal={setModal} setModalIssue={setModalIssue} />}
            {menu === 'Kanban' && <Board search={search} kanbanList={kanbanList} setModal={setModal} setModalKanban={setModalKanban} />}
            {menu === 'Milestone' && <Milestone search={search} milestoneList={mileList} setModal={setModal} setModalMile={setModalMile} />}
            {/* {menu === 'Label' && <Label />} */}
          </div>
        </div>
      </div>
      {menu === 'Issue' && <CreateIssue modal={modal} setModal={setModal} mileList={mileList} kanbanList={kanbanList} column={'backlog'} />}
      {menu === 'Kanban' && <CreateKanban modal={modal} setModal={setModal} modalKanban={modalKanban} />}
      {menu === 'Milestone' && <CreateMilestone modal={modal} setModal={setModal} modalMile={modalMile} />}
      {/* {menu === 'Label' && <CreateLabel />} */}

      {openResult && <Alert modal={openResult} setModal={setOpenResult} title={behaviorType} description={resultStatus ? `Success Deleting ${behaviorType}` : `Error in Deleting ${behaviorType}`} />}
    </div>
  )
}

export default DefaultIssue
