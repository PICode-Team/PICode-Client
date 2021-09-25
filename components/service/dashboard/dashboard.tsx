import React from 'react'

import { dashboardStyle } from '../../../styles/service/dashboard/dashboard'
import IssueView from './issue'
import MilestoneView from './milestone'
import NoteView from './note'
import RecentWork from './recentwork'

interface IDashboardProps {}

function Dashboard(props: IDashboardProps) {
  const {} = props
  const classes = dashboardStyle()
  return (
    <div className={classes.dashboard}>
      <RecentWork />
      <div className={classes.row}>
        <IssueView />
        <MilestoneView />
        <NoteView />
      </div>
    </div>
  )
}

export default Dashboard
