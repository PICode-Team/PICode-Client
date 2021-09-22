/* eslint-disable react-hooks/exhaustive-deps */
import React, { useContext } from "react";
import { useWs } from "../components/context/websocket";
import { throttle } from "lodash";

export default function TestPage(ctx: any) {
    const ws: any = useWs();

    interface IUserMouse {
        x: number;
        y: number;
    }

    const [userMouse, setUserMouse] =
        React.useState<{ x: number; y: number; screenSize: IUserMouse }>();

    if (ws !== undefined) {
        if (ws.readyState === 1) {
            ws!.send(
                JSON.stringify({
                    category: "work",
                    type: "getWorkingPath",
                    data: {
                        workingPath: "test",
                    },
                })
            );
        }

    }

    const userMouseMoveCapture = React.useCallback(
        throttle((e) => {
            if (
                ctx.path === "/code" ||
                ctx.path === "/note" ||
                ctx.path === "/chat" ||
                ctx.path === "/test"
            ) {
                setUserMouse({
                    x: e.clientX,
                    y: e.clientY,
                    screenSize: {
                        x: window.innerWidth,
                        y: window.innerHeight,
                    },
                });
            }
        }, 100),
        []
    );

    React.useEffect(() => {
        if (userMouse === null) return;
        if (ws === undefined) return;

        let payload: any = {
            workingPath: ctx.path,
        };
        if (
            ctx.path === "/code" ||
            ctx.path === "/note" ||
            ctx.path === "/chat" ||
            ctx.path === "/test"
        ) {
            payload.userMouse = userMouse;
        }
        if (ws.readyState === 1) {
            ws.send(
                JSON.stringify({
                    category: "work",
                    type: "getWorkingPath",
                    data: payload,
                })
            );
        }

    }, [userMouse]);

    return (
        <div style={{ width: "100%", height: "100%" }} onMouseMoveCapture={userMouseMoveCapture}>
            test
            <button onClick={async () => {
                let result = await fetch(`/api/user/sign`, {
                    method: "POST",
                    mode: "cors",
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userId: "test",
                        passwd: "1234"
                    })
                }).then((res) => res.json());
                console.log(result)
            }}>
                login
            </button>
        </div>
    );
}
