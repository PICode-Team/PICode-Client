export interface INoteContent {
  text: string
  content?: any //table 이나 이미지 같은 거 넣을 때 사용할 듯
  type?: string
  clicked?: boolean
}

export interface IFileView {
  title: string
  createTime: string
  type?: string[]
  isFolder?: boolean
  creator: string[]
  children?: IFileView[]
  content?: INoteContent[]
  open?: boolean
  documentId: string
  path: string
}
