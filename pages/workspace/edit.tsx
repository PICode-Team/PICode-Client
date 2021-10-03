import React from 'react'

import Layout from '../../components/layout'
import Edit from '../../components/service/workpspace/project/editProject'

export default function CodePages(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Edit />
    </Layout>
  )
}
