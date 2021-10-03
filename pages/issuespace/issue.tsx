import React from 'react'

import Issue from '../../components/service/issuespace/issue/issue'
import Layout from '../../components/layout'

export default function IssuePage(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Issue />
    </Layout>
  )
}
