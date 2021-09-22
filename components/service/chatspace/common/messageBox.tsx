import { FavoriteBorderOutlined, SmsOutlined } from '@material-ui/icons'
import { API_SERVER } from '../../../../constants/serverUrl'
import { messageBoxStyle } from '../../../../styles/service/chat'
import { IChannel, IChat, IThread } from '../../../../types/chat.types'
import { IUser } from '../../../../types/user.types'

interface IMessageBox {
  user: string
  time: string
  message: string
  chatId: string
  threadList: IChat[]
}

interface IMessageBoxProps {
  messageInfo: IMessageBox
  reverse: boolean
  setThread: React.Dispatch<React.SetStateAction<IThread | undefined>>
  target: IChannel
  particiapntList: IUser[]
}

const getTimeText = (time: string) => {
  const timeValue = time.split(' ')[1].split(':')
  const meridiem = Number(timeValue[0]) > 11 ? 'PM' : 'AM'
  const hour = (() => {
    const convertedHour = Number(timeValue[0])

    if (convertedHour % 12 === 0) {
      return '12'
    }

    if (convertedHour < 12) {
      return timeValue[0]
    } else {
      if (convertedHour % 12 < 10) {
        return `0${convertedHour % 12}`
      }

      return `${convertedHour % 12}`
    }
  })()

  return `${meridiem} ${hour}:${timeValue[1]}`
}

function MessageBox(props: IMessageBoxProps) {
  const { messageInfo, reverse, target, particiapntList, setThread } = props
  const { user, message, time, chatId, threadList } = messageInfo
  const classes = messageBoxStyle()

  return (
    <div className={classes.messageBox}>
      <div
        className={classes.thumbnail}
        style={{
          backgroundImage:
            particiapntList.find((v) => v.userId === user)?.userThumbnail === undefined
              ? 'none'
              : ` url('${API_SERVER}:8000/api/temp/${particiapntList?.find((v) => v.userId === user)?.userThumbnail}')`,

          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className={classes.messageInfo}>
        <div className={classes.target}>{user}</div>
        <div className={classes.textWrapper}>
          <span className={classes.messageText}>{message}</span>
          <span className={classes.time}>
            <span>{getTimeText(time)}</span>
            <div className={classes.messageInteraction}>
              <div
                className={classes.interactionIcon}
                onClick={() => {
                  setThread({
                    chatName: target.chatName ?? (target.userId as string),
                    messageList: threadList,
                    parentId: chatId,
                    parentMessage: message,
                    parentTime: time,
                    parentUser: user,
                  })
                }}
              >
                <SmsOutlined />
              </div>
              <div className={classes.interactionDivider} />
              <div className={classes.interactionIcon}>
                <FavoriteBorderOutlined />
              </div>
            </div>
          </span>
        </div>
        {threadList.length > 0 && (
          <div
            className={classes.thread}
            onClick={() => {
              setThread({
                chatName: target.chatName ?? (target.userId as string),
                messageList: threadList,
                parentId: chatId,
                parentMessage: message,
                parentTime: time,
                parentUser: user,
              })
            }}
          >
            <div className={classes.threadParticipant}>
              {particiapntList.map((v, i) => (
                <div key={`${chatId}-thread-${i}`}></div>
              ))}
            </div>
            <div className={classes.threadCount}>{threadList.length} replies</div>
            <div className={classes.lastThread}>Last reply {threadList.slice(-1)[0].time} ago</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MessageBox
