import { activitybarContentStyle } from '../../../../../styles/service/chatspace/chat'
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
  newMessage: boolean
  setThread: React.Dispatch<React.SetStateAction<IThread | null>>
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
  setNewMessage: React.Dispatch<React.SetStateAction<boolean>>
  toggle: boolean
}

function Content(props: IContentProps) {
  const { setNewMessage, thread, userId, threadEndRef, threadMessageRef, particiapntList, setThread, setMediaViewData, newMessage, toggle } = props
  const classes = activitybarContentStyle()

  const messageInfo = {
    sender: thread.parentUser,
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
    recentMessage: '',
    recentTime: '',
  }

  return (
    <div className={classes.activitybarContent}>
      <div className={classes.contentBox}>
        <MessageBox messageInfo={messageInfo} reverse={thread.parentUser === userId} setThread={setThread} particiapntList={particiapntList} target={null} setMediaViewData={setMediaViewData} />
        {thread.messageList.length > 0 && <Boundary text={`${thread.messageList.length} replies`} />}
        {renderMessage(thread.messageList, userId, true, setThread, null, particiapntList, setMediaViewData)}
        <div ref={threadEndRef} />
      </div>
      <ChatInput
        toggle={toggle}
        setNewMessage={setNewMessage}
        newMessage={false}
        messageRef={threadMessageRef}
        endRef={threadEndRef}
        typingUserList={[]}
        target={threadTarget}
        parentChatId={thread.parentId}
      />
    </div>
  )
}

export default Content
