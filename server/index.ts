import express, { Request, Response } from "express";
const { parse } = require("url");
import httpProxy from "http-proxy";
import { createProxyMiddleware } from "http-proxy-middleware";
import next from "next";

require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

const wsPort = process.env.NEXT_PUBLIC_WS_PORT || 3001;

httpProxy
    .createServer({
        target: process.env.NEXT_FE_API_URL,
        changeOrigin: true,
        ws: true,
    })
    .listen(Number(wsPort));
(async () => {
    try {
        await app.prepare();
        const server = express();
        const TIMEOUT = 30 * 60 * 1000;

        server.use(
            "/api",
            createProxyMiddleware({
                target: process.env.NEXT_FE_API_URL,
                changeOrigin: true,
                logLevel: "debug",
            })
        );

        server.all("*", (req: Request, res: Response) => {
            return handle(req, res);
        });
        server.listen(port, (err?: any) => {
            if (err) throw err;
            console.log(
                `> Ready on localhost:${port} - env ${process.env.NODE_ENV}`
            );
        });
    } catch (e) {
        console.error("error", e);
        process.exit(1);
    }
})();
