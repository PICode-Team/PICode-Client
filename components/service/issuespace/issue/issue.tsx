import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'

import { issueStyle } from '../../../../styles/service/issuespace/issue'
import { IIssue, IKanban, IMilestone } from '../../../../types/issue.types'
import { ArrowBackIos } from '@material-ui/icons'
import { useWs } from '../../../context/websocket'
import CreateIssue from '../create/issue'
import Col from './col'
interface IIssueProps {}

function Issue(props: IIssueProps) {
  const {} = props
  const classes = issueStyle()
  const [issueList, setIssueList] = useState<IIssue[] | null>(null)
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const [columnList, setColumnList] = useState<string[]>([])
  const [modal, setModal] = useState<boolean>(false)
  const [kanban, setKanban] = useState<string>('')
  const [name, setName] = useState<string>('')
  const [column, setColumn] = useState<string>('')
  const router = useRouter()
  const { workspaceId, kanbanUUID } = router.query
  const ws: any = useWs()

  const getKanban = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'kanban',
          type: 'getKanban',
          data: {},
        })
      )
    }
  }

  const getMilestone = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'milestone',
          type: 'getMilestone',
          data: {},
        })
      )
    }
  }

  const getIssue = (kanban: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'issue',
          type: 'getIssue',
          data: {
            kanbanUUID: kanban,
            options: {},
          },
        })
      )
    }
  }

  const issueWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)
    if (message.category === 'kanban') {
      switch (message.type) {
        case 'getKanban':
          const node = message.data.kanbans.find((v: IKanban) => v.uuid === router.query.kanbanUUID)

          setKanban(node.uuid)
          setColumnList(node.columns)
          setName(node.title)
          break
        default:
      }
    } else if (message.category === 'milestone') {
      switch (message.type) {
        case 'getMilestone':
          setMileList(message.data)
          break
        default:
      }
    } else if (message.category === 'issue') {
      switch (message.type) {
        case 'getIssue':
          setIssueList(message.data.issues)
          break
        case 'createIssue':
        case 'updateIssue':
          getIssue(kanban)
          break
      }
    }
  }

  const handleLinkKanban = () => {
    window.location.href = `/issuespace?workspaceId=${router.query.workspaceId}`
  }

  useEffect(() => {
    ws.addEventListener('message', issueWebSocketHandler)
    getKanban()
    getMilestone()

    return () => {
      ws.removeEventListener('message', issueWebSocketHandler)
    }
  }, [ws?.readyState, kanban])

  useEffect(() => {
    getIssue(kanban)
  }, [kanban])

  useEffect(() => {
    if (issueList === null) {
      setTimeout(() => {
        setIssueList([])
      }, 100)
    }
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}>
        <span className={classes.back} onClick={handleLinkKanban}>
          <ArrowBackIos />
        </span>
        {`${name === '' ? 'Kanban' : name} Board`}
      </div>
      <div className={classes.content}>
        {issueList !== null &&
          columnList.map((v: string) => <Col key={v} title={v} issueList={issueList} setModal={setModal} setColumn={setColumn} columnList={columnList} kanbanUUID={kanbanUUID as string} />)}
      </div>
      <CreateIssue modal={modal} setModal={setModal} kanbanUUID={kanbanUUID as string} mileList={mileList} column={column} workspaceId={workspaceId as string} />
    </div>
  )
}

export default Issue
