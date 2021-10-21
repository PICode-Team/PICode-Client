import React, { useEffect, useState } from 'react'

import { CloudDownload, DeleteForever, Settings } from '@material-ui/icons'

import { defaultStyle } from '../../../styles/service/workspace/default'
import { IWorkspaceSpec } from '../../../types/workspace.types'
import CustomButton from '../../items/button/button'
import { fetchSet } from '../../context/fetch'
import DeleteModal from '../../items/modal/detail/delete'
import ExportWorkspace from '../../items/modal/detail/export'
import RequestResult from '../../items/modal/detail/result'

function DefaultCodeView() {
  const classes = defaultStyle()
  const [projectData, setWorkspaceData] = useState<IWorkspaceSpec[]>([])
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openExport, setOpenExport] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [uuid, setUuid] = useState<string>('')
  const [modalInfo, setModalInfo] = useState<IWorkspaceSpec | null>(null)
  const [openResult, setOpenResult] = useState<boolean>(false)
  const [resultStatus, setResultStatus] = useState<boolean>(true)

  const getWorkspaceData = async () => {
    const response = await fetchSet('/workspace', 'GET', true)
    const { workspaceList, code } = await response.json()

    if (code === 200) {
      setWorkspaceData(workspaceList)
    }
  }

  const handleExportWorkspace = (workspaceInfo: IWorkspaceSpec) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    setOpenExport(true)
    setModalInfo(workspaceInfo)
  }

  const handleLinkCode = (workspaceId: string) => () => {
    window.location.href = `/codespace?workspaceId=${workspaceId}`
  }

  const handleLinkIssue = (workspaceId: string) => () => {
    window.location.href = `/issuespace?workspaceId=${workspaceId}`
  }

  const handleLinkEdit = (workspaceId: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = `/workspace/edit?workspaceId=${workspaceId}`
  }

  const handleDeleteSubmit = (workspaceId: string) => async () => {
    const response = await fetchSet(`/workspace?workspaceId=${workspaceId}`, 'DELETE', true)
    const { code } = await response.json()

    if (code / 2 === 100) {
      setOpenDelete(false)
      setOpenResult(true)
      setResultStatus(true)
    } else {
      setOpenDelete(false)
      setOpenResult(true)
      setResultStatus(false)
    }
  }

  const handleClickDelete = (workspaceId: string, name: string) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    setOpenDelete(true)
    setName(name)
    setUuid(workspaceId)
  }

  useEffect(() => {
    getWorkspaceData()
  }, [])

  return (
    <div className={classes.wrapper}>
      <div className={classes.title}></div>
      <div className={classes.content}>
        {projectData.map((v, i) => (
          <div
            key={`project-card-${i}`}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
            }}
            className={classes.item}
          >
            <div className={classes.top}>
              <div className={classes.projectName}>{v.name}</div>
              <div className={classes.iconWrapper}>
                <span className={classes.icon} onClick={handleExportWorkspace(v)}>
                  <CloudDownload />
                </span>
                <div className={classes.icon} onClick={handleLinkEdit(v.workspaceId)}>
                  <Settings />
                </div>
                <div className={classes.icon} onClick={handleClickDelete(v.workspaceId, v.name)}>
                  <DeleteForever />
                </div>
              </div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Author</div>
              <div className={classes.infoValue}>{v.participants}</div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Creator</div>
              <div className={classes.infoValue}>{v.creator}</div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Create time</div>
              <div className={classes.infoValue}>{`20${v.creation}`}</div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Description</div>
              <div className={classes.infoValue}>{v.description === '' && 'no description'}</div>
            </div>
            <div className={classes.buttonGroup}>
              <CustomButton text="To Code" className={classes.button} onClick={handleLinkCode(v.workspaceId)} />
              <CustomButton text="To Issue" className={classes.button} onClick={handleLinkIssue(v.workspaceId)} />
            </div>
          </div>
        ))}
      </div>
      {openDelete && <DeleteModal name={name} uuid={uuid} modal={openDelete} setModal={setOpenDelete} handleSubmit={handleDeleteSubmit} type="workspace" />}
      {openExport && modalInfo !== null && <ExportWorkspace modal={openExport} setModal={setOpenExport} workspaceInfo={modalInfo} exportType="codespace" />}
      {openResult && <RequestResult modal={openResult} setModal={setOpenResult} resultStatus={resultStatus} text={resultStatus ? 'Success Deleting workspace' : 'Error in Deleting workspace'} />}
    </div>
  )
}

export default DefaultCodeView
