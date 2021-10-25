import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { clone, cloneDeep } from 'lodash'

import { IconButton } from '@material-ui/core'
import { DragIndicator, Add } from '@material-ui/icons'

import NoteContext from './context/context'
import NoteSidebar from './sidebar/sidebar'
import { noteStyle } from '../../../styles/service/notespace/note'
import { IContextPosition, IFileView, INoteContent, IPosition } from '../../../types/note.types'
import { useWs } from '../../context/websocket'
import DrawDiagram from './content/diagram'
import { fetchSet } from '../../context/fetch'

const initialPositionState: IPosition = {
  x: 0,
  y: 0,
  target: 0,
}

const initialContextPositionState: IContextPosition = {
  x: 0,
  y: 0,
  target: '',
  path: '',
}

interface INoteProps {}

function Note(props: INoteProps) {
  const {} = props
  const classes = noteStyle()
  const [contentList, setContentList] = useState<INoteContent[]>([])
  const [contextPosition, setContextPosition] = useState<IContextPosition>(initialContextPositionState)
  const [position, setPosition] = useState<IPosition>(initialPositionState)
  const [fileViewList, setFileViewList] = useState<IFileView[] | null>(null)
  const [selectFile, setSelectFile] = useState<IFileView | null>(null)
  const [cursor, setCursor] = useState<string>('')
  const [drag, setDrag] = useState<string>('')
  const [tmpFileName, setTmpFileName] = useState<string>('')
  const [highlight, setHighlight] = useState<number>()
  const [show, setShow] = useState<boolean>(false)
  const [dragEnd, setDragEnd] = useState<boolean>(false)
  const [addFile, setAddFile] = useState<boolean>(false)
  const [openContext, setOpenContext] = useState<boolean>(false)
  const [openNum, setOpenNum] = React.useState<number>(0)
  const ws: any = useWs()
  const output: any = {}

  let tmpPosition: any = []

  const noteWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'note') {
      switch (message.type) {
        case 'getNote':
          if (Object.keys(output).length !== 0 && message.data.length === 1) {
            const [note]: IFileView[] = message.data

            if (note === undefined) return

            const splitedPath = note.path.split('/')
            splitedPath.splice(0, 1)

            pushToOutput(note.path, splitedPath, output, note)
            setFileViewList([...(fileViewList ?? []), note])
          } else {
            setFileViewList(message.data)
          }
          break
        case 'updateNote':
          break
        case 'deleteNote':
          break
        case 'createNote':
          getNote(message.data.noteId)
          break
      }
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

  const updateNote = (noteId: string, content: INoteContent[]) => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'note',
          type: 'updateNote',
          data: {
            noteId,
            note: {
              content,
            },
          },
        })
      )
    }
  }

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

  const handleSelectFileChange = (event: any) => {
    if (selectFile === null) return

    setSelectFile({ ...selectFile, [event.target.id]: event.target.value })
  }

  const handleCtrlZ = (event: any) => {
    if (event.keyCode == 90 && event.ctrlKey) alert('Ctrl+z')
  }

  const handleClickContent = () => {
    const tmpContent = cloneDeep(contentList)
    if (show) {
      setShow(false)
    }
    if (tmpContent.length > 0 && tmpContent[tmpContent.length - 1].text === '') {
      document.getElementById(String(tmpContent.length - 1))?.focus()
      return
    }
    tmpContent.push({
      text: '',
    })
    setContentList(tmpContent)
    setCursor(String(tmpContent.length - 1))
  }

  const handleClickSetting = () => {
    const leftTool = document.getElementById(`${position.target}tool`)
    const content = document.getElementById(`${position.target}`)
    if (leftTool) {
      leftTool.style.top = '17px'
    }
    const tmpContent = cloneDeep(contentList)
    tmpContent[position.target].text = ''
    tmpContent[position.target].type = 'h1Input'
    if (content) {
      content.innerText = ''
    }
    setContentList(tmpContent)
  }

  const handleContentClick = (event: any) => {
    event.stopPropagation()
  }

  const handleContentMouseOver = (index: number) => (event: any) => {
    const tool = document.getElementById(`${index}tool`)
    if (tool) {
      tool.style.visibility = 'visible'
    }
  }

  const handleContentMouseOut = (index: number) => (event: any) => {
    const tool = document.getElementById(`${index}tool`)
    if (tool) {
      tool.style.visibility = 'hidden'
    }
  }

  const handleContentDragStart = (index: number) => (event: any) => {
    event.stopPropagation()
    const textNode = document.getElementById(`${index}`)
    if (textNode) {
      if (event.clientX > textNode.getBoundingClientRect().left) {
        event.preventDefault()
      }
    }
    setDrag(event.currentTarget.id)
    for (const line in contentList) {
      const node = document.getElementById(`${line}`)
      if (node) {
        tmpPosition.push(node.getBoundingClientRect().bottom)
      }
    }
  }

  const handleContentBlur = (index: number) => (event: any) => {
    const tmpContent = cloneDeep(contentList)
    tmpContent[index].clicked = false
    setHighlight(undefined)
    setContentList(tmpContent)
  }

  const handleContentMouseUpCapture = (content: INoteContent, index: number) => (event: any) => {
    const nodePosition = document.getElementById(`${index}`)
    const tmpContent = cloneDeep(contentList)
    if (highlight !== undefined) {
      if (tmpContent[highlight]) {
        tmpContent[highlight].clicked = false
      }
    }
    if (window && nodePosition) {
      if (window.getSelection()?.toString() === content.text && event.clientX < nodePosition.getBoundingClientRect().left) {
        tmpContent[index].clicked = true
        setHighlight(index)
      }
    }
    setContentList(tmpContent)
  }

  const handleContentDragOver = (index: number) => (event: any) => {
    const node = document.getElementById(`${index}`)
    if (node) {
      node.style.borderTop = '1px solid #fff'
    }
  }

  const handleContentDragLeave = (index: number) => (event: any) => {
    const node = document.getElementById(`${index}`)
    if (node) {
      node.style.borderTop = '0px'
    }
  }

  const handleContentDragEnd = (event: any) => {
    let tmpContent = cloneDeep(contentList)
    let tmpNode: any = tmpContent.splice(Number(drag), 1)
    let lastCheck = true
    for (const key in tmpPosition) {
      if (tmpPosition[key] > event.clientY) {
        tmpContent.splice(Number(key) - 1, 0, tmpNode[0])
        setContentList(tmpContent)
        lastCheck = false
        setDragEnd(true)
        return
      }
    }
    if (lastCheck) {
      tmpContent = tmpContent.concat(tmpNode)
      setContentList(tmpContent)
      setDragEnd(true)
    }
  }

  const handleDragIndicatorClick = (index: number) => () => {
    const tmpContent = cloneDeep(contentList)
    tmpContent[index].clicked = true
    setContentList(tmpContent)
  }

  const handleDragIndicatorMouseDown = () => {}

  const handleAddClick = (index: number) => () => {
    const tool = document.getElementById(`${index}tool`)
    if (tool) {
      setPosition({
        x: tool.getBoundingClientRect().left - 10,
        y: tool.getBoundingClientRect().top - 50,
        target: index,
      })
      setShow(true)
    }
  }

  const handleWriteSelect = (index: number) => (event: any) => {
    const node = document.getElementById(`${index}`)
    if (node) {
      node?.setAttribute('placeholder', 'Plz Input Text')
    }
  }

  const handleWriteBlur = (index: number) => (event: any) => {
    const node = document.getElementById(`${index}`)
    if (node) {
      node?.setAttribute('placeholder', '')
    }
  }

  const handleWriteInput = (index: number) => (event: any) => {
    const tmpContent = cloneDeep(contentList)
    tmpContent[index].text = event.currentTarget.textContent ?? ''
    setContentList(tmpContent)
  }

  const handleWriteKeyDown = (content: INoteContent, index: number) => (event: any) => {
    if (event.key === 'Enter') {
      event.preventDefault()
      if (event.currentTarget.textContent === '/h1') {
        let leftTool = document.getElementById(`${index}tool`)
        if (leftTool) {
          leftTool.style.top = '17px'
        }
        let tmpContent = cloneDeep(contentList)
        tmpContent[index].text = ''
        tmpContent[index].type = 'h1Input'
        event.currentTarget.textContent = ''
        setContentList(tmpContent)
      } else {
        let tmpContent = cloneDeep(contentList)
        tmpContent.splice(index + 1, 0, { text: '' })
        setContentList(tmpContent)
        setCursor(String(index + 1))
      }
    } else if (event.key === 'Backspace') {
      if (event.currentTarget.textContent === '') {
        event.preventDefault()
        if (content.type !== undefined) {
          let tmpContent = cloneDeep(contentList)
          tmpContent[index].type = undefined
          let leftTool = document.getElementById(`${index}tool`)
          if (leftTool) {
            leftTool.style.top = '0px'
          }
          setContentList(tmpContent)
        } else {
          let tmpContent = cloneDeep(contentList)
          tmpContent.splice(index, 1)
          setContentList(tmpContent)
          setCursor(String(index - 1))
        }
      } else {
        let tmpContent = cloneDeep(contentList)
        tmpContent[index].text = tmpContent[index].text.slice(0, -1)
        setContentList(tmpContent)
      }
    } else if (event.key === 'ArrowDown') {
      if (document.getElementById(`${index + 1}`) === null) return
      document.getElementById(`${index + 1}`)?.focus()
    } else if (event.key === 'ArrowUp') {
      if (index === 0) return
      document.getElementById(`${index - 1}`)?.focus()
    }
  }

  const handleAddFileClick = () => {
    setAddFile(true)
  }

  const getLastPath = (path: string) => {
    const splitedPath = path.split('/')
    return splitedPath[splitedPath.length - 1]
  }

  useEffect(() => {
    if (fileViewList === null) return
    if (openNum < 0) return

    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', noteWebSocketHandler)
      getNote()
      setOpenNum(-1)
    } else {
      setTimeout(() => {
        setOpenNum(openNum + 1)
      }, 100)
    }
  }, [openNum])

  useEffect(() => {
    setTimeout(() => {
      if (fileViewList === null) {
        setFileViewList([])
      }
    }, 100)
  }, [])

  useEffect(() => {
    if (selectFile === null) return

    // updateNote(selectFile.noteId, contentList)
  }, [contentList])

  useEffect(() => {
    if (tmpFileName === '') return
    if (fileViewList === null) return

    const selectNode = fileViewList.find((v: any) => {
      const tmpFile = v.path.split('/')
      const name = tmpFile[tmpFile.length - 1]
      if (name === tmpFileName) {
        setTmpFileName('')
        return true
      }
    })

    if (selectNode === undefined) return
    setSelectFile(selectNode)
  }, [fileViewList])

  useEffect(() => {
    if (cursor === '') return

    document.getElementById(cursor)?.focus()
  }, [cursor])

  useEffect(() => {
    if (!dragEnd) return

    for (const i in contentList) {
      const node = document.getElementById(`${i}`)
      if (node !== null) {
        node.innerText = contentList[i].text
      }
    }

    setHighlight(undefined)
    setDragEnd(false)
  }, [dragEnd])

  useEffect(() => {
    if (selectFile === null || fileViewList === null) return
    if (selectFile.noteId === undefined && selectFile.path === '') return
    const path = selectFile?.path.split('/')
    if (selectFile.title === undefined) {
      setSelectFile({ ...selectFile, title: path[path.length - 1] })
      return
    }
    path[path?.length - 1] = selectFile?.title
    let tmpResult = []
    for (let i of fileViewList) {
      let node = fileViewList?.find((v) => v.noteId === i.noteId)
      if (node !== undefined) {
        if (node.open) {
          let tmpNode = node
          tmpNode.content = i.content
          tmpNode.path = i.path
          tmpResult.push(tmpNode)
        } else {
          tmpResult.push(i)
        }
      }
    }
    setFileViewList(tmpResult)

    for (let i in contentList) {
      let node = document.getElementById(`${i}`)
      if (node) {
        node.innerText = contentList[i].text
      }
    }
  }, [selectFile])

  return (
    <div
      className={classes.note}
      onClick={() => {
        setOpenContext(false)
        setContextPosition({
          x: 0,
          y: 0,
          target: '',
          path: '',
        })
      }}
    >
      <div className={classes.fileView}>
        <div className={classes.fileEdit}>
          <IconButton className={classes.addFile} onClick={handleAddFileClick}>
            <Add className={classes.buttonColor} />
          </IconButton>
        </div>
        {fileViewList !== null && (
          <NoteSidebar
            fileViewList={fileViewList}
            addFile={addFile}
            setFileViewList={setFileViewList}
            setContentList={setContentList}
            setAddFile={setAddFile}
            setSelectFile={setSelectFile}
            setOpenContext={setOpenContext}
            setContextPosition={setContextPosition}
            contextPosition={contextPosition}
            output={output}
          />
        )}
      </div>
      {selectFile !== null && (
        <div id="writeSomeThing" className={classes.content}>
          <div className={classes.title}>
            <div className={classes.titleContent}>
              <input id="title" className={clsx(classes.defaultTitle, classes.h1Input)} placeholder="title" onChange={handleSelectFileChange} value={getLastPath(selectFile.title)} />
              <input id="creator" className={clsx(classes.defaultTitle, classes.h2Input)} placeholder="author" onChange={handleSelectFileChange} value={selectFile.creator} />
              <input id="type" className={clsx(classes.defaultTitle, classes.h3Input)} placeholder="category" onChange={handleSelectFileChange} value={selectFile.type} />
              <input id="createTime" className={clsx(classes.defaultTitle, classes.h3Input)} placeholder="creation" onChange={handleSelectFileChange} value={selectFile.createTime} />
            </div>
          </div>
          {selectFile.path.split('/').some((v) => v.includes('.io')) ? (
            <div className={classes.drawRoot}>
              <DrawDiagram selectFile={selectFile} />
            </div>
          ) : (
            <div className={classes.writeRoot} onKeyDown={handleCtrlZ}>
              <div id="writeContent" className={classes.writeContent} onClick={handleClickContent}>
                {show && (
                  <div className={classes.settingTool} style={{ left: position.x, top: position.y }}>
                    <div className={classes.settingLine}>
                      <span>Title</span>
                      <button className={classes.settingButton} onClick={handleClickSetting}>
                        H1
                      </button>
                    </div>
                  </div>
                )}
                {contentList.map((v: INoteContent, i: number) => {
                  return (
                    <div
                      key={i}
                      draggable={true}
                      onClick={handleContentClick}
                      className={clsx(classes.contentWrapper, v.clicked && classes.clicked)}
                      onMouseOver={handleContentMouseOver(i)}
                      onMouseOut={handleContentMouseOut(i)}
                      onDragStart={handleContentDragStart(i)}
                      onBlur={handleContentBlur(i)}
                      onMouseUpCapture={handleContentMouseUpCapture(v, i)}
                      onDragOver={handleContentDragOver(i)}
                      onDragLeave={handleContentDragLeave(i)}
                      onDragEnd={handleContentDragEnd}
                    >
                      <div className={classes.leftTool} id={`${i}tool`}>
                        <IconButton className={classes.mouseOver} onClick={handleDragIndicatorClick(i)} onMouseDown={handleDragIndicatorMouseDown}>
                          <DragIndicator className={classes.iconButtonColor} />
                        </IconButton>
                        <IconButton className={classes.add} onClick={handleAddClick(i)}>
                          <Add className={classes.iconButtonColor} />
                        </IconButton>
                      </div>
                      <div className={classes.write}>
                        <div
                          className={clsx(classes.defaultInput, v.type !== undefined && classes[v.type])}
                          id={String(i)}
                          contentEditable={true}
                          onSelect={handleWriteSelect(i)}
                          onBlur={handleWriteBlur(i)}
                          onInput={handleWriteInput(i)}
                          onKeyDown={handleWriteKeyDown(v, i)}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {openContext && <NoteContext contextPosition={contextPosition} setOpenContext={setOpenContext} setSelectFile={setSelectFile} fileViewList={fileViewList} setAddFile={setAddFile} />}
    </div>
  )
}

export default Note
