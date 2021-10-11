import React, { useState } from 'react'

import { DeleteForever, Edit } from '@material-ui/icons'
import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import { boardStyle } from '../../../styles/service/issuespace/issue'
import { IKanban } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'

interface IBoardProps {
  kanbanList: IKanban[] | null
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setModalKanban: React.Dispatch<React.SetStateAction<IKanban | null>>
}

function Board(props: IBoardProps) {
  const { kanbanList, setModal, setModalKanban } = props
  const ws: any = useWs()
  const classes = boardStyle()
  const router = useRouter()
  const [kanbanIssue, setKanbanIssue] = useState<string>('')

  const handleLinkIssuePage = (uuid: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = router.route + '/issue' + router.asPath.split(router.route)[1] + `&kanbanUUID=${uuid}`
  }

  const handleEditBoard = (kanban: IKanban) => (event: React.MouseEvent) => {
    event.stopPropagation()
    setModalKanban(kanban)
    setModal(true)
  }

  const deleteKanban = (uuid: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'deleteKanban',
          data: {
            uuid,
          },
        })
      )
    }
  }

  const handleDeleteBoard = (uuid: string, name: string) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const result = await Swal.fire({
      title: 'Delete Kanban Board',
      text: `Are you sure delete ${name} Kanban Board?`,
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })

    if (result.isConfirmed) {
      deleteKanban(uuid)
    }
  }

  return (
    <div className={classes.board}>
      {kanbanIssue === '' && (
        <>
          <div className={classes.content} id="kanbanBoard">
            {kanbanList !== null &&
              kanbanList.map((v, i) => {
                return (
                  <div key={v.uuid} onClick={handleLinkIssuePage(v.uuid)} className={classes.item}>
                    <div className={classes.iconLayout}>
                      <div className={classes.title}>{v.title}</div>
                      <div className={classes.iconWrapper}>
                        <div className={classes.icon} onClick={handleEditBoard(v)}>
                          <Edit className={classes.edit} />
                        </div>
                        <div className={classes.icon} onClick={handleDeleteBoard(v.uuid, v.title)}>
                          <DeleteForever className={classes.delete} />
                        </div>
                      </div>
                    </div>
                    <div className={classes.contentLayout}>
                      <div className={classes.percentage}>
                        <div
                          className={classes.gauge}
                          style={{
                            width: `${(v.doneIssue / v.totalIssue) * 100}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                    <div>{v.description ?? 'this kanbanboard is no have description.'}</div>
                  </div>
                )
              })}
          </div>
        </>
      )}
    </div>
  )
}

export default Board