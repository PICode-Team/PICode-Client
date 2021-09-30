import React from 'react'

import { DeleteForever, Edit } from '@material-ui/icons'

import { boardStyle } from '../../../styles/service/issuespace/issue'
import { IMilestone } from '../../../types/issue.types'

interface IMilestoneProps {
  milestoneList: IMilestone[] | null
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setModalMile: React.Dispatch<React.SetStateAction<IMilestone | null>>
}

export const getPercentage = (startData: string, endDate: string) => {
  const date = new Date()
  const whole = Number(endDate.slice(8, 10)) - Number(startData.slice(8, 10))
  const today = Number(date.getDate()) - Number(startData.slice(8, 10))
  const percentage = today / whole

  if (percentage < 0) {
    return 0
  }

  return percentage * 100
}

function Milestone(props: IMilestoneProps) {
  const { milestoneList, setModal, setModalMile } = props
  const classes = boardStyle()

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

  const handleDeleteMile = () => {
    // (e) => {
    //   e.stopPropagation();
    //   ctx.ws.current.send(
    //     JSON.stringify({
    //       category: "milestone",
    //       type: "deleteMilestone",
    //       data: {
    //         uuid: v.uuid,
    //       },
    //     })
    //   );
    //   window.location.reload();
    // }
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
                    <div className={classes.icon} onClick={handleDeleteMile}>
                      <DeleteForever className={classes.delete} />
                    </div>
                  </div>
                </div>
                <div className={classes.contentLayout}>
                  <div className={classes.percentage}>
                    <div
                      className={classes.gauge}
                      style={{
                        width: `${getPercentage(v.startDate, v.endDate)}%`,
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
