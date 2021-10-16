import React, { useEffect, useState } from 'react'

import { CloudDownload, DeleteForever, Settings } from '@material-ui/icons'
import Swal from 'sweetalert2'

import { defaultStyle } from '../../../styles/service/workspace/default'
import { IWorkspaceSpec } from '../../../types/workspace.types'
import CustomButton from '../../items/button/button'
import { fetchSet } from '../../context/fetch'

function DefaultCodeView() {
  const classes = defaultStyle()
  const [projectData, setWorkspaceData] = useState<IWorkspaceSpec[]>([])

  const getWorkspaceData = async () => {
    const response = await fetchSet('/workspace', 'GET', true)
    const { workspaceList, code } = await response.json()

    if (code !== 200) return

    setWorkspaceData(workspaceList)
  }

  const handleExportWorkspace = (workspaceInfo: IWorkspaceSpec) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const result = await Swal.fire({
      title: 'Export Workspace',
      text: `Are you sure export Container itself?`,
      icon: 'info',
      heightAuto: false,
      showCancelButton: true,
    })

    if (result.isConfirmed !== true) return

    const imageName = await Swal.fire({
      title: 'Submit image name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      heightAuto: false,
    })

    if (imageName.value === undefined) return

    const tagName = await Swal.fire({
      title: 'Submit tag name',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
      },
      showCancelButton: true,
      heightAuto: false,
    })

    if (tagName.value === undefined) return

    const payload = {
      option: {
        dockerOption: {
          containerId: workspaceInfo.containerId,
          imageName: imageName.value,
          tagName: tagName.value,
        },
      },
    }

    await fetchSet('/workspace/export', 'POST', true, JSON.stringify(payload))
  }

  const handleLinkVisualization = (workspaceId: string) => () => {
    window.location.href = `/workspace/visualization?workspaceId=${workspaceId}`
  }

  const handleLinkEdit = (workspaceId: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = `/workspace/edit?workspaceId=${workspaceId}`
  }

  const handleClickDelete = (workspaceId: string) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    let result = await Swal.fire({
      title: 'Delete Workspace',
      text: `Are you sure delete ${workspaceId} Workspace?`,
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
    if (result.isConfirmed) {
      const response = await fetchSet(`/workspace?workspaceId=${workspaceId}`, 'DELETE', true)
      const { code } = await response.json()

      if (code / 100 === 2) {
        Swal.fire({
          title: 'SUCCESS',
          text: `DELETE ${workspaceId}`,
          icon: 'success',
          heightAuto: false,
        }).then(() => {
          window.location.reload()
        })
      } else {
        Swal.fire({
          title: 'ERROR',
          html: `
                ERROR in DELETE ${workspaceId}
                <br />
                <span>${code}</span>
                `,
          icon: 'error',
          heightAuto: false,
        })
      }
    }
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
                <div className={classes.icon} onClick={handleClickDelete(v.workspaceId)}>
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
              <CustomButton
                text="To Visualization"
                style={{ height: '28px', textAlign: 'center', fontSize: '14px', lineHeight: '28px', width: '100%', margin: '0px' }}
                onClick={handleLinkVisualization(v.workspaceId)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DefaultCodeView
