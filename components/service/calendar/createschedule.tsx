
import { Select, TextField } from "@material-ui/core";
import React, { useState } from "react";
import { IKanban, IMilestone } from "../../../types/issue.types";
import CustomDate from "../../items/input/date";
import CustomSelect from "../../items/input/select";
import CustomTextInput from "../../items/input/text";
import Modal from "../../items/modal/modal";

interface ICreateSchedule {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    kanbanList: IKanban[] | undefined,
    tmpDay: Date,
    milestoneList: IMilestone[] | undefined
}

interface IOptionData {
    name: string,
    value: string
}

export default function CreateSchedule(props: ICreateSchedule) {
    const { modal, setModal, kanbanList, tmpDay, milestoneList } = props
    const [payload, setPayload] = useState<{
        startDate?: string,
        endDate?: string,
        milestoneId?: string;
        kanbanId?: string;
    }>();
    let kanbanData: IOptionData[] = [];
    let mileData: IOptionData[] = [];

    const handleStartDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload({ ...payload, startDate: event.target.value })
    }

    const handleEndDate = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPayload({ ...payload, endDate: event.target.value })
    }


    if (kanbanList !== undefined) {
        kanbanList.map((v) => {
            if (v === null) return;
            kanbanData.push({
                name: v.title,
                value: v.uuid
            })
        })
    }

    if (milestoneList !== undefined) {
        milestoneList.map((v) => {
            if (v === null) return;
            mileData.push({
                name: v.title,
                value: v.uuid
            })
        })
    }

    return <Modal modal={modal} setModal={setModal} title={"Create schedule"} onSubmit={() => {
        setModal(false)
    }}>
        <React.Fragment>
            <label style={{ color: "#fff", paddingBottom: "6px" }}>Title</label>
            <input style={{ width: "100%", marginBottom: "12px" }} />
            <CustomDate id="startDate" onChange={handleStartDate} value={payload?.startDate ?? ""} label="Start Date" placeholder="StartDate" />
            <CustomDate id="endDate" onChange={handleEndDate} value={payload?.endDate ?? ""} label="End Date" placeholder="EndDate" />
            <label style={{ color: "#fff" }}>Content</label>
            <div contentEditable={true} style={{ height: "150px", marginBottom: "12px", marginTop: "12px", background: "#fff" }}>
            </div>
            <label style={{ color: "#fff" }}>Optional</label>
            <CustomSelect value={payload?.milestoneId ?? ""}
                label={"Milestone"}
                optionList={mileData}
                onChange={() => {
                }}
            />
            <CustomSelect value={payload?.kanbanId ?? ""} label={"Kanban"} optionList={kanbanData} />
            <br />
        </React.Fragment>
    </Modal>
}
