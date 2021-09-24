import React from 'react'
import Layout from '../components/layout'
import Issue from '../components/service/issuespace/issue/issue'

export default function Home(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Issue />
    </Layout>
  )
}
