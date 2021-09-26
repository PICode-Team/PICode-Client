import React from 'react'

import Layout from '../components/layout'
import Dashboard from '../components/service/dashboard/dashboard'
import Login from '../components/user/login'

export default function Home(pageProps: any) {
  return (
    <React.Fragment>
      {pageProps.session.userId ? (
        <Layout {...pageProps}>
          <Dashboard {...pageProps} />
        </Layout>
      ) : (
        <Login />
      )}
    </React.Fragment>
  )
}
