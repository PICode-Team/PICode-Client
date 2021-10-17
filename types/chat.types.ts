export interface IChat {
  user: string
  time: string
  message: string
  chatId: string
  threadList: IChat[]
}

export interface IBoundary {
  text: string
}

export interface IChannel {
  chatName: string
  userId: string
  chatParticipant: string[]
  creation: string
  description: string
  recentMessage: string
  recentTime: string
}

export interface IThread {
  parentUser: string
  parentMessage: string
  chatName: string
  messageList: IChat[]
  parentId: string
  parentTime: string
  parentChatParticipant: string[]
}
