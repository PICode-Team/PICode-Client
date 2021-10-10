import React, { useEffect, useState } from 'react'

import { Description, ExpandMoreRounded, Add } from '@material-ui/icons'
import { cloneDeep } from 'lodash'

import { IContextPosition, IFileView, INoteContent } from '../../../../types/note.types'
import { useWs } from '../../../context/websocket'
import { noteStyle } from '../../../../styles/service/notespace/note'
import AddFile from './addFile'
import { uuidv4 } from '../../../context/uuidv4'

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
  output: any
}

const findNode = (fileViews: IFileView[] | null, noteId: string) => {
  if (fileViews === null) return

  for (const fileView of fileViews) {
    if (fileView.noteId === noteId) {
      if (fileView.open) {
        fileView.open = false
      } else {
        fileView.open = true
      }
    }
  }
}

function Sidebar(props: INoteSidebar) {
  const { fileViewList, setFileViewList, setContentList, setAddFile, addFile, setSelectFile, setOpenContext, setContextPosition, contextPosition, output } = props
  const classes = noteStyle()
  const ws: any = useWs()

  const [userId, setUserId] = useState<string>('')

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  if (fileViewList === null) return <></>
  if (ws.readyState === WebSocket.CONNECTING) return <></>

  const pushToOutput = (path: string, splitedPath: string[], obj: any, value: any): any => {
    const clone = { ...value, children: {} }
    const pathList = path.split('/')
    const splicedPath = pathList.slice(0, pathList.length - splitedPath.length + 1)
    const parentPath = `${splicedPath.join('/')}`

    if (obj[path] === undefined) {
      obj[path] = clone
    }

    if (obj[path].children === undefined) {
      obj[path].children = {}
    }

    splitedPath.shift()

    if (splitedPath.length > 0) {
      return pushToOutput(path, splitedPath, obj[parentPath].children, clone)
    }
    obj[path] = clone
  }

  const updateNote = (noteId: string, path: string) => {
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

  const handleFileRowDragOver = (key: string) => () => {
    const node = document.getElementById(`${output[key].noteId}`)
    if (node) {
      node.style.border = '1px solid #fff'
    }
  }

  const handleFileRowDragLeave = (key: string) => (event: any) => {
    const node = document.getElementById(`${output[key].noteId}`)
    if (node) {
      node.style.border = '0px'
    }
  }

  const handleFileRowDragEnd = (key: string) => (event: any) => {
    if (fileViewList === undefined) return
    let dragEndNode: IFileView | undefined
    for (const fileView of fileViewList) {
      let node = document.getElementById(`${fileView.noteId}`)
      if (node !== null && node.getBoundingClientRect().top < event.clientY && node.getBoundingClientRect().bottom > event.clientY) {
        dragEndNode = fileView
        break
      }
    }

    if (dragEndNode === undefined) return

    const nodeGroup = fileViewList.filter((check) => {
      return check.path.includes(output[key].path)
    })

    for (const node of nodeGroup) {
      if (dragEndNode.path !== node.path) {
        const name = node.path.split('/')

        // updateNote(node.noteId, dragEndNode.path + '/' + name[name.length - 1])
        getNote()
      }
    }
  }

  const handleFileRowClick = (key: string) => (event: any) => {
    const tmpFileViewList = cloneDeep(fileViewList)
    findNode(tmpFileViewList, output[key].noteId)
    setFileViewList(tmpFileViewList)

    event.stopPropagation()
    const tmpFile: IFileView = {
      title: key,
      creator: output[key].creator,
      createTime: output[key].createTime,
      noteId: output[key].noteId,
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
      target: output[key].noteId,
      path: output[key].path,
    })
  }

  fileViewList.forEach((value: IFileView) => {
    const { path } = value
    const splitedPath = path.split('/')

    splitedPath.splice(0, 1)

    pushToOutput(path, splitedPath, output, value)
  })

  const makeFileView = (output: any, num: number, parent: string): JSX.Element => {
    if (Object.keys(output).length === 0) {
      if (parent === contextPosition.target && addFile === true) {
        return <React.Fragment></React.Fragment>
      }

      return (
        <div className={classes.fileRow} key={`empty-${uuidv4()}`} style={{ paddingLeft: `${16 * num + 4}px` }}>
          <div className={classes.key}>No pages inside</div>
        </div>
      )
    }

    return (
      <React.Fragment>
        {Object.keys(output).map((v: string, idx: number) => {
          if (v.split('/').length - 1 !== num) return
          const splitedPath = v.split('/')
          const lastPath = splitedPath[splitedPath.length - 1]

          return (
            <React.Fragment key={output[v].noteId}>
              <div
                className={classes.fileRow}
                draggable={true}
                id={output[v].noteId}
                onDragOver={handleFileRowDragOver(v)}
                onDragLeave={handleFileRowDragLeave(v)}
                onDragEnd={handleFileRowDragEnd(v)}
                style={{ paddingLeft: `${16 * num}px` }}
                onClick={handleFileRowClick(v)}
                onContextMenu={handleFileRowContextMenu(v)}
              >
                <ExpandMoreRounded style={{ transform: `${output[v].open === undefined || !output[v].open ? 'rotate(-90deg)' : 'rotate(0deg)'}` }} />
                <Description className={classes.description} />
                <div className={classes.key}>{lastPath}</div>
              </div>
              {output[v].open && makeFileView(output[v].children, num + 1, v)}
              {addFile && contextPosition.target === output[v].noteId && <AddFile setAddFile={setAddFile} contextPosition={contextPosition} fileViewList={fileViewList} />}
            </React.Fragment>
          )
        })}
      </React.Fragment>
    )
  }

  return (
    <>
      {makeFileView(output, 1, '')}
      {addFile && contextPosition.target === '' && <AddFile setAddFile={setAddFile} fileViewList={fileViewList} />}
    </>
  )
}

export default Sidebar
