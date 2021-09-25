import { useState } from 'react'

import { DeleteForever, Edit } from '@material-ui/icons'

import { boardStyle } from '../../../styles/service/issue'
import { IMilestone } from '../../../types/issue.types'
import CreateMilestone from './create/milestone'

interface IMilestoneProps {
  kanbanIssue: string
  milestoneList: IMilestone[] | null
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
  const { kanbanIssue, milestoneList } = props
  const classes = boardStyle()
  const [modal, setModal] = useState<boolean>(false)

  const handleEditMile = () => {
    // (e) => {
    //   e.stopPropagation();
    //   setModalData({
    //     uuid: v.uuid,
    //     title: v.title,
    //     content: v.content,
    //     startDate: v.startDate,
    //     endDate: v.endDate,
    //   });
    //   setModal(true);
    // }
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
      {kanbanIssue === '' && (
        <>
          <div className={classes.content} id="kanbanBoard">
            {milestoneList !== null &&
              milestoneList.map((v: any, idx: number) => {
                return (
                  <div className={classes.item} key={v.uuid} onClick={handleClickMile}>
                    <div className={classes.iconLayout}>
                      <div className={classes.title}>{v.title}</div>
                      <div className={classes.iconWrapper}>
                        <div className={classes.icon} onClick={handleEditMile}>
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
        </>
      )}
      <CreateMilestone modal={modal} setModal={setModal} />
    </div>
  )
}

export default Milestone
