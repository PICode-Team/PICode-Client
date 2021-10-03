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
}

export interface IIssue {
  column: string
  title: string
  issueId: string
  content: string
  label: string
}
