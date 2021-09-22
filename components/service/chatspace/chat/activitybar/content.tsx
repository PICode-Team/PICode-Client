import { activitybarContentStyle } from '../../../../../styles/service/chat'
import { IChannel, IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Boundary from '../../common/boundary'
import ChatInput from '../../common/chatInput'
import MessageBox from '../../common/messageBox'
import { renderMessage } from '../content/content'

interface IContentProps {
  thread: IThread
  userId: string
  threadMessageRef: React.RefObject<HTMLInputElement>
  threadEndRef: React.RefObject<HTMLDivElement>
  particiapntList: IUser[]
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
}

function Content(props: IContentProps) {
  const { thread, userId, threadEndRef, threadMessageRef, particiapntList, setThread } = props
  const classes = activitybarContentStyle()

  const messageInfo = {
    user: thread.parentUser,
    message: thread.parentMessage,
    time: thread.parentTime,
    threadList: [],
    chatId: '',
  }

  const threadTarget = {
    chatName: thread.chatName,
    chatParticipant: [],
    creation: '',
    description: '',
    userId: '',
  }

  return (
    <div className={classes.activitybarContent}>
      <div className={classes.contentBox}>
        <MessageBox messageInfo={messageInfo} reverse={thread.parentUser === userId} setThread={setThread} particiapntList={particiapntList} target={null} />
        {thread.messageList.length > 0 && <Boundary text={`${thread.messageList.length} replies`} />}
        {renderMessage(thread.messageList, userId, true, setThread, null, particiapntList)}
        <div ref={threadEndRef} />
      </div>
      <ChatInput messageRef={threadMessageRef} endRef={threadEndRef} typingUserList={[]} target={threadTarget} />
    </div>
  )
}

export default Content
