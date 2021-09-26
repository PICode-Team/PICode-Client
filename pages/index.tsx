import React from 'react'

import Layout from '../components/layout'
import Dashboard from '../components/service/dashboard/dashboard'
import Login from '../components/user/login'
import { IPageProps } from '../types/page.types'

export default function Home(pageProps: IPageProps) {
  return (
    <React.Fragment>
      {pageProps.cookie ? (
        <Layout {...pageProps}>
          <Dashboard {...pageProps} />
        </Layout>
      ) : (
        <Login />
      )}
    </React.Fragment>
  )
}
