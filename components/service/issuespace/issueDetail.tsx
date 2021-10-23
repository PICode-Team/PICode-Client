import { useRouter } from 'next/router'
import { issueDetailStyle } from '../../../styles/service/issuespace/issue'

function IssueDetail() {
  const classes = issueDetailStyle()
  const router = useRouter()
  const { issueUUID } = router.query

  return (
    <div>
      <div>Failing to connect web socket, nothing comes out. #17 Open wlsrn3684 opened this issue 19 hours ago · 0 comments</div>
    </div>
  )
}

export default IssueDetail
