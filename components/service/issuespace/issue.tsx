import { CheckCircleOutlineRounded } from '@material-ui/icons'
import { useState } from 'react'
import { issueTableStyle } from '../../../styles/service/issuespace/issue'
import { IIssue } from '../../../types/issue.types'
import CustomCheckbox from '../../items/input/checkbox'

interface IIssueProps {
  issueList: IIssue[] | null
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setModalIssue: React.Dispatch<React.SetStateAction<IIssue | null>>
}

function Issue(props: IIssueProps) {
  const { issueList, setModal, setModalIssue } = props
  const classes = issueTableStyle()
  const [activeStatus, setActiveStatus] = useState<boolean>(true)

  const handleActiveStatus = (status: boolean) => () => {
    setActiveStatus(status)
  }

  return (
    <div className={classes.issueTable}>
      <div className={classes.headerWrapper}>
        <div className={classes.leftHeader}>
          <div className={classes.checkbox}>
            <CustomCheckbox value={false} label="" />
          </div>
          <div className={`${activeStatus ? classes.active : classes.inactive}`} onClick={handleActiveStatus(true)}>
            Open
          </div>
          <div className={`${!activeStatus ? classes.active : classes.inactive}`} onClick={handleActiveStatus(false)}>
            Close
          </div>
        </div>

        <div className={classes.rightHeader}>
          <div className={classes.filterMenu}>Author</div>
          <div className={classes.filterMenu}>Label</div>
          <div className={classes.filterMenu}>Kanban</div>
          <div className={classes.filterMenu}>Milestones</div>
          <div className={classes.filterMenu}>Assignee</div>
          <div className={classes.filterMenu}>Sort</div>
        </div>
      </div>

      <div className={classes.bodyWrapper}>
        <div className={classes.checkbox}>
          <CustomCheckbox value={false} label="" />
        </div>
        <div className={classes.activeStatus}>
          <CheckCircleOutlineRounded
            style={{
              color: '#549F69',
            }}
          />
        </div>
        <div className={classes.content}></div>
        <div className={classes.assignee}></div>
      </div>
    </div>
  )
}

export default Issue