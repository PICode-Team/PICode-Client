import React, { useEffect, useRef, useState } from 'react'

import { CloudUpload, InsertPhoto } from '@material-ui/icons'
import { cloneDeep } from 'lodash'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { ICreateType, ISource, IWorkspace } from '../../../../types/workspace.types'
import CustomTextInput from '../../../items/input/text'
import CustomTextarea from '../../../items/input/textarea'
import CustomUserInput from '../../../items/input/userInput'
import CustomFileInput from '../../../items/input/fileInput'
import CustomThumbnailInput from '../../../items/input/thumbnailInput'
import { fetchSet } from '../../../context/fetch'

interface IWorkspaceInfoProps {
  projectInfo: IWorkspace
  setProjectInfo: React.Dispatch<React.SetStateAction<IWorkspace>>
  source: ISource | null
  type: ICreateType
  setSource: React.Dispatch<React.SetStateAction<ISource | null>>
  edit: boolean
}

function WorkspaceInfo(props: IWorkspaceInfoProps) {
  const { projectInfo, setProjectInfo, type, source, setSource, edit } = props
  const classes = createWorkspaceStyle()
  const [upload, setUpload] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')
  const [fileeName, setFileName] = useState<string>('')
  const [userList, setUserList] = useState<string[]>([])
  const fileButton = useRef<any>(null)

  useEffect(() => {
    setProjectInfo({ ...projectInfo, projectParticipants: userList })
  }, [userList])

  const dragOver = (e: any) => {
    e.preventDefault()
  }

  const dragEnter = (e: any) => {
    e.preventDefault()
    setUpload(true)
  }

  const dragLeave = (e: any) => {
    e.preventDefault()
    setUpload(false)
  }

  const ThumbnailDrop = async (e: any) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files !== undefined) {
      setImageName(files[0].name)
      let formData = new FormData()
      formData.append('uploadFile', files[0])
      const result = await fetchSet(`/data`, 'POST', true, formData).then((res) => res.json())
      if (result.code === 200) {
        setProjectInfo({
          ...projectInfo,
          projectThumbnail: result.uploadFileId,
        })
      }
    }
  }

  const fileDrop = async (e: any) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files !== undefined) {
      setFileName(files[0].name)
      let formData = new FormData()
      formData.append('uploadFile', files[0])
      const result = await fetchSet('/userList', 'POST', true, formData).then((res) => res.json())

      if (result.code === 200) {
        let tmpSource = source
        ;(tmpSource as any).upload.uploadFileId = result.uploadFileId
        setSource(tmpSource)
      }
    }
  }

  const onChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProjectInfo({ ...projectInfo, [event.target.id]: event.target.value })
  }

  return (
    <React.Fragment>
      <div className={classes.subTitle}>Create Code</div>
      <CustomTextInput id="projectName" value={projectInfo.projectName} label="Workspace Name" placeholder="Input Workspace Name" onChange={onChangeInfo} />
      <div className={classes.divider}>
        <div />
      </div>
      <CustomTextarea id="projectDescription" value={projectInfo.projectDescription} label="Workspace Description" placeholder="Input Workspace Description" onChange={onChangeInfo} />
      <div className={classes.divider}>
        <div />
      </div>
      <div className={classes.doubleContent}>
        <div className={classes.textarea}>
          <span>Project Thumbnail</span>
          <div className={classes.imageUpload} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={ThumbnailDrop} onClick={() => fileButton.current.click()}>
            {upload ? (
              <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
                <InsertPhoto style={{ width: '40px', height: '40px' }} />
                <br />
                <span>{imageName !== '' ? imageName : 'Drop Image'}</span>
              </div>
            ) : (
              <>
                <div style={{ textAlign: 'center' }}>
                  <CloudUpload style={{ width: '40px', height: '40px' }} />
                  <br />
                  <span>
                    {edit === true ? (
                      'If you want change image, upload image'
                    ) : (
                      <React.Fragment>
                        <div>Drag and Drop Image or</div>
                        <div>Click to upload Image</div>
                      </React.Fragment>
                    )}
                  </span>
                </div>
              </>
            )}
          </div>
        </div>
        {type === 'upload' && (
          <React.Fragment>
            <div className={classes.textarea}>
              <span>
                Project Zip File
                <span className={classes.required}>*</span>
              </span>
              <div
                style={{
                  display: 'inline-block',
                  color: '#ffffff',
                  fontSize: '12px',
                  float: 'right',
                }}
              >
                is Extract?
                <input
                  type="checkbox"
                  checked={(source as any).upload ? (source as any).upload.isExtract : true}
                  onClick={(e) => {
                    let tmpSource = cloneDeep(source)
                    ;(tmpSource as any).upload.isExtract = e.currentTarget.checked
                    setSource(tmpSource)
                  }}
                  style={{ verticalAlign: 'middle' }}
                />
              </div>
              <div className={classes.imageUpload} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop} onClick={() => fileButton.current.click()}>
                {upload ? (
                  <div style={{ textAlign: 'center', pointerEvents: 'none' }}>
                    <InsertPhoto style={{ width: '40px', height: '40px' }} />
                    <br />
                    <span>{fileeName !== '' ? fileeName : 'Drop File'}</span>
                  </div>
                ) : (
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <CloudUpload style={{ width: '40px', height: '40px' }} />
                      <br />
                      <span>
                        <div>Drag and Drop File or</div>
                        <div>Click to upload File</div>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
            <input
              ref={fileButton}
              style={{ display: 'none' }}
              type="file"
              id="getFile"
              onChange={async (e) => {
                let tmpImage = e.target.files
                if (tmpImage !== null) {
                  let formData = new FormData()
                  formData.append('uploadFile', tmpImage[0])
                  const result = await fetchSet('/userList', 'POST', true, formData).then((res) => res.json())
                  if (result.code === 200) {
                    let tmpSource = source
                    ;(tmpSource as any).upload.uploadFileId = result.uploadFileId
                    setSource(tmpSource)
                  }
                }
              }}
            />
          </React.Fragment>
        )}
      </div>
      <div className={classes.divider}>
        <div />
      </div>
      <CustomUserInput value={userList} setValue={setUserList} label="Project Participant" />
      <div className={classes.divider}>
        <div />
      </div>
      {type === 'gitUrl' && <CustomTextInput value={source?.gitUrl ?? ''} label="Repository URL" placeholder="Input Repository URL" />}

      <div className={classes.doubleContent}></div>
    </React.Fragment>
  )
}

export default WorkspaceInfo
