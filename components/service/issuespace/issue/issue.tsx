import { useState } from 'react'
import { useRouter } from 'next/router'

import { issueStyle } from '../../../../styles/service/issue'
import Col from './col'
import { IIssue } from '../../../../types/issue.types'

interface IIssueProps {}

function Issue(props: IIssueProps) {
  const {} = props
  const classes = issueStyle()
  const router = useRouter()
  const [col, setCol] = useState<string[]>([])
  const [issueList, setIssueList] = useState<IIssue[]>([])

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>{`${router.query!.projectName} / ${router.query!.kanban} Board`}</div>
      <div className={classes.content}>
        {col.map((v: string) => (
          <Col key={v} title={v} issueList={issueList} />
        ))}
      </div>
    </div>
  )
}

export default Issue
