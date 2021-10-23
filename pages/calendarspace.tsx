import React from "react";
import Layout from "../components/layout";
import CalanderSpace from "../components/service/calendar/calendar";

export default function CalendarPage(pageProps: any) {
    return <Layout {...pageProps}>
        <CalanderSpace />
    </Layout>
}