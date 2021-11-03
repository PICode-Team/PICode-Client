/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react'
import Ansi from 'ansi-to-react'
import { throttle } from 'lodash'
import { terminalStyle } from '../../../styles/service/codespace/code'
import { IconButton } from '@material-ui/core'
import { CancelOutlined, Close, DeleteForeverOutlined } from '@material-ui/icons'

function Terminal(props: any): JSX.Element {
  const terminalUserName = React.useRef<string>();
  let terminal = document.getElementById(`terminal${props.terminalCount}`)

  return (
    <div
      contentEditable={false}
      draggable={false}
      style={{
        height: '300px',
        width: `100%`,
        minWidth:`${props.width}`,
        display: 'inline-block',
        overflow: 'auto',
        outline: 'none',
        color: "#fff"
      }}
      onClick={(e) => {
        let terminal = document.getElementById(`terminal${props.terminalCount}`)
        if (terminal !== null) {
          terminal.focus()
        }
      }}

    >
      {props.content[props.id]?.map((v: string, idx: number) => {
        if(idx===0){
          terminalUserName.current=v
        }
        let terminal = document.getElementById(`terminal${props.terminalCount}`)
        return <>
          <Ansi key={v} >{v}</Ansi>
          {(v!==terminalUserName.current) && <br />}
        </>
      })}
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
  const userMouseMoveCapture = React.useCallback(
    throttle((e) => {
      //
    }, 200),
    []
  )

  let terminalContent = []
  for (let i = 0; i < props.openTerminalCount; i++) {
    terminalContent.push(<Terminal {...props} terminalCount={i} ws={props.ws} id={props.uuid[i]} width={`${100 / props.terminalCount}%`} />)
  }

  return (
    <div className={classes.terminal} style={{ height: `${props.height}px` }}>
      <div draggable={false} className={classes.resizerBar} />
      <IconButton
        style={{ position: 'absolute', top: '48px', right: '24px', width: '12px', height: '12px' }}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation()
          if (props.ws !== undefined && props.ws?.readyState === WebSocket.OPEN) {
            let payload = {
              category: "terminal",
              type: "deleteTerminal",
              data: {
                id: props.uuid[0]
              }
            }
            props.ws.send(JSON.stringify(payload))
          }
        }}
      >
        <Close style={{ width: '20px', height: '20px', color: '#dedede' }} />
      </IconButton>
      {terminalContent.map((v: JSX.Element) => v)}
    </div>
  )
}
