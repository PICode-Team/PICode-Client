import { useRouter } from 'next/router'
import { issueDetailStyle } from '../../../styles/service/issuespace/issue'

function IssueDetail() {
  const classes = issueDetailStyle()
  const router = useRouter()
  const { issueUUID } = router.query

  return (
    <div className={classes.detail}>
      <div className={classes.header}>
        <div>
          <span className={classes.title}>Failing to connect web socket, nothing comes out.</span>
          <span className={classes.issueNumber}>#17</span>
        </div>
        <div>
          <span className={classes.activeStatus}>Open</span>
          <span className={classes.creation}>wlsrn3684 opened this issue 19 hours ago</span>
        </div>
      </div>

      <div className={classes.wrapper}>
        <div className={classes.item}>
          <div className={classes.key}>Assignees</div>
          <div className={classes.value}></div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Labels</div>
          <div className={classes.value}></div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Kanban Board</div>
          <div className={classes.value}></div>
        </div>
        <div className={classes.item}>
          <div className={classes.key}>Milestone</div>
          <div className={classes.value}></div>
        </div>

        <div className={classes.divider} />

        <div className={classes.description}></div>
      </div>
    </div>
  )
}

export default IssueDetail
