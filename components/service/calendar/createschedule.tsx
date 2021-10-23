
import React from "react";
import { IKanban } from "../../../types/issue.types";
import Modal from "../../items/modal/modal";

interface ICreateSchedule {
    modal: boolean;
    setModal: React.Dispatch<React.SetStateAction<boolean>>;
    kanbanList: IKanban[] | undefined,
    tmpDay: Date
}

export default function CreateSchedule(props: ICreateSchedule) {
    const { modal, setModal, kanbanList, tmpDay } = props
    return <Modal modal={modal} setModal={setModal} title={"Create schedule"} onSubmit={() => {
        console.log(2)
    }}>
        <React.Fragment>
        </React.Fragment>
    </Modal>
}