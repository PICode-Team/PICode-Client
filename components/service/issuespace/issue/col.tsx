import { Add } from '@material-ui/icons'

import { colStyle } from '../../../../styles/service/issuespace/issue'
import { IIssue } from '../../../../types/issue.types'
import { uuidv4 } from '../../../context/uuidv4'
import Card from './card'

interface IColProps {
  title: string
  issueList: IIssue[]
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  setColumn: React.Dispatch<React.SetStateAction<string>>
  columnList: string[]
  kanbanUUID: string
}

function Col(props: IColProps) {
  const { title, issueList, setModal, setColumn, columnList, kanbanUUID } = props
  const classes = colStyle()

  const handleAddIssue = () => {
    setColumn(title)
    setModal(true)
  }

  return (
    <div id={title} className={classes.column}>
      <div className={classes.header}>
        <div className={classes.headerWrapper}>
          <div className={classes.headerInfoBox}>
            <div className={classes.title}>{title}</div>
            <div className={classes.issueCount}>
              last {issueList.filter((v) => title === v.column).length}
              issue
            </div>
          </div>
          <div className={classes.iconWrapper}>
            <div className={classes.icon} onClick={handleAddIssue}>
              <Add className={classes.add} />
            </div>
          </div>
        </div>
      </div>
      <div className={classes.issueWrapper}>
        {issueList.map((issue) => {
          if (title === issue.column) {
            return <Card key={`issue-item-${uuidv4()}`} issue={issue} columnList={columnList} kanbanUUID={kanbanUUID} />
          }
        })}
      </div>
    </div>
  )
}

export default Col
