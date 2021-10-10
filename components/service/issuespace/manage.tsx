import React, { useEffect, useState } from 'react'

import { Search } from '@material-ui/icons'
import { useRouter } from 'next/router'
import clsx from 'clsx'
import Swal from 'sweetalert2'

import { manageStyle } from '../../../styles/service/issuespace/issue'
import { IKanban, IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'
import CustomButton from '../../items/button/button'
import CreateMilestone from './create/milestone'
import CreateKanban from './create/kanban'
import Board from './board'
import Milestone from './milestone'

interface IManageSpaceProps {}

export default function ManageSpace(props: IManageSpaceProps) {
  const classes = manageStyle()
  const router = useRouter()
  const manageMenu = ['Board', 'Milestone']
  const [menu, setMenu] = useState<string>('Milestone')
  const [modal, setModal] = useState<boolean>(false)
  const [kanbanList, setKanbanList] = useState<IKanban[]>([])
  const [modalKanban, setModalKanban] = useState<IKanban | null>(null)
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const [modalMile, setModalMile] = useState<IMilestone | null>(null)
  const ws: any = useWs()
  const { workspaceId } = router.query

  const handleCreateButton = (event: React.MouseEvent<HTMLElement>) => {
    setModal(true)
  }

  const getKanbanList = () => {
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

  const getMileList = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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
          if (message.data.code / 100 === 2) {
            await Swal.fire({
              title: 'SUCCESS',
              text: `DELETE ${workspaceId}`,
              icon: 'success',
              heightAuto: false,
            })
            getKanbanList()
          } else {
            Swal.fire({
              title: 'ERROR',
              html: `
                    ERROR in DELETE ${workspaceId}
                    <br />
                    <span>${message.data.code}</span>
                    `,
              icon: 'error',
              heightAuto: false,
            })
          }

          break
        default:
      }
    } else if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone':
          setMileList(message.data)
          break

        case 'createMilestone':
        case 'updateMilestone':
          getMileList()
          break

        case 'deleteMilestone':
          if (message.data.code / 100 === 2) {
            await Swal.fire({
              title: 'SUCCESS',
              text: `DELETE ${workspaceId}`,
              icon: 'success',
              heightAuto: false,
            })
            getMileList()
          } else {
            Swal.fire({
              title: 'ERROR',
              html: `
                    ERROR in DELETE ${workspaceId}
                    <br />
                    <span>${message.data.code}</span>
                    `,
              icon: 'error',
              heightAuto: false,
            })
          }
          break

        default:
      }
    }
  }

  useEffect(() => {
    ws.addEventListener('message', issueWebSocketHandler)

    getKanbanList()
    getMileList()

    return () => {
      ws.removeEventListener('message', issueWebSocketHandler)
    }
  }, [ws?.readyState])

  const handleChangeMenu = (name: string) => () => {
    setMenu(name)
  }

  useEffect(() => {
    setTimeout(() => {
      setMenu('Board')
    }, 100)
  }, [])

  return (
    <div className={classes.manage}>
      <div className={classes.title}>
        <div className={classes.search}>
          <Search />
          <input type="text" placeholder="Search User or Channel" />
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
            {menu === 'Board' ? (
              <Board kanbanList={kanbanList} setModal={setModal} setModalKanban={setModalKanban} />
            ) : (
              <Milestone milestoneList={mileList} setModal={setModal} setModalMile={setModalMile} />
            )}
          </div>
        </div>
      </div>
      {menu === 'Board' ? (
        <CreateKanban modal={modal} setModal={setModal} modalKanban={modalKanban} workspaceId={workspaceId as string} />
      ) : (
        <CreateMilestone modal={modal} setModal={setModal} modalMile={modalMile} workspaceId={workspaceId as string} />
      )}
    </div>
  )
}
