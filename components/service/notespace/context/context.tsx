import React, { useEffect, useState } from 'react'
import { Delete, Add } from '@material-ui/icons'

import { noteStyle } from '../../../../styles/service/notespace/note'
import { useWs } from '../../../context/websocket'
import { IContextPosition, IFileView } from '../../../../types/note.types'

interface INoteContextProps {
  contextPosition: IContextPosition
  setOpenContext: React.Dispatch<React.SetStateAction<boolean>>
  setSelectFile: React.Dispatch<React.SetStateAction<IFileView | null>>
  fileViewList: IFileView[] | null
  setAddFile: React.Dispatch<React.SetStateAction<boolean>>
}

function Context(props: INoteContextProps) {
  const { contextPosition, setOpenContext, setSelectFile, fileViewList, setAddFile } = props
  const classes = noteStyle()
  const [userId, setUserId] = useState<string>('')
  const ws: any = useWs()

  if (ws?.readyState === WebSocket.CONNECTING) return <></>

  const deleteNote = (noteId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'note',
          type: 'deleteNote',
          data: {
            noteId,
          },
        })
      )
      ws.send(
        JSON.stringify({
          category: 'note',
          type: 'getNote',
          data: {
          },
        })
      )
    }
  }

  const getNote = (noteId?: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'note',
          type: 'getNote',
          data: {
            noteId,
          },
        })
      )
    }
  }

  const handleClickContext = (event: any) => {
    event.stopPropagation()
    event.preventDefault()
  }

  const handleContextMenu = (event: any) => {
    event.preventDefault()
  }

  const handleNewFileClick = () => {
    setAddFile(true)
    setOpenContext(false)
  }

  const handleDeleteClick = (event: any) => {
    event.stopPropagation()
    setOpenContext(false)
    if (fileViewList === null) return

    const node = fileViewList.find((v) => v.noteId === contextPosition.target)
    if (node !== undefined) {
      for (const fileView of fileViewList) {
        if (fileView.path.includes(node.path)) {
          deleteNote(fileView.noteId)
        }
      }
    }
    getNote()
    setSelectFile(null)
  }

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  return (
    <div onClick={handleClickContext} onContextMenu={handleContextMenu} className={classes.contextWrapper} style={{ left: contextPosition.x, top: contextPosition.y - 40 }}>
      <div className={classes.contextRow} onClick={handleNewFileClick}>
        <span>New File</span> <Add className={classes.contextIcon} />
      </div>
      <div className={classes.contextRow} onClick={handleDeleteClick}>
        <span>Delete</span> <Delete className={classes.contextIcon} />
      </div>
    </div>
  )
}

export default Context
