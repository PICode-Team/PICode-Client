import React from "react";
import Layout from "../components/layout";
import CodeSpace from "../components/service/codespace";

export default function CodeSpacePage(pageProps: any) {
    return <Layout {...pageProps}>
        <CodeSpace />
    </Layout>
}