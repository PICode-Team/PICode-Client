import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@material-ui/core";
import React, { SetStateAction } from "react";
import { visualizerStyle } from "../../../styles/service/dockerspace/visualspace";

export default function VisualizerModal({
    modal,
    setModal,
    createType,
    connectEdge,
    dockerData
}: {
    modal: boolean,
    setModal: React.Dispatch<SetStateAction<boolean>>,
    createType: boolean,
    connectEdge: {
        new: any;
        old?: any;
    }
    dockerData: any
}) {
    const classes = visualizerStyle();
    const [name, setName] = React.useState<string>("");
    const [subnet, setSubnet] = React.useState<string>("");
    const [ipRange, setIpRange] = React.useState<string>("");
    const [gateway, setGateway] = React.useState<string>("");
    let dockerName = "";
    let networkName = "";
    let oldNetworkName = "";

    if (!createType && !dockerData.container.some((v: any) => v.containerId === connectEdge.new.source)) {
        setModal(false)
        return <></>
    }

    if (!createType && !dockerData.network.some((v: any) => v.networkId === connectEdge.new.target)) {
        setModal(false)
        return <></>
    }

    if (!createType && connectEdge.old !== undefined) {
        if (!dockerData.network.some((v: any) => v.networkId === connectEdge.old.target)) {
            setModal(false)
            return <></>
        }
    }


    if (dockerData !== undefined && connectEdge.new !== undefined) {
        dockerName = dockerData.container.find((v: any) => v.containerId === connectEdge.new.source).containerName
        networkName = dockerData.network.find((v: any) => v.networkId === connectEdge.new.target).name
        if (connectEdge.old !== undefined) {
            oldNetworkName = dockerData.network.find((v: any) => v.networkId === connectEdge.old.target).name
        }
    }

    return <Dialog
        className={classes.overlay}
        open={modal}
        onClose={() => setModal(false)}
        aria-labelledby="form-dialog-title"
    >
        <DialogTitle
            style={{
                backgroundColor: "#2c3239",
                color: "#ffffff",
                padding: "30px 30px 0px 30px",
                borderTopLeftRadius: "8px",
                borderTopRightRadius: "8px",
            }}
            id="form-dialog-title"
        >
            {createType ? "Network Create" : "Confirm Edit"}
        </DialogTitle>
        <DialogContent
            style={{
                backgroundColor: "#2c3239",
                color: "#ffffff",
                padding: "15px 30px",
                paddingTop: "10px",
            }}
        >
            {createType && <React.Fragment>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                    <div style={{ width: "80px" }}>Name <span style={{ color: "red" }}>*</span></div>
                    <input
                        placeholder={name}
                        value={name}
                        style={{
                            background: "#3b434c",
                            padding: "4px 8px",
                            border: "none",
                            outline: "none",
                            color: "#ffffff",
                            width: "300px",
                        }}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                    <div style={{ width: "80px" }}>Subnet</div>
                    <input
                        placeholder={subnet}
                        value={subnet}
                        style={{
                            background: "#3b434c",
                            padding: "4px 8px",
                            border: "none",
                            outline: "none",
                            color: "#ffffff",
                            width: "300px",
                        }}
                        onChange={(e) => setSubnet(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                    <div style={{ width: "80px" }}>IpRange</div>
                    <input
                        placeholder={ipRange}
                        value={ipRange}
                        style={{
                            background: "#3b434c",
                            padding: "4px 8px",
                            border: "none",
                            outline: "none",
                            color: "#ffffff",
                            width: "300px",
                        }}
                        onChange={(e) => setIpRange(e.target.value)}
                    />
                </div>
                <div style={{ marginBottom: "10px", display: "flex" }}>
                    <div style={{ width: "80px" }}>Gateway</div>
                    <input
                        placeholder={gateway}
                        value={gateway}
                        style={{
                            background: "#3b434c",
                            padding: "4px 8px",
                            border: "none",
                            outline: "none",
                            color: "#ffffff",
                            width: "300px",
                        }}
                        onChange={(e) => setGateway(e.target.value)}
                    />
                </div>
            </React.Fragment>}
            {!createType && (connectEdge.old !== undefined ? <React.Fragment>
                {`Do you want change link between '${dockerName}' with Network '${oldNetworkName}' to Network '${networkName}'?`}
            </React.Fragment> : <React.Fragment>
                {`Do you want link Container '${dockerName}' with Network '${networkName}'?`}
            </React.Fragment>)}
        </DialogContent>
        <DialogActions
            style={{
                backgroundColor: "#2c3239",
                color: "#ffffff",
                padding: "0px 30px 30px 30px",
                borderBottomLeftRadius: "8px",
                borderBottomRightRadius: "8px",
            }}
        >
            <div style={{ display: "flex" }}>
                <button
                    className={classes.footerButton}
                    onClick={() => setModal(false)}
                >
                    CANCEL
                </button>
                <button
                    className={classes.footerButton}
                    onClick={async () => {
                        if (createType) {
                            let payload = {
                                networkName: name,
                                subnet: subnet !== "" ? subnet : undefined,
                                ipRange: ipRange !== "" ? ipRange : undefined,
                                gateway: gateway !== "" ? gateway : undefined,
                            };
                            let data = await fetch(
                                `/api/docker/network`,
                                {
                                    method: "POST",
                                    mode: "cors",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify(payload),
                                }
                            );
                        } else {
                            if (connectEdge.old === undefined) {
                                let payload = {
                                    containerId: connectEdge.new.source,
                                    dockerInfo: {
                                        bridgeId: connectEdge.new.target,
                                        connect: true
                                    }
                                };
                                let data = await fetch(`/api/docker/visualization`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    mode: "cors",
                                    body: JSON.stringify(payload),
                                }).then((res) => res.json());
                                if (data.code === 200) {
                                    alert("Success")
                                } else {
                                    alert("Failed")
                                }
                            } else {
                                let deletePayload = {
                                    containerId: connectEdge.old.source,
                                    dockerInfo: {
                                        bridgeId: connectEdge.old.target,
                                        connect: false
                                    }
                                };
                                let createPayload = {
                                    containerId: connectEdge.new.source,
                                    dockerInfo: {
                                        bridgeId: connectEdge.new.target,
                                        connect: true
                                    }
                                }
                                let data = await fetch(`/api/docker/visualization`, {
                                    method: "PUT",
                                    headers: {
                                        "Content-Type": "application/json",
                                    },
                                    mode: "cors",
                                    body: JSON.stringify(deletePayload),
                                }).then((res) => res.json());
                                if (data.code === 200) {
                                    let CreateData = await fetch(`/api/docker/visualization`, {
                                        method: "PUT",
                                        headers: {
                                            "Content-Type": "application/json",
                                        },
                                        mode: "cors",
                                        body: JSON.stringify(createPayload),
                                    }).then((res) => res.json());
                                    if (CreateData.code === 200) {
                                        alert("Success")
                                    } else {
                                        alert("Failed")
                                    };
                                } else {
                                    alert("Failed")
                                };
                            }
                        }

                        setModal(false);
                    }}
                >
                    {createType ? "SUBMIT" : "CONFIRM"}
                </button>
            </div>
        </DialogActions>
    </Dialog>
}