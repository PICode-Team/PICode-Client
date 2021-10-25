import React, { useEffect, useState } from 'react'
import { milestoneStyle } from '../../../styles/service/dashboard/dashboard'
import { IMilestone } from '../../../types/issue.types'
import { useWs } from '../../context/websocket'
import { getPercentage } from '../issuespace/milestone'

interface IMilestoneViewProps {}

function MilestoneView(props: IMilestoneViewProps) {
  const {} = props
  const classes = milestoneStyle()
  const [mileList, setMileList] = useState<IMilestone[] | null>(null)
  const ws: any = useWs()

  const getMilestone = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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

  const handleLinkMilestone = () => {
    window.location.href = '/issuespace?type=Milestone'
  }

  useEffect(() => {
    ws.addEventListener('message', mileWebSocketHandler)
    getMilestone()
    return () => {
      ws.removeEventListener('message', mileWebSocketHandler)
    }
  }, [ws?.readyState])

  useEffect(() => {
    setTimeout(() => {
      if (mileList === null) {
        setMileList([])
      }
    }, 100)
  }, [])

  return (
    <div className={classes.milestone}>
      <div className={classes.title}>Milestone</div>
      <div className={classes.content}>
        {mileList !== null && mileList.length > 0 ? (
          mileList.map((v: any, idx: number) => (
            <div className={classes.card} key={v.uuid} onClick={handleLinkMilestone}>
              <div className={classes.top}>
                <div className={classes.mileTitle}>{v.title}</div>
                <div className={classes.topWrapper}></div>
              </div>
              <div className={classes.bottom}>
                <div className={classes.percentage}>
                  <div className={classes.gauge} style={{ width: `${getPercentage(v.startDate, v.endDate)}%` }}></div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className={classes.empty}>this server has no milestone</div>
        )}
      </div>
    </div>
  )
}

export default MilestoneView
