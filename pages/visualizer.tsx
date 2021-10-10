import React from "react";
import Layout from "../components/layout";
import UpdatableEdge from "../components/service/visualizer/flow";

export default function CodeSpacePage(pageProps: any) {
    return <Layout {...pageProps}>
        <UpdatableEdge />
    </Layout>
}