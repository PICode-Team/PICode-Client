import React from 'react'

import { DeleteForever, Edit } from '@material-ui/icons'

import { boardStyle } from '../../../styles/service/issuespace/issue'
import { IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'

interface IMilestoneProps {
  milestoneList: IMilestone[] | null
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setModalMile: React.Dispatch<React.SetStateAction<IMilestone | null>>
}

export const getPercentage = (startDate: string, endDate: string) => {
  const date = new Date()
  console.log(startDate, endDate)

  const whole = Number(endDate.slice(8, 10)) - Number(startDate.slice(8, 10))
  const today = Number(date.getDate()) - Number(startDate.slice(8, 10))
  const percentage = today / whole

  if (percentage < 0) {
    return 0
  }

  if (percentage > 1) {
    return 100
  }

  return percentage * 100
}

function Milestone(props: IMilestoneProps) {
  const { milestoneList, setModal, setModalMile } = props
  const classes = boardStyle()
  const ws: any = useWs()

  const handleEditMile = (mile: IMilestone) => (event: React.MouseEvent) => {
    event.stopPropagation()
    setModalMile({
      uuid: mile.uuid,
      title: mile.title,
      content: mile.content,
      startDate: mile.startDate,
      endDate: mile.endDate,
    })
    setModal(true)
  }

  const handleDeleteMile = (uuid: string) => () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'deleteMilestone',
          data: {
            uuid,
          },
        })
      )
    }
  }

  const handleClickMile = () => {}

  return (
    <div className={classes.board}>
      <div className={classes.content} id="kanbanBoard">
        {milestoneList !== null &&
          milestoneList.map((v: any, idx: number) => {
            return (
              <div className={classes.item} key={v.uuid} onClick={handleClickMile}>
                <div className={classes.iconLayout}>
                  <div className={classes.title}>{v.title}</div>
                  <div className={classes.iconWrapper}>
                    <div className={classes.icon} onClick={handleEditMile(v)}>
                      <Edit className={classes.edit} />
                    </div>
                    <div className={classes.icon} onClick={handleDeleteMile(v.uuid)}>
                      <DeleteForever className={classes.delete} />
                    </div>
                  </div>
                </div>
                <div className={classes.contentLayout}>
                  <div className={classes.percentage}>
                    <div
                      className={classes.gauge}
                      style={{
                        width: `${v.startDate !== undefined && v.endDate !== undefined ? getPercentage(v.startDate, v.endDate) : '0'}%`,
                      }}
                    ></div>
                  </div>
                </div>
                <div>
                  {v.startDate} ~ {v.endDate}
                </div>
                <div>{v.content ?? 'this milestone is no have description.'}</div>
              </div>
            )
          })}
      </div>
    </div>
  )
}

export default Milestone
