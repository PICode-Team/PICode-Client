import React, { useEffect, useState } from 'react'

import { Description, ExpandMoreRounded, Add } from '@material-ui/icons'
import { cloneDeep } from 'lodash'

import { IContextPosition, IFileView, INoteContent } from '../../../../types/note.types'
import { useWs } from '../../../context/websocket'
import { noteStyle } from '../../../../styles/service/notespace/note'
import AddFile from './addFile'

interface INoteSidebar {
  fileViewList: IFileView[] | null
  addFile: boolean
  setFileViewList: React.Dispatch<React.SetStateAction<IFileView[] | null>>
  setContentList: React.Dispatch<React.SetStateAction<INoteContent[]>>
  setAddFile: React.Dispatch<React.SetStateAction<boolean>>
  setSelectFile: React.Dispatch<React.SetStateAction<IFileView | null>>
  setOpenContext: React.Dispatch<React.SetStateAction<boolean>>
  setContextPosition: React.Dispatch<React.SetStateAction<IContextPosition>>
  contextPosition: IContextPosition
}

const findNode = (fileViews: IFileView[] | null, documentId: string) => {
  if (fileViews === null) return
  for (const fileView of fileViews) {
    if (fileView.noteId === documentId) {
      if (fileView.open) {
        fileView.open = false
      } else {
        fileView.open = true
      }
    }
  }
}

function Sidebar(props: INoteSidebar) {
  const { fileViewList, setFileViewList, setContentList, setAddFile, addFile, setSelectFile, setOpenContext, setContextPosition, contextPosition } = props
  const classes = noteStyle()
  const ws: any = useWs()
  const output: any = {}
  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  if (fileViewList === null) return <></>
  if (ws.readyState === WebSocket.CONNECTING) return <></>

  const pushToOutput = (path: any, obj: any, value: any): any => {
    const clone = { ...value }
    const key = path[0]
    if (obj[key] === undefined) {
      obj[key] = clone
      obj[key].children = {}
    }
    path.shift()
    if (path.length > 0) {
      return pushToOutput(path, obj[key].children, clone)
    }
    obj[key] = clone
  }

  const updateDocument = (noteId: string, path: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'note',
          type: 'updateNote',
          data: {
            noteId,
            note: {
              path,
            },
          },
        })
      )
    }
  }

  const getDocument = (userId: string) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
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

  const handleFileRowDragOver = (key: string) => () => {
    const node = document.getElementById(`${output[key].documentId}`)
    if (node) {
      node.style.border = '1px solid #fff'
    }
  }

  const handleFileRowDragLeave = (key: string) => (event: any) => {
    const node = document.getElementById(`${output[key].documentId}`)
    if (node) {
      node.style.border = '0px'
    }
  }

  const handleFileRowDragEnd = (key: string) => (event: any) => {
    if (fileViewList === undefined) return
    let dragEndNode: any
    for (let i of fileViewList) {
      let node = document.getElementById(`${i.noteId}`)
      if (node !== null && node.getBoundingClientRect().top < event.clientY && node.getBoundingClientRect().bottom > event.clientY) {
        dragEndNode = i
        break
      }
    }
    if (dragEndNode === undefined) return
    const nodeGroup = fileViewList.filter((check) => {
      return check.path.includes(output[key].path)
    })
    for (const node of nodeGroup) {
      const name = node.path.split('/')
      updateDocument(node.noteId, dragEndNode.path + '/' + name[name.length - 1])
      getDocument(userId)
    }
  }

  const handleFileRowClick = (key: string) => (event: any) => {
    if (Object.keys(output[key].children).length !== 0) {
      const tmpFileViewList = cloneDeep(fileViewList)
      findNode(tmpFileViewList, output[key].documentId)
      setFileViewList(tmpFileViewList)
    }
    event.stopPropagation()
    const tmpFile: IFileView = {
      title: key,
      creator: output[key].creator,
      createTime: output[key].createTime,
      noteId: output[key].documentId,
      path: output[key].path,
    }
    setSelectFile(tmpFile)
    if (output[key].content) {
      setContentList(output[key].content)
    } else {
      setContentList([])
    }
  }

  const handleFileRowContextMenu = (key: string) => (event: any) => {
    event.preventDefault()
    setOpenContext(true)
    setContextPosition({
      x: event.currentTarget.getBoundingClientRect().left + event.currentTarget.getBoundingClientRect().width / 4,
      y: event.currentTarget.getBoundingClientRect().top - 35,
      target: output[key].documentId,
      path: output[key].path,
    })
  }

  fileViewList.forEach((value: any) => {
    const path = value.path.split('/')
    path.splice(0, 1)
    pushToOutput(path, output, value)
  })

  const makeFileView = (output: any, num: number): any => {
    return (
      <>
        {Object.keys(output).map((v: string, idx: number) => {
          return (
            <>
              <div
                className={classes.fileRow}
                draggable={true}
                key={idx}
                id={output[v].documentId}
                onDragOver={handleFileRowDragOver(v)}
                onDragLeave={handleFileRowDragLeave(v)}
                onDragEnd={handleFileRowDragEnd(v)}
                style={{ paddingLeft: `${16 * num}px` }}
                onClick={handleFileRowClick(v)}
                onContextMenu={handleFileRowContextMenu(v)}
              >
                {Object.keys(output[v].children).length > 0 && <ExpandMoreRounded style={{ transform: `${output[v].open === undefined || !output[v].open ? 'rotate(-90deg)' : 'rotate(0deg)'}` }} />}
                <Description style={{ height: '20px', marginLeft: `${Object.keys(output[v].children).length > 0 ? 0 : '5px'}` }} />
                <div className={classes.key}>{v}</div>
              </div>
              {output[v].open !== undefined && output[v].open && makeFileView(output[v].children, num + 1)}
              {addFile && contextPosition.target === output[v].documentId && <AddFile setAddFile={setAddFile} contextPosition={contextPosition} fileViewList={fileViewList} />}
            </>
          )
        })}
      </>
    )
  }

  return (
    <>
      {makeFileView(output, 1)}
      {addFile && contextPosition.target === '' && <AddFile setAddFile={setAddFile} fileViewList={fileViewList} />}
    </>
  )
}

export default Sidebar
