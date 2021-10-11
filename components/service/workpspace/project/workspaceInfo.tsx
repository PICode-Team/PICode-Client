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
  workspaceInfo: IWorkspace
  setWorkspaceInfo: React.Dispatch<React.SetStateAction<IWorkspace>>
  source: ISource | null
  type: ICreateType
  setSource: React.Dispatch<React.SetStateAction<ISource | null>>
  edit: boolean
}

function WorkspaceInfo(props: IWorkspaceInfoProps) {
  const { workspaceInfo, setWorkspaceInfo, type, source, setSource, edit } = props
  const classes = createWorkspaceStyle()
  const [upload, setUpload] = useState<boolean>(false)
  const [imageName, setImageName] = useState<string>('')
  const [fileName, setFileName] = useState<string>('')
  const [userList, setUserList] = useState<string[]>([])
  const fileButton = useRef<any>(null)

  useEffect(() => {
    setWorkspaceInfo({ ...workspaceInfo, participants: userList })
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

  const thumbnailDrop = async (e: any) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files !== undefined) {
      setImageName(files[0].name)
      let formData = new FormData()
      formData.append('uploadFile', files[0])
      const response = await fetchSet(`/data`, 'POST', true, formData)
      const { uploadFileId, code } = await response.json()

      if (code === 200) {
        setWorkspaceInfo({
          ...workspaceInfo,
          thumbnail: uploadFileId,
        })
      }
    }
  }

  const fileDrop = async (e: any) => {
    e.preventDefault()
    const files = e.dataTransfer.files
    if (files !== undefined) {
      setFileName(files[0].name)
      const formData = new FormData()
      formData.append('uploadFile', files[0])
      const response = await fetchSet('/userList', 'POST', true, formData)
      const { uploadFileId, code } = await response.json()

      if (code === 200) {
        if (source === null) {
          setSource({
            type: type,
            upload: {
              uploadFileId: uploadFileId,
            },
          })
        } else {
          setSource({
            ...source,
            upload: {
              ...source.upload,
              uploadFileId: uploadFileId,
            },
          })
        }
      }
    }
  }

  const handleFileButtonClick = () => {
    fileButton.current.click()
  }

  const onChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setWorkspaceInfo({ ...workspaceInfo, [event.target.id]: event.target.value })
  }

  const handleGitRepoChange = (event: any) => {
    setSource(
      source !== null
        ? { ...source, gitUrl: event.target.value }
        : {
            type: type,
            gitUrl: event.target.value,
          }
    )
  }

  const handleUploadFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const tmpImage = event.target.files

    if (tmpImage !== null) {
      const formData = new FormData()
      formData.append('uploadFile', tmpImage[0])
      const response = await fetchSet('/data', 'POST', false, formData)
      const { uploadFileId, code } = await response.json()

      if (code === 200) {
        if (source === null) {
          setSource({
            type: type,
            upload: {
              uploadFileId: uploadFileId,
            },
          })
        } else {
          setSource({
            ...source,
            upload: {
              ...source.upload,
              uploadFileId: uploadFileId,
            },
          })
        }
      }
    }
  }

  const handleIsExtractClick = (event: any) => {
    let tmpSource = cloneDeep(source)
    ;(tmpSource as any).upload.isExtract = event.currentTarget.checked
    setSource(tmpSource)
  }

  return (
    <React.Fragment>
      <div className={classes.subTitle}>{edit === true ? 'Edit' : 'Create'} Code</div>
      <CustomTextInput id="name" value={workspaceInfo.name} label="Workspace Name" placeholder="Input Workspace Name" onChange={onChangeInfo} />
      <div className={classes.divider}>
        <div />
      </div>
      <CustomTextarea id="description" value={workspaceInfo.description} label="Workspace Description" placeholder="Input Workspace Description" onChange={onChangeInfo} />
      <div className={classes.divider}>
        <div />
      </div>
      <div className={classes.doubleContent}>
        <div className={classes.textarea}>
          <span>Project Thumbnail</span>
          <div className={classes.imageUpload} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={thumbnailDrop} onClick={handleFileButtonClick}>
            {upload ? (
              <div className={classes.upload}>
                <div>
                  <InsertPhoto className={classes.uploadIcon} />
                </div>
                <span>{imageName !== '' ? imageName : 'Drop Image'}</span>
              </div>
            ) : (
              <>
                <div className={classes.textAlignCenter}>
                  <div>
                    <CloudUpload className={classes.uploadIcon} />
                  </div>
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
        <input ref={fileButton} className={classes.displayNone} type="file" id="getFile" onChange={handleUploadFileChange} />
        {type === 'upload' && (
          <React.Fragment>
            <div className={classes.textarea}>
              <span>
                Project Zip File
                <span className={classes.required}>*</span>
              </span>
              <div className={classes.isExtract}>
                is Extract?
                <input type="checkbox" defaultChecked={(source as any).upload ? (source as any).upload.isExtract : true} onClick={handleIsExtractClick} className={classes.verticalAlignMiddle} />
              </div>
              <div className={classes.imageUpload} onDragOver={dragOver} onDragEnter={dragEnter} onDragLeave={dragLeave} onDrop={fileDrop} onClick={handleFileButtonClick}>
                {upload ? (
                  <div className={classes.upload}>
                    <div>
                      <InsertPhoto className={classes.uploadIcon} />
                    </div>
                    <span>{fileName !== '' ? fileName : 'Drop File'}</span>
                  </div>
                ) : (
                  <>
                    <div style={{ textAlign: 'center' }}>
                      <div>
                        <CloudUpload className={classes.uploadIcon} />
                      </div>
                      <span>
                        <div>Drag and Drop File or</div>
                        <div>Click to upload File</div>
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>
          </React.Fragment>
        )}
      </div>
      <div className={classes.divider}>
        <div />
      </div>
      <CustomUserInput value={userList} setValue={setUserList} label="Project Participant" />
      {type === 'gitUrl' && (
        <React.Fragment>
          <div className={classes.divider}>
            <div />
          </div>
          <CustomTextInput value={source?.gitUrl ?? ''} label="Repository URL" placeholder="Input Repository URL" onChange={handleGitRepoChange} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default WorkspaceInfo