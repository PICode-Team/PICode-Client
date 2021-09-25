export interface IWorkspace {
  projectName: string
  projectDescription: string
  projectThumbnail?: string
  projectParticipants?: string[]
}

export interface IDockerInfo {
  containerName: string
  image: string
  tag: string
  bridgeName: string
  bridgeAlias: string
  portInfo: IPortInfo
  linkContainer: string
}

export interface ISource {
  type: ICreateType
  gitUrl?: string
  upload?: {
    uploadFileId?: string
    isExtract?: boolean
  }
}

export type ICreateType = 'gitUrl' | 'upload' | 'nothing'

type IPortInfo = {
  [key in string]: number
}

export interface ICreateInfo {
  projectInfo: IWorkspace
  dockerInfo: IDockerInfo
  source?: ISource
}
