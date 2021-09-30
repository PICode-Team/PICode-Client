import React, { useEffect, useState } from 'react'

import { Radio, RadioProps } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { IDockerInfo } from '../../../../types/workspace.types'
import CustomTextInput from '../../../items/input/text'
import CustomPortInput from '../../../items/input/portInput'
import CustomSelect from '../../../items/input/select'
import { fetchSet } from '../../../context/fetch'

interface IDockerInfoProps {
  dockerInfo: IDockerInfo
  setDockerInfo: React.Dispatch<React.SetStateAction<IDockerInfo>>
  edit: boolean
  projectName?: string
}

interface IEditDocker {
  addedContainer: string
  deletedNetwork: string
}

const CustomRadio = withStyles({
  root: {
    color: '#4078b8 !important',
    '&$checked': {
      color: '#488cd9',
    },
  },
  checked: {},
})((props: RadioProps) => <Radio color="default" {...props} />)

const initialState: IEditDocker = {
  addedContainer: '',
  deletedNetwork: '',
}

function DockerInfo(props: IDockerInfoProps) {
  const { dockerInfo, setDockerInfo, edit, projectName } = props
  const classes = createWorkspaceStyle()
  const [add, setAdd] = useState<boolean>(false)
  const [networkList, setNetworkList] = useState<any[]>([])
  const [containerList, setContainerList] = useState<any[]>([])
  const [editDocker, setEditDocker] = useState<IEditDocker>(initialState)

  const handleRadio = (e: any) => {
    if (e.currentTarget.id === 'add') {
      setAdd(true)
    } else {
      setAdd(false)
    }
  }

  const getNetworkList = async () => {
    const response = await fetchSet('/docker/network', 'GET', true)
    const { networkList, code } = await response.json()

    if (code === 200) {
      setNetworkList(networkList)
    }
  }

  const getContainerList = async (projectName: string) => {
    const response = await fetchSet(`docker?projectName=${projectName}`, 'GET', true)
    const { containers, code } = await response.json()

    if (code === 200) {
      setContainerList(containers)
    }
  }

  useEffect(() => {
    if (edit === true && projectName !== undefined) {
      getNetworkList()
      getContainerList(projectName)
    }
  }, [])

  const onChangeInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDockerInfo({ ...dockerInfo, [event.target.id]: event.target.value })
  }

  const onChangeEditedInfo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditDocker({ ...editDocker, [event.target.id]: event.target.value })
  }

  return (
    <React.Fragment>
      <div className={classes.subTitle}>{edit ? 'Edit' : 'Create'} Container</div>
      <div className={classes.sectionTitle}>Basic Info</div>
      <CustomTextInput id="containerName" value={dockerInfo.containerName ?? ''} label="Container Name" placeholder="Input Container Name" onChange={onChangeInfo} />
      <CustomTextInput id="image" value={dockerInfo.image} label="Image" placeholder="Input Image" required={true} onChange={onChangeInfo} />
      <CustomTextInput id="tag" value={dockerInfo.tag ?? ''} label="Tag" placeholder="Input Tag" onChange={onChangeInfo} />
      <div className={classes.divider}>
        <div></div>
      </div>

      {edit ? (
        <React.Fragment>
          <div className={classes.sectionTitle}>
            <span>Network Info</span>
            <div className={classes.radioWrapper}>
              <CustomRadio id="add" checked={add} onChange={handleRadio} />
              <span className={classes.radioLabel}>Add</span>
              <CustomRadio id="delete" checked={!add} onChange={handleRadio} />
              <span className={classes.radioLabel}>Delete</span>
            </div>
          </div>
          {add === true ? (
            <React.Fragment>
              <CustomTextInput id="bridgeId" value={dockerInfo.bridgeId ?? ''} label="Bridge Name" placeholder="Input Bridge Name" onChange={onChangeInfo} />
              <CustomTextInput id="bridgeAlias" value={dockerInfo.bridgeAlias ?? ''} label="Bridge Alias" placeholder="Input Bridge Alias" onChange={onChangeInfo} />
              <CustomSelect id="addedContainer" value={editDocker.addedContainer} label="Containers To Be Connected" onChange={onChangeEditedInfo} />
            </React.Fragment>
          ) : (
            <CustomSelect id="deletedNetwork" value={editDocker.deletedNetwork} label="Deleted Network" onChange={onChangeEditedInfo} />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classes.sectionTitle}>
            <span>Network Info</span>
          </div>
          <CustomTextInput id="bridgeId" value={dockerInfo.bridgeId ?? ''} label="Bridge Name" placeholder="Input Bridge Name" onChange={onChangeInfo} />
          <CustomTextInput id="bridgeAlias" value={dockerInfo.bridgeAlias ?? ''} label="Bridge Alias" placeholder="Input Bridge Alias" onChange={onChangeInfo} />
          <CustomPortInput dockerInfo={dockerInfo} setDockerInfo={setDockerInfo} />
          <CustomTextInput id="linkContainer" value={dockerInfo.linkContainer ?? ''} label="Containers To Be Connected" placeholder="Input Link Container" onChange={onChangeInfo} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default DockerInfo
