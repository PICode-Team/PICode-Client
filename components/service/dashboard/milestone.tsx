import React, { useState } from 'react'
import { milestoneStyle } from '../../../styles/service/dashboard/dashboard'
import { IMilestone } from '../../../types/issue.types'
import { getPercentage } from '../issuespace/milestone'

interface IMilestoneViewProps {}

function MilestoneView(props: IMilestoneViewProps) {
  const {} = props
  const [milestone, setMile] = useState<IMilestone[]>([])

  const handleLinkMilestone = () => {}

  const classes = milestoneStyle()
  return (
    <div className={classes.milestone}>
      <div className={classes.title}>Milestone</div>
      <div className={classes.content}>
        {milestone.length > 0 ? (
          milestone.map((v: any, idx: number) => {
            return (
              <div className={classes.card} key={v.uuid} onClick={handleLinkMilestone}>
                <div className={classes.top}>
                  <div className={classes.mileTitle}>{v.title}</div>
                  <div className={classes.topWrapper}></div>
                </div>
                <div>
                  <div className={classes.percentage}>
                    <div className={classes.gauge} style={{ width: `${getPercentage(v.startDate, v.endDate)}%` }}></div>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className={classes.empty}>this server has no milestone</div>
        )}
      </div>
    </div>
  )
}

export default MilestoneView
