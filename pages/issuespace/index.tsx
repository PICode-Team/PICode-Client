import React from 'react'

import Manage from '../../components/service/issuespace/manage'
import Layout from '../../components/layout'

export default function ManagePage(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Manage />
    </Layout>
  )
}
