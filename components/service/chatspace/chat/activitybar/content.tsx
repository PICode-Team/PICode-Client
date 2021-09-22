import { activitybarContentStyle } from '../../../../../styles/service/chat'
import { IThread } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import Boundary from '../../common/boundary'
import ChatInput from '../../common/chatInput'
import MessageBox from '../../common/messageBox'
import { renderMessage } from '../content/content'

interface IContentProps {
  thread: IThread
  userId: string
  target: string
  threadMessageRef: React.RefObject<HTMLInputElement>
  threadEndRef: React.RefObject<HTMLDivElement>
  setThread: React.Dispatch<React.SetStateAction<IThread | undefined>>
  particiapntList: IUser[]
}

function Content(props: IContentProps) {
  const { thread, userId, target, threadEndRef, threadMessageRef, particiapntList, setThread } = props
  const classes = activitybarContentStyle()

  const messageInfo = {
    user: thread.parentUser,
    message: thread.parentMessage,
    time: thread.parentTime,
    threadList: [],
    chatId: '',
  }

  return (
    <div className={classes.activitybarContent}>
      <div className={classes.contentBox}>
        <MessageBox messageInfo={messageInfo} reverse={false} setThread={setThread} particiapntList={particiapntList} target={target} />
        {thread.messageList.length > 0 && <Boundary text={`${thread.messageList.length} replies`} />}
        {renderMessage(thread.messageList, userId, true)}
        <div ref={threadEndRef} />
      </div>
      <ChatInput messageRef={threadMessageRef} endRef={threadEndRef} typingUserList={[]} target={target} />
    </div>
  )
}

export default Content
