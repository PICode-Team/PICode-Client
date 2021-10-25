import { useEffect, useState } from 'react'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { ICreateInfo, ICreateType, IDockerInfo, ISource, IWorkspace } from '../../../../types/workspace.types'
import { fetchSet } from '../../../context/fetch'
import CustomButton from '../../../items/button/button'
import Alert from '../../../items/modal/alert'
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

function CreateProject() {
  const classes = createWorkspaceStyle()
  const [type, setType] = useState<ICreateType>('nothing')
  const [workspaceInfo, setWorkspaceInfo] = useState<IWorkspace>(initialWorkspace)
  const [dockerInfo, setDockerInfo] = useState<IDockerInfo>(initialDocker)
  const [source, setSource] = useState<ISource | null>(null)
  const [step, setStep] = useState<number>(1)
  const [modal, setModal] = useState<boolean>(false)

  const handlePreviousButton = () => {
    if (step === 2) {
      setType('nothing')
      setWorkspaceInfo(initialWorkspace)
      setDockerInfo(initialDocker)
      setSource(null)
    }
    setStep(step - 1)
  }

  const handleNextButton = () => {
    if (step === 2) {
      if (workspaceInfo.name === '') {
        setModal(true)
        return
      }
      setStep(3)
    } else {
      if (dockerInfo.image === '') {
        setModal(true)
        return
      }
      submitData()
    }
  }

  const submitData = async () => {
    const payload: ICreateInfo = {
      workspaceInfo: { ...workspaceInfo, participants: workspaceInfo.participants && workspaceInfo.participants.length > 0 ? workspaceInfo.participants : undefined },
      dockerInfo: {
        containerName: dockerInfo.containerName !== '' ? dockerInfo.containerName : undefined,
        image: dockerInfo.image,
        tag: dockerInfo.tag !== '' ? dockerInfo.tag : undefined,
        bridgeId: dockerInfo.bridgeId !== '' ? dockerInfo.bridgeId : undefined,
        bridgeAlias: dockerInfo.bridgeAlias !== '' ? dockerInfo.bridgeAlias : undefined,
        portInfo: dockerInfo.portInfo,
        linkContainer: dockerInfo.linkContainer !== '' ? dockerInfo.linkContainer : undefined,
      },
      source: source !== null ? source : undefined,
    }

    const response = await fetchSet('/workspace', 'POST', true, JSON.stringify(payload))
    const { code } = await response.json()

    if (code === 200) {
      window.location.href = '/'
    }
  }

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
        <Stepper step={step} edit={false} />

        <div className={classes.inputWrapper} style={{ width: step === 1 ? '100%' : '', height: step === 1 ? '100%' : '' }}>
          {step === 1 && <CreateType setStep={setStep} setType={setType} />}
          {step === 2 && <WorkspaceInfo workspaceInfo={workspaceInfo} setWorkspaceInfo={setWorkspaceInfo} type={type} source={source} setSource={setSource} edit={false} />}
          {step === 3 && <DockerInfo dockerInfo={dockerInfo} setDockerInfo={setDockerInfo} edit={false} />}
          {step > 1 && (
            <div className={classes.content}>
              <div className={classes.inputContent}>
                <div className={classes.buttonBox}>
                  <CustomButton text="PREV" color="secondary" onClick={handlePreviousButton} />
                  <CustomButton text={step === 3 ? 'SUBMIT' : 'NEXT'} color="primary" onClick={handleNextButton} />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Alert modal={modal} setModal={setModal} title="Empty Space" description="Please fill in the essential information." />
    </div>
  )
}

export default CreateProject
