import React from 'react'

import Layout from '../../components/layout'
import Create from '../../components/service/workpspace/project/createProject'

export default function CodePages(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Create />
    </Layout>
  )
}
