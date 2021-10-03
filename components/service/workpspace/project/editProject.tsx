import { useEffect, useState } from 'react'

import { useRouter } from 'next/router'
import Swal from 'sweetalert2'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { ICreateType, IDockerInfo, ISource, IWorkspace } from '../../../../types/workspace.types'
import { fetchSet } from '../../../context/fetch'
import CustomButton from '../../../items/button/button'
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
  const [workspaceInfo, setWorkspaceInfo] = useState<IWorkspace>(initialWorkspace)
  const [originWorkspace, setOriginWorkspace] = useState<IWorkspace>(initialWorkspace)
  const [dockerInfo, setDockerInfo] = useState<IDockerInfo>(initialDocker)
  const [source, setSource] = useState<ISource | null>(null)
  const [step, setStep] = useState<number>(2)
  const route = useRouter()
  const { workspaceId } = route.query

  const getWorkspaceData = async () => {
    const response = await fetchSet(`/workspace?workspaceId=${workspaceId}`, 'GET', true)
    const { workspaceList, code } = await response.json()

    if (code !== 200) return
    if (workspaceList.length === 0) return

    const [workspace] = workspaceList
    setOriginWorkspace({ ...workspace })
    setWorkspaceInfo({ ...workspace })
  }

  const getDockerData = async () => {
    const response = await fetchSet(`/docker?workspaceId=${workspaceId}`, 'GET', true)
    const { dockerInfo, code } = await response.json()

    if (code !== 200) return
    if (dockerInfo.length === 0) return

    const [docker] = dockerInfo
  }

  const handlePreviousButton = () => {
    if (step === 3) {
      setStep(step - 1)
    }
  }

  const handleNextButton = () => {
    if (step === 2) {
      setStep(3)
    } else {
      submitData()
    }
  }

  const submitData = async () => {
    const payload = {
      workspaceId,
      workspaceInfo,
      dockerInfo,
    }

    const response = await fetchSet('/workspace', 'PUT', true, JSON.stringify(payload))
    const { code } = await response.json()

    if (code === 200) {
      Swal.fire({
        title: 'SUCCESS',
        text: `Edit ${originWorkspace.name}`,
        icon: 'success',
        heightAuto: false,
      }).then(() => {
        window.location.href = '/'
      })
    } else {
      Swal.fire({
        title: 'ERROR',
        html: `ERROR Edit ${originWorkspace.name}
                    <br />
                    <span>${code}</span>`,
        icon: 'error',
        heightAuto: false,
      })
    }
  }

  useEffect(() => {
    getWorkspaceData()
    getDockerData()
  }, [])

  return (
    <div className={classes.create}>
      <div className={classes.header}>{`Create Codespace`}</div>
      <div className={classes.createWrapper}>
        <Stepper step={step} edit={true} />

        <div className={classes.inputWrapper}>
          {step === 2 && <WorkspaceInfo workspaceInfo={workspaceInfo} setWorkspaceInfo={setWorkspaceInfo} type={type} source={source} setSource={setSource} edit={true} />}
          {step === 3 && <DockerInfo dockerInfo={dockerInfo} setDockerInfo={setDockerInfo} edit={true} />}
          <div className={classes.content}>
            <div className={classes.inputContent}>
              <div className={classes.buttonBox}>
                <CustomButton text="PREV" color="secondary" onClick={handlePreviousButton} disable={step === 2} />
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
