import express, { Request, Response } from "express";
const { parse } = require("url");
import { createProxyMiddleware } from "http-proxy-middleware";
import next from "next";

require("dotenv").config();
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const port = process.env.PORT || 3000;

(async () => {
    try {
        await app.prepare();
        const server = express();

        server.use(
            "/api",
            createProxyMiddleware({
                target: process.env.FE_API_URL,
                changeOrigin: true,
                ws: true,
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
        console.error(e);
        process.exit(1);
    }
})();
