import React, { useEffect, useState } from 'react'
import { noteStyle } from '../../../styles/service/dashboard/dashboard'
import { IFileView } from '../../../types/note.types'
import { useWs } from '../../context/websocket'

interface INoteViewProps { }

function NoteView(props: INoteViewProps) {
  const { } = props
  const classes = noteStyle()
  const [fileView, setFileView] = useState<IFileView[] | null>(null)
  const [userId, setUserId] = useState<string>('')
  const [wsCheck, setWsCheck] = useState<number>(0)
  const ws: any = useWs()

  const getNote = () => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'note',
          type: 'getNote',
          data: {
            userId,
          },
        })
      )
    }
  }

  const noteWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'note') {
      switch (message.type) {
        case 'getNote':
          setFileView(message.data)
          break
      }
    }
  }

  const handleLinkNote = () => {
    window.location.href = '/notespace/'
  }

  useEffect(() => {
    const value = window.localStorage.getItem('userId')
    setUserId(value ?? '')
  }, [])

  useEffect(() => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', noteWebSocketHandler)
      getNote()
      return () => {
        ws.removeEventListener('message', noteWebSocketHandler)
      }
    } else {
      setTimeout(() => {
        setWsCheck(wsCheck + 1)
      }, 100)
    }
  }, [])

  return (
    <div className={classes.note}>
      <div className={classes.title}>Note</div>
      <div className={classes.content}>
        {fileView !== null && fileView.length > 0 ? (
          fileView.map((v, i) => {
            const pathList = v.path.split('/')
            const fileName = pathList[pathList.length - 1]
            return (
              <div key={`dashboard-file-viwe-${i}`} className={classes.card} onClick={handleLinkNote}>
                <div>
                  <span>{fileName} is created</span>
                </div>
                <div>
                  <span>{v.createTime}</span>
                </div>
              </div>
            )
          })
        ) : (
          <div className={classes.empty}>this server has no document</div>
        )}
      </div>
    </div>
  )
}

export default NoteView
