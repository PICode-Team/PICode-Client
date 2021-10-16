import React from 'react'
import Layout from '../components/layout'
import Chat from '../components/service/chatspace/chat/chat'

export default function Home(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Chat toggle={true} />
    </Layout>
  )
}
