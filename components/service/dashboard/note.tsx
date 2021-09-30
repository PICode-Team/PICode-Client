import React, { useEffect, useState } from 'react'
import { noteStyle } from '../../../styles/service/dashboard/dashboard'
import { IFileView } from '../../../types/note.types'
import { useWs } from '../../context/websocket'

interface INoteViewProps {}

function NoteView(props: INoteViewProps) {
  const {} = props
  const classes = noteStyle()
  const [fileView, setFileView] = useState<IFileView[]>([])
  const [userId, setUserId] = useState<string>('')
  const ws: any = useWs()

  const getDocument = () => {
    if (ws !== undefined && ws.readyState === WebSocket.CONNECTING) {
      ws.send(
        JSON.stringify({
          category: 'document',
          type: 'getDocument',
          data: {
            userId,
          },
        })
      )
    }
  }

  const noteWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'document') {
      switch (message.type) {
        case 'getDocument':
          setFileView(message.data)
          break
      }
    }
  }

  const handleLinkNote = () => {}

  useEffect(() => {
    const value = window.localStorage.getItem('userId')
    setUserId(value ?? '')

    ws.addEventListener('message', noteWebSocketHandler)
    getDocument()
    return () => {
      ws.removeEventListener('message', noteWebSocketHandler)
    }
  }, [])

  return (
    <div className={classes.note}>
      <div className={classes.title}>Note</div>
      <div className={classes.content}>
        {fileView.length > 0 ? (
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
