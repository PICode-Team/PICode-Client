import { useEffect, useState } from 'react'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { ICreateType, IDockerInfo, ISource, IWorkspace } from '../../../../types/workspace.types'
import CustomButton from '../../../items/button/button'
import CreateType from './createType'
import DockerInfo from './dockerInfo'
import Stepper from './stepper'
import WorkspaceInfo from './workspaceInfo'

const initialWorkspace: IWorkspace = {
  name: '',
  description: '',
  participants: undefined,
  thumbnail: undefined,
}

const initialDocker: IDockerInfo = {
  containerName: '',
  image: '',
  tag: '',
  bridgeId: '',
  bridgeAlias: '',
  linkContainer: '',
  portInfo: {},
}

function EditProject() {
  const classes = createWorkspaceStyle()
  const [type, setType] = useState<ICreateType>('nothing')
  const [projectInfo, setProjectInfo] = useState<IWorkspace>(initialWorkspace)
  const [dockerInfo, setDockerInfo] = useState<IDockerInfo>(initialDocker)
  const [source, setSource] = useState<ISource | null>(null)
  const [step, setStep] = useState<number>(2)

  const handlePreviousButton = () => {
    if (step === 2) {
      setType('nothing')
      setProjectInfo(initialWorkspace)
      setDockerInfo(initialDocker)
    }
    setStep(step - 1)
  }

  const handleNextButton = () => {
    if (step === 2) {
      setStep(3)
    } else {
      submitData()
    }
  }

  const submitData = () => {}

  useEffect(() => {
    if (type === 'gitUrl') {
      setSource({
        type: 'gitUrl',
        gitUrl: undefined,
      })
    } else if (type === 'upload') {
      setSource({
        type: 'upload',
        upload: {
          uploadFileId: undefined,
          isExtract: true,
        },
      })
    } else {
      setSource({
        type: 'nothing',
      })
    }
  }, [type])

  return (
    <div className={classes.create}>
      <div className={classes.header}>{`Create Codespace`}</div>
      <div className={classes.createWrapper}>
        <Stepper step={step} edit={true} />

        <div className={classes.inputWrapper}>
          {step === 2 && <WorkspaceInfo projectInfo={projectInfo} setProjectInfo={setProjectInfo} type={type} source={source} setSource={setSource} edit={true} />}
          {step === 3 && <DockerInfo dockerInfo={dockerInfo} setDockerInfo={setDockerInfo} edit={true} />}
          <div className={classes.content}>
            <div className={classes.inputContent}>
              <div className={classes.buttonBox}>
                <CustomButton text="PREV" color="secondary" onClick={handlePreviousButton} />
                <CustomButton text={step === 3 ? 'SUBMIT' : 'NEXT'} color="primary" onClick={handleNextButton} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EditProject
