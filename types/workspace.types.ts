export interface IWorkspaceSpec {
  name: string
  description: string
  language: string
  creator: string
  participants: string[]
  thumbnail?: string
}

export interface IWorkspace {
  name: string
  description: string
  thumbnail?: string
  participants?: string[]
}

export interface IDockerInfo {
  containerName?: string
  image: string
  tag?: string
  bridgeId?: string
  bridgeAlias?: string
  portInfo?: IPortInfo
  linkContainer?: string
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
