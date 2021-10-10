import { useWs } from '../../../context/websocket'

interface IMentionHelperProps {}

function MentionHelper(props: IMentionHelperProps) {
  const {} = props
  const ws: any = useWs()

  const createAlarm = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'alarm',
          type: 'createAlarm',
          data: {},
        })
      )
    }
  }

  return <div></div>
}

export default MentionHelper
