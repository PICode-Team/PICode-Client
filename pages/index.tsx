import React, { useEffect, useState } from 'react'

import Layout from '../components/layout'
import Dashboard from '../components/service/dashboard/dashboard'
import Login from '../components/user/login'
import { IPageProps } from '../types/page.types'

export default function Home(pageProps: IPageProps) {
  const [loginCheck, setLoginCheck] = useState(Boolean);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("userId") !== null) {
        setLoginCheck(true)
      } else {
        setLoginCheck(false)
      }
    }
  }, [])

  return (
    <React.Fragment>
      {loginCheck ? (
        <Layout {...pageProps}>
          <Dashboard {...pageProps} />
        </Layout>
      ) : (
        <Login />
      )}
    </React.Fragment>
  )
}
