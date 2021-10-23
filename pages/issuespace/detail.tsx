import React from 'react'

import Layout from '../../components/layout'
import IssueDetail from '../../components/service/issuespace/issueDetail'

export default function ManagePage(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <IssueDetail />
    </Layout>
  )
}
