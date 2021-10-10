import React from 'react'

import Layout from '../../components/layout'
import DefaultCodeView from '../../components/service/workpspace/default'

export default function CodePages(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <DefaultCodeView />
    </Layout>
  )
}
