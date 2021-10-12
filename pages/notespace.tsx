import React from 'react'
import Layout from '../components/layout'
import Note from '../components/service/notespace/note'

export default function NotePages(pageProps: any) {
  return (
    <Layout {...pageProps}>
      <Note {...pageProps} />
    </Layout>
  )
}
