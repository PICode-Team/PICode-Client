/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Ansi from 'ansi-to-react'
import { throttle } from 'lodash'
import { terminalStyle } from '../../../styles/service/codespace/code'
import { useWs } from '../../context/websocket'
import { IconButton } from '@material-ui/core'
import { CancelOutlined, Close, DeleteForeverOutlined } from '@material-ui/icons'

function Terminal(props: any): JSX.Element {
  return (
    <div
      contentEditable={false}
      draggable={false}
      style={{
        height: '300px',
        width: `${props.width}`,
        display: 'inline-block',
        overflow: 'auto',
        outline: 'none',
      }}
      onClick={(e) => {
        let terminal = document.getElementById(`terminal${props.terminalCount}`)
        if (terminal !== null) {
          terminal.focus()
        }
      }}
    >
      {props.content[props.id]?.map((v: string, idx: number) => (
        <>
          <Ansi key={v}>{v}</Ansi>
          {props.content[props.id].length - 1 !== idx && <br />}
        </>
      ))}
      <span
        id={`terminal${props.terminalCount}`}
        contentEditable={true}
        draggable={true}
        style={{ outline: 'none', fontFamily: 'monospace', fontSize: '14px' }}
        onKeyDown={(e: any) => {
          if (e.key === 'Enter') {
            e.preventDefault()
            props.ws.send(
              JSON.stringify({
                category: 'terminal',
                type: 'commandTerminal',
                data: {
                  command: e.target.innerText,
                  id: props.id,
                },
              })
            )
            e.target.innerText = ''
          }
        }}
      />
    </div>
  )
}

export default function TerminalContent(props: any): JSX.Element {
  const classes = terminalStyle()
  const ws = useWs()

  const userMouseMoveCapture = React.useCallback(
    throttle((e) => {
      //
    }, 200),
    []
  )

  let terminalContent = []
  for (let i = 0; i < props.terminalCount; i++) {
    terminalContent.push(<Terminal {...props} terminalCount={i} ws={ws} id={props.uuid[i]} width={`${100 / props.terminalCount}%`} />)
  }
  return (
    <div className={classes.terminal} style={{ height: `${props.height}px` }}>
      <div draggable={false} className={classes.resizerBar} />
      <IconButton
        style={{ position: 'absolute', top: '6px', right: '6px', width: '12px', height: '12px' }}
        onClick={() => {
          props.setOpenContent(props.terminalCount - 1)
        }}
      >
        <Close style={{ width: '20px', height: '20px', color: '#dedede' }} />
      </IconButton>
      {terminalContent.map((v: JSX.Element) => v)}
    </div>
  )
}
