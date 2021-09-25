import { useState } from 'react'
import { useRouter } from 'next/router'

import { issueStyle } from '../../../../styles/service/issue'
import Col from './col'
import { IIssue } from '../../../../types/issue.types'
import CreateIssue from '../create/issue'

interface IIssueProps {}

function Issue(props: IIssueProps) {
  const {} = props
  const classes = issueStyle()
  const router = useRouter()
  const [col, setCol] = useState<string[]>([])
  const [issueList, setIssueList] = useState<IIssue[]>([])
  const [modal, setModal] = useState<boolean>(false)

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{`${router.query!.projectName} / ${router.query!.kanban} Board`}</div>
      <div className={classes.content}>
        {col.map((v: string) => (
          <Col key={v} title={v} issueList={issueList} />
        ))}
      </div>
      <CreateIssue modal={modal} setModal={setModal} />
    </div>
  )
}

export default Issue
