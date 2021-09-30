import React, { useEffect, useState } from 'react'
import { milestoneStyle } from '../../../styles/service/dashboard/dashboard'
import { IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'
import { getPercentage } from '../issuespace/milestone'

interface IMilestoneViewProps {}

function MilestoneView(props: IMilestoneViewProps) {
  const {} = props
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const ws: any = useWs()

  const getMilestone = () => {
    if (ws !== undefined && ws.readyState === WebSocket.CONNECTING) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'getMilestone',
        })
      )
    }
  }

  const mileWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone':
          setMileList(message.data)
          break
        default:
      }
    }
  }

  const handleLinkMilestone = () => {}

  useEffect(() => {
    ws.addEventListener('message', mileWebSocketHandler)
    getMilestone()
    return () => {
      ws.removeEventListener('message', mileWebSocketHandler)
    }
  }, [])

  const classes = milestoneStyle()
  return (
    <div className={classes.milestone}>
      <div className={classes.title}>Milestone</div>
      <div className={classes.content}>
        {mileList.length > 0 ? (
          mileList.map((v: any, idx: number) => {
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
