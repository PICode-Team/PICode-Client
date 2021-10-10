import React, { createContext, ReactNode, useContext } from 'react'

const WsContext = createContext(undefined)

export function useWs() {
  return useContext(WsContext)
}

export function WsProvider({ children }: any) {
  let value: any

  if (typeof window !== 'undefined') {
    const ws = new WebSocket(`ws://192.168.85.128:8000`)

    ws.onopen = () => {
      if (ws!.readyState === WebSocket.OPEN) {
        ws!.send(JSON.stringify({ category: 'connect' }))
      }
    }
    value = ws
  }

  return <WsContext.Provider value={value}>{children}</WsContext.Provider>
}
