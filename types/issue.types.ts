export interface IMilestone {
  uuid: string
  title: string
  content: string
  startDate: string
  endDate: string
}

export interface IKanban {
  uuid: string
  title: string
  description: string
  doneIssue: number
  nextIssue: number
  totalIssue: number
  columns: string[]
  workspaceId: string
}

export interface IIssue {
  uuid: string
  column: string
  creator: string
  title: string
  issueId: string
  content: string
  label: string
  assigner: string[]
}
