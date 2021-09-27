import React, { createContext, ReactNode, useContext } from 'react'

const WsContext = createContext(undefined)

export function useWs() {
  return useContext(WsContext)
}

export function WsProvider({ children }: any) {
  let value: any
  if (typeof window !== 'undefined') {
    const ws = new WebSocket(`ws://localhost:${process.env.NEXT_PUBLIC_WS_PORT}`)
    ws.onopen = () => {
      if (ws!.readyState === WebSocket.OPEN) {
        ws!.send(JSON.stringify({ category: 'connect' }))
      }
    }
    value = ws
  }

  return <WsContext.Provider value={value}>{children}</WsContext.Provider>
}
