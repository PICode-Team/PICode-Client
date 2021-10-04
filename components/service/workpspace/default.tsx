import React, { useEffect, useState } from 'react'

import { DeleteForever, Settings } from '@material-ui/icons'
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

    if (code === 200) {
      setWorkspaceData(workspaceList)
    }
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
              <div className={classes.infoValue}>{v.creation}</div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Description</div>
              <div className={classes.infoValue}>{v.description === '' && 'no description'}</div>
            </div>
            <div className={classes.buttonGroup}>
              <CustomButton text="To Code" style={{ height: '28px', textAlign: 'center', fontSize: '14px', lineHeight: '28px' }} onClick={handleLinkCode(v.workspaceId)} />
              <CustomButton text="To Issue" style={{ height: '28px', textAlign: 'center', fontSize: '14px', lineHeight: '28px' }} onClick={handleLinkIssue(v.workspaceId)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DefaultCodeView
