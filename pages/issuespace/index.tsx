import React from 'react'

import Manage from '../../components/service/issuespace/manage'
import Layout from '../../components/layout'
import { useRouter } from 'next/router'
import DefaultIssue from '../../components/service/issuespace/default'

export default function ManagePage(pageProps: any) {
  const router = useRouter()
  const { workspaceId } = router.query

  return <Layout {...pageProps}>{workspaceId !== undefined ? <Manage /> : <DefaultIssue />}</Layout>
}
