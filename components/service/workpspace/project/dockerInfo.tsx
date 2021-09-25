import React, { useState } from 'react'

import { Radio, RadioProps } from '@material-ui/core'
import { withStyles } from '@material-ui/styles'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { IDockerInfo } from '../../../../types/workspace.types'
import CustomTextInput from '../../../items/input/text'
import CustomPortInput from '../../../items/input/portInput'
import CustomSelect from '../../../items/input/select'

interface IDockerInfoProps {
  dockerInfo: IDockerInfo
  setDockerInfo: React.Dispatch<React.SetStateAction<IDockerInfo>>
  edit: boolean
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
  const { dockerInfo, setDockerInfo, edit } = props
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

  return (
    <React.Fragment>
      <div className={classes.subTitle}>{edit ? 'Edit' : 'Create'} Container</div>
      <div className={classes.sectionTitle}>Basic Info</div>
      <CustomTextInput value={dockerInfo.containerName} label="Container Name" placeholder="Input Container Name" />
      <CustomTextInput value={dockerInfo.image} label="Image" placeholder="Input Image" required={true} />
      <CustomTextInput value={dockerInfo.tag} label="Tag" placeholder="Input Tag" required={true} />
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
              <CustomTextInput value={dockerInfo.bridgeName} label="Network Name" placeholder="Input Network Name" />
              <CustomTextInput value={dockerInfo.bridgeAlias} label="Network Alias" placeholder="Input Bridge Alias" />
              <CustomSelect value={editDocker.addedContainer} label="Containers To Be Connected" />
            </React.Fragment>
          ) : (
            <CustomSelect value={editDocker.deletedNetwork} label="Deleted Network" />
          )}
        </React.Fragment>
      ) : (
        <React.Fragment>
          <div className={classes.sectionTitle}>
            <span>Network Info</span>
          </div>
          <CustomTextInput value={dockerInfo.bridgeName} label="Network Name" placeholder="Input Network Name" />
          <CustomTextInput value={dockerInfo.bridgeAlias} label="Network Alias" placeholder="Input Bridge Alias" />
          <CustomPortInput dockerInfo={dockerInfo} setDockerInfo={setDockerInfo} />
          <CustomTextInput value={dockerInfo.linkContainer} label="Containers To Be Connected" placeholder="Input Link Container" />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default DockerInfo
