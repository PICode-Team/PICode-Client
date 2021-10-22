import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import CustomTextInput from '../../input/text'
import Modal from '../modal'
import { IThemeStyle } from '../../../../styles/theme'
import { fetchSet } from '../../../context/fetch'
import { IWorkspaceSpec } from '../../../../types/workspace.types'

const exportStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    nodeWrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      width: '100%',
      height: '100%',
    },
    node: {
      backgroundColor: theme.backgroundColor.step2,
      width: '120px',
      height: '120px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      cursor: 'pointer',
    },
  })
)

interface IExportWorkspaceProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
  workspaceInfo: IWorkspaceSpec
  exportType?: IExportType
}

interface IWorkspaceOption {
  workspaceId: string
  extension: string
}

interface IDockerOption {
  containerId: string
  imageName: string
  tagName: string
}

const initialWorkspaceOptionState: IWorkspaceOption = {
  workspaceId: '',
  extension: '',
}

const initialDockerOptionState: IDockerOption = {
  containerId: '',
  imageName: '',
  tagName: '',
}

type IExportType = 'codespace' | 'container'

function ExportWorkspace(props: IExportWorkspaceProps) {
  const { modal, setModal, exportType, workspaceInfo } = props
  const classes = exportStyle()
  const [type, setType] = useState<IExportType | null>(null)
  const [workspaceOption, setWorkspaceOption] = useState<IWorkspaceOption>(initialWorkspaceOptionState)
  const [dockerOption, setDockerOption] = useState<IDockerOption>(initialDockerOptionState)

  const handleWorkspaceOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceOption({ ...workspaceOption, [event.target.id]: event.target.value })
  }

  const handleDockerOption = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDockerOption({ ...dockerOption, [event.target.id]: event.target.value })
  }

  const handleSubmit = async () => {
    const payload = {
      option: {},
    }

    if (type === 'codespace') {
      payload.option = {
        workspaceOption,
      }
    } else {
      payload.option = {
        dockerOption,
      }
    }

    await fetchSet('/workspace/export', 'POST', true, JSON.stringify(payload))
  }

  const handleTypeClick = (type: IExportType) => () => {
    setType(type)
  }

  useEffect(() => {
    if (exportType === undefined) return

    setType(exportType)
  }, [exportType])

  useEffect(() => {
    setWorkspaceOption({ ...workspaceOption, workspaceId: workspaceInfo.workspaceId })
    setDockerOption({ ...dockerOption, containerId: workspaceInfo.containerId })
  }, [workspaceInfo])

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="Export Workspace" hidden={type === null}>
      <React.Fragment>
        {type === null && (
          <div className={classes.nodeWrapper}>
            <div className={classes.node} onClick={handleTypeClick('codespace')}>
              Codespace files
            </div>
            <div className={classes.node} onClick={handleTypeClick('container')}>
              Container itself
            </div>
          </div>
        )}
        {type === 'codespace' && (
          <div>
            <CustomTextInput value={workspaceOption.extension} id="extension" label="extension" placeholder="extension" onChange={handleWorkspaceOption} />
          </div>
        )}
        {type === 'container' && (
          <div>
            <CustomTextInput value={dockerOption.imageName} id="imageName" label="image name" placeholder="image name" onChange={handleDockerOption} />
            <CustomTextInput value={dockerOption.tagName} id="tagName" label="tag name" placeholder="tag name" onChange={handleDockerOption} />
          </div>
        )}
      </React.Fragment>
    </Modal>
  )
}

export default ExportWorkspace
