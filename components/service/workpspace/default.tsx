import React, { useState } from 'react'

import { DeleteForever, Settings } from '@material-ui/icons'
import Swal from 'sweetalert2'

import { defaultStyle } from '../../../styles/service/workspace/default'
import { IWorkspaceSpec } from '../../../types/workspace.types'
import CustomButton from '../../items/button/button'

function DefaultCodeView() {
  const classes = defaultStyle()
  const [projectData, setProjectData] = useState<IWorkspaceSpec[]>([])

  const handleLinkCode = (projectName: string) => (event: React.MouseEvent) => {
    window.location.href = `/code?projectName=${projectName}`
  }

  const handleLinkIssue = (projectName: string) => (event: React.MouseEvent) => {
    window.location.href = `/manage?projectName=${projectName}`
  }

  const handleClickEdit = (projectName: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = `/project/edit?projectName=${projectName}`
  }

  const handleClickDelete = (projectName: string) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    const result = await Swal.fire({
      title: 'Delete Project',
      text: `Are you sure delete ${projectName} Project?`,
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })
    if (result.isConfirmed) {
      const resultData = await fetch(`/api/project?projectName=${projectName}`, {
        method: 'DELETE',
        mode: 'cors',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
      }).then((res) => res.json())

      if (resultData.code / 100 === 2) {
        Swal.fire({
          title: 'SUCCESS',
          text: `DELETE ${projectName}`,
          icon: 'success',
          heightAuto: false,
        }).then(() => {
          window.location.reload()
        })
      } else {
        Swal.fire({
          title: 'ERROR',
          html: `
                  ERROR in DELETE ${projectName}
                  <br />
                  <span>${resultData.code}</span>
                `,
          icon: 'error',
          heightAuto: false,
        })
      }
    }
  }

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
              <div className={classes.projectName}>{v.projectName}</div>
              <div className={classes.iconWrapper}>
                <div className={classes.icon} onClick={handleClickEdit(v.projectName)}>
                  <Settings />
                </div>
                <div className={classes.icon} onClick={handleClickDelete(v.projectName)}>
                  <DeleteForever />
                </div>
              </div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Author</div>
              <div className={classes.infoValue}></div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Creator</div>
              <div className={classes.infoValue}>{v.projectCreator}</div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Create time</div>
              <div className={classes.infoValue}></div>
            </div>
            <div className={classes.infoWrapper}>
              <div className={classes.infoKey}>Description</div>
              <div className={classes.infoValue}>{v.projectDescription}</div>
            </div>
            <div className={classes.buttonGroup}>
              <CustomButton text="To Code" style={{ height: '28px', textAlign: 'center', fontSize: '14px', lineHeight: '28px' }} onClick={handleLinkCode(v.projectName)} />
              <CustomButton text="To Issue" style={{ height: '28px', textAlign: 'center', fontSize: '14px', lineHeight: '28px' }} onClick={handleLinkIssue(v.projectName)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default DefaultCodeView
