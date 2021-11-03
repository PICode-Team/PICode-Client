import React, { useEffect, useState } from 'react'
import clsx from 'clsx'
import { cloneDeep } from 'lodash'
import { IconButton } from '@material-ui/core'
import { DragIndicator, Add, ExpandMoreRounded, Description, Delete } from '@material-ui/icons'
import NoteContext from './context/context'
import { noteStyle } from '../../../styles/service/notespace/note'
import { IContextPosition, IFileView, INoteContent, IPosition } from '../../../types/note.types'
import { useWs } from '../../context/websocket'
import DrawDiagram from './content/diagram'

const initialPositionState: IPosition = {
  x: 0,
  y: 0,
  target: 0,
}

const initialContextPositionState: IContextPosition = {
  x: 0,
  y: 0,
  target: '',
}

interface INoteProps {}

function getLastPath(path: string) {
  let result = path.split('/')
  return result[result.length - 1]
}

function Note(props: INoteProps) {
  const {} = props
  const classes = noteStyle()
  const [contextPosition, setContextPosition] = useState<IContextPosition>(initialContextPositionState)
  const [selectFile, setSelectFile] = useState<any>(undefined)
  const [noteList, setNoteList] = React.useState<any>()
  const [sideFileList, setSideFileList] = React.useState<any>()
  const [openNote, setOpenNote] = React.useState<string[]>([])
  const [addFile, setAddFile] = React.useState<boolean>()
  const [openContext, setOpenContext] = useState<boolean>(false)
  const [contextName, setContextName] = useState<string>()
  const [openNum, setOpenNum] = React.useState<number>(0)
  const selectFileRef = React.useRef<any>()
  const dragId = React.useRef<string>('')
  const ws: any = useWs()

  const handleFileRowDragOver = (key: any) => (event: any) => {
    event.preventDefault()
    const node = document.getElementById(`${key.noteId}`)
    if (node) {
      node.style.border = '1px solid #fff'
    }
  }

  const handleFileRowDragLeave = (key: any) => (event: any) => {
    const node = document.getElementById(`${key.noteId}`)
    if (node) {
      node.style.border = '0px'
    }
  }

  useEffect(() => {
    selectFileRef.current = selectFile
    if (selectFile !== undefined) {
      let node = document.getElementById(`${selectFile.noteId}NoteContent`)
      if (node !== null) {
        node.textContent = selectFile.content
      }
    }

    const timer = setInterval(() => {
      getNote(selectFile?.noteId)
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [selectFile])

  const noteWebSocketHandler = (msg: any) => {
    const message = JSON.parse(msg.data)

    if (message.category === 'note') {
      switch (message.type) {
        case 'getNote':
          if (selectFileRef.current === undefined) {
            setNoteList(message.data)
          } else {
            setSelectFile(message.data[0])
          }
          break
        case 'updateNote':
          break
        case 'deleteNote':
          break
        case 'createNote':
          break
      }
    }
  }

  const getNote = (noteId?: string) => {
    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
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

  const handleDeleteClick = (event: any) => {
    event.stopPropagation()
    setAddFile(false)
  }

  useEffect(() => {
    if (openNum < 0) return

    if (ws !== undefined && ws?.readyState === WebSocket.OPEN) {
      ws.addEventListener('message', noteWebSocketHandler)
      getNote()
      setOpenNum(-1)
    } else {
      setOpenNum(openNum + 1)
    }
  }, [openNum])

  useEffect(() => {
    let result: any = {}
    if (noteList !== undefined) {
      noteList.map((v: any) => {
        let realId = v.noteId.split('/')
        if (result[`depth${realId.length - 1}`] === undefined) {
          result[`depth${realId.length - 1}`] = [v]
        } else {
          result[`depth${realId.length - 1}`].push(v)
        }
      })
      setSideFileList(result)
    }
  }, [noteList])

  function checkChildren(path: string) {
    let realPath = path.split('/')
    let count = realPath.length
    if (sideFileList[`depth${count}`] === undefined) {
      return 'file'
    } else {
      let result = false
      sideFileList[`depth${count}`].map((v: any) => {
        let childPath = v.noteId.split('/')
        let tmpResult = true
        for (let i = 0; i < count; i++) {
          if (realPath[i] !== childPath[i]) {
            tmpResult = false
            break
          }
        }
        result = result || tmpResult
      })
      if (result) {
        return 'folder'
      } else {
        return 'file'
      }
    }
  }

  function drawChildren(number: number, checkParent?: string) {
    if (sideFileList === undefined) return <></>
    if (sideFileList[`depth${number}`] === undefined) return <></>
    return sideFileList[`depth${number}`].map((v: any, i: number) => {
      if (number !== 1) {
        let realId = v.noteId.split('/')
        let findParent = realId.slice(0, realId.length - 1).join('/')
        if (checkParent !== findParent) {
          return <React.Fragment key={`test-${i}`}></React.Fragment>
        }
      }
      let realName = v.noteId.split('/')
      return (
        <>
          <div
            key={v.noteId}
            className={classes.fileRow}
            style={{
              paddingLeft: `${16 * number + (checkChildren(v.noteId) === 'file' ? 24 : 0)}px`,
            }}
            draggable={true}
            id={v.noteId}
            onDragOver={handleFileRowDragOver(v)}
            onDragStart={() => {
              dragId.current = v.noteId
            }}
            onDrop={(e) => {
              if (dragId.current !== '') {
                const node = document.getElementById(`${v.noteId}`)
                if (node) {
                  node.style.border = '0px'
                }
              }
              let dragNote = dragId.current.split('/')
              let dropNote = v.noteId.split('/')
              let tmpResult = true
              for (let i = 0; i < dragNote.length; i++) {
                if (dragNote[i] !== dropNote[i]) {
                  tmpResult = false
                }
              }
              if (!tmpResult) {
                ws.send(
                  JSON.stringify({
                    category: 'note',
                    type: 'updateNote',
                    data: {
                      noteId: dragId.current,
                      newNotePath: v.noteId + '/' + dragNote[dragNote.length - 1],
                    },
                  })
                )
                getNote()
              }
            }}
            onContextMenu={(event) => {
              event.preventDefault()
              setOpenContext(true)
              setContextPosition({
                x: event.currentTarget.getBoundingClientRect().left,
                y: event.currentTarget.getBoundingClientRect().top,
                target: v.noteId,
              })
            }}
            onDragLeave={handleFileRowDragLeave(v)}
            onClick={() => {
              let tmpOpenNote = cloneDeep(openNote)
              let check = tmpOpenNote.findIndex((open) => open === v.noteId)
              if (check < 0) {
                tmpOpenNote.push(v.noteId)
              } else {
                tmpOpenNote.splice(check, 1)
              }
              setSelectFile(v)
              setOpenNote(tmpOpenNote)
            }}
          >
            {checkChildren(v.noteId) === 'folder' && <ExpandMoreRounded style={{ transform: `${!openNote.some((openCheck) => openCheck === v.noteId) ? 'rotate(-90deg)' : 'rotate(0deg)'}` }} />}
            <Description className={classes.description} />
            <div className={classes.key}>{realName[realName.length - 1]}</div>
          </div>
          <>{openNote.some((v1) => v1 === v.noteId) && drawChildren(number + 1, v.noteId)}</>
          {addFile && contextPosition.target === v.noteId && (
            <div
              className={classes.fileRow}
              style={{
                paddingLeft: `${16 * number + (checkChildren(v.noteId) === 'file' ? 24 : 0)}px`,
              }}
            >
              <input
                placeholder={'untitled'}
                autoFocus
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    ws.send(
                      JSON.stringify({
                        category: 'note',
                        type: 'createNote',
                        data: {
                          path: v.noteId + '/' + e.target.value,
                        },
                      })
                    )
                    getNote()
                  }
                  setAddFile(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    ws.send(
                      JSON.stringify({
                        category: 'note',
                        type: 'createNote',
                        data: {
                          path: v.noteId + '/' + e.currentTarget.value,
                        },
                      })
                    )
                    getNote()
                    setAddFile(false)
                  }
                }}
              />
              <IconButton className={classes.delete} onClick={handleDeleteClick}>
                <Delete className={classes.buttonColor} />
              </IconButton>
            </div>
          )}
        </>
      )
    })
  }

  return (
    <div
      className={classes.note}
      onClick={() => {
        setOpenContext(false)
        setContextPosition({
          x: 0,
          y: 0,
          target: '',
        })
      }}
    >
      <div className={classes.fileView}>
        <div className={classes.fileEdit}>
          <IconButton className={classes.addFile}>
            <Add
              className={classes.buttonColor}
              onClick={() => {
                setAddFile(true)
              }}
            />
          </IconButton>
        </div>
        <div style={{ width: '100%', height: 'calc(100% - 50px)', overflow: 'hidden', overflowY: 'auto' }}>
          {drawChildren(1)}
          {addFile && contextPosition.target === '' && (
            <div className={classes.fileRow}>
              <input
                placeholder={'untitled'}
                autoFocus
                onBlur={(e) => {
                  if (e.target.value !== '') {
                    ws.send(
                      JSON.stringify({
                        category: 'note',
                        type: 'createNote',
                        data: {
                          path: '/' + e.currentTarget.value,
                        },
                      })
                    )
                    getNote()
                  }
                  setAddFile(false)
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    ws.send(
                      JSON.stringify({
                        category: 'note',
                        type: 'createNote',
                        data: {
                          path: '/' + e.currentTarget.value,
                        },
                      })
                    )
                    getNote()
                    setAddFile(false)
                  }
                }}
              />
              <IconButton className={classes.delete} onClick={handleDeleteClick}>
                <Delete className={classes.buttonColor} />
              </IconButton>
            </div>
          )}
        </div>
      </div>
      {selectFile !== undefined && (
        <div id="writeSomeThing" className={classes.content}>
          <div className={classes.title}>
            <div className={classes.titleContent}>
              <input id="title" className={clsx(classes.defaultTitle, classes.h1Input)} placeholder="title" onChange={() => {}} value={getLastPath(selectFile?.noteId ?? '')} />
              <input id="creator" className={clsx(classes.defaultTitle, classes.h2Input)} placeholder="author" onChange={() => {}} value={selectFile.creator} />
              <input id="type" className={clsx(classes.defaultTitle, classes.h3Input)} placeholder="category" onChange={() => {}} value={selectFile.type} />
              <input id="createTime" className={clsx(classes.defaultTitle, classes.h3Input)} placeholder="creation" onChange={() => {}} value={selectFile.createTime} />
            </div>
          </div>
          {selectFile.path.split('/').some((v: string | string[]) => v.includes('.io')) ? (
            <div className={classes.drawRoot}>
              <DrawDiagram selectFile={selectFile} />
            </div>
          ) : (
            <div className={clsx(classes.contentWrapper)}>
              <div className={classes.write}>
                <div
                  contentEditable={true}
                  id={selectFile.noteId + 'NoteContent'}
                  className={clsx(classes.defaultInput)}
                  onKeyUp={(event: any) => {
                    if (event.target.innerHTML === '/h1 ') {
                      event.target.innerHTML = ''
                      const h1 = document.createElement('h1')
                      h1.classList.add(classes.h1Input)
                      const parent = event.target.parentElement
                      h1.appendChild(event.target)
                      parent.appendChild(h1)

                      document.getElementById(selectFile.noteId + 'NoteContent')?.focus()

                      ws.send(
                        JSON.stringify({
                          category: 'note',
                          type: 'saveNote',
                          data: {
                            noteData: {
                              noteId: selectFile.noteId,
                              content: '',
                            },
                          },
                        })
                      )
                    }
                  }}
                  onInput={(e) => {
                    let node = document.getElementById(selectFile.noteId)?.focus()
                    let result = e.currentTarget.innerHTML

                    ws.send(
                      JSON.stringify({
                        category: 'note',
                        type: 'saveNote',
                        data: {
                          noteData: {
                            noteId: selectFile.noteId,
                            content: result,
                          },
                        },
                      })
                    )
                    getNote(selectFile.noteId)
                  }}
                ></div>
              </div>
            </div>
          )}
        </div>
      )}
      {openContext && <NoteContext contextPosition={contextPosition} setOpenContext={setOpenContext} setSelectFile={setSelectFile} setAddFile={setAddFile} />}
    </div>
  )
}

export default Note
