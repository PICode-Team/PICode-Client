import '../styles/globals.css'
import type { AppContext, AppInitialProps, AppProps } from 'next/app'
import React, { useEffect, useState } from 'react'
import { CssBaseline, ThemeProvider } from '@material-ui/core'
import { darkTheme, whiteTheme } from '../styles/theme'
import wrapper from '../stores'
import { useSelector, useStore } from 'react-redux'
import { useWs, WsProvider } from '../components/context/websocket'
import { fetchSet } from '../components/context/fetch'

function App({ Component, pageProps }: AppProps) {
  const theme = useSelector((state: any) => state.theme)
  const [checkLogin, setCheckLogin] = useState<number>(0);


  let checkCookie = async () => {
    const response = await fetchSet('/user', 'GET', true)
    const { user, code } = await response.json()
    if (code !== 200) {
      localStorage.removeItem("userId")
      if (pageProps.path !== "/") {
        window.location.href = "/"
      }
      setCheckLogin(-1);
    } else {
      setCheckLogin(1);
    }
  }

  useEffect(() => {
    checkCookie();
  }, [pageProps.cookie])

  useEffect(() => {
    if (checkLogin < 0) {
      setCheckLogin(0)
    }
  }, [checkLogin])

  return (
    <React.Fragment>
      <title>PICODE</title>
      <meta name="description" content="PICODE" />
      <link rel="icon" href="/favicon.ico" />
      <WsProvider>
        <ThemeProvider theme={theme.theme === 'dark' ? darkTheme : whiteTheme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
      </WsProvider>
    </React.Fragment>
  )
}

App.getInitialProps = async ({ Component, ctx }: any): Promise<AppInitialProps> => {
  let pageProps = {}

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  pageProps = { ...pageProps, path: ctx.pathname, cookie: ctx.req?.headers.cookie }

  return { pageProps }
}

export default wrapper.withRedux(App)
