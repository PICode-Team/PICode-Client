import React from "react";

export default function TestPage(pageProps: any) {
    return (
        <React.Fragment>
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
            <button onClick={async () => {
                let ws = new WebSocket(`ws://localhost:4000/api/?userId=test`)
                ws.onopen = () => {
                    if (ws!.readyState === WebSocket.OPEN) {
                        ws!.send(JSON.stringify({ category: "connect" }));
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
                };
            }}>
                wstest
            </button>
        </React.Fragment>
    );
}
