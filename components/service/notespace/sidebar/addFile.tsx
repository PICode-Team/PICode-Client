import React, { useEffect, useState } from 'react'

import { IconButton } from '@material-ui/core'
import { Delete } from '@material-ui/icons'

import { IFileView } from '../../../../types/note.types'
import { noteStyle } from '../../../../styles/service/notespace/note'
import { useWs } from '../../../context/websocket'

interface IAddInput {
  setAddFile: React.Dispatch<React.SetStateAction<boolean>>
  contextPosition?: {
    x: number
    y: number
    target: string
    path: string
  }
  fileViewList: IFileView[]
}

function AddFile(props: IAddInput) {
  const { setAddFile, contextPosition, fileViewList } = props
  const classes = noteStyle()
  const [tmpFileName, setTmpFileName] = useState<string>('')
  const [userId, setUserId] = useState<string>('')
  const ws: any = useWs()

  const createDocument = (path: string, creator: string, content: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'document',
          type: 'createDocument',
          data: {
            path,
            creator,
            content,
          },
        })
      )
    }
  }

  const getDocument = (userId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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

  const handlefileRowBlur = (event: any) => {
    setAddFile(false)
    if (event.target.value === '') return
    if (contextPosition !== undefined) {
      if (fileViewList?.find((v) => v.path === `${contextPosition!.path}/${event.target.value}`)) {
        return
      }
    } else {
      if (fileViewList?.find((v) => v.path === `/${event.target.value}`)) {
        return
      }
    }

    setTmpFileName(event.target.value)
    if (contextPosition !== undefined) {
      createDocument(`${contextPosition.path}/${event.target.value}`, userId, '')
    } else {
      createDocument(`/${event.target.value}`, userId, '')
    }
    getDocument(userId)
  }

  const handleFileRowKeyDown = (event: any) => {
    if (event.code === 'Enter') {
      setAddFile(false)
      if (event.target.value === '') return
      if (contextPosition !== undefined) {
        if (fileViewList?.find((v) => v.path === `${contextPosition!.path}/${event.target.value}`)) {
          return
        }
      } else {
        if (fileViewList?.find((v) => v.path === `/${event.target.value}`)) {
          return
        }
      }

      setTmpFileName(event.target.value)
      if (contextPosition !== undefined) {
        createDocument(`${contextPosition.path}/${event.target.value}`, userId, '')
      } else {
        createDocument(`/${event.target.value}`, userId, '')
      }
      getDocument(userId)
    }
  }

  const handleDeleteClick = (event: any) => {
    event.stopPropagation()
    setAddFile(false)
  }

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  if (contextPosition === undefined) return <></>

  return (
    <div className={classes.fileRow}>
      <input placeholder={'untitled'} autoFocus onBlur={handlefileRowBlur} onKeyDown={handleFileRowKeyDown} />
      <IconButton className={classes.delete} onClick={handleDeleteClick}>
        <Delete className={classes.buttonColor} />
      </IconButton>
    </div>
  )
}

export default AddFile
