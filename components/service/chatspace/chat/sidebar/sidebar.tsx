import { Search, Add } from '@material-ui/icons'
import { chatSidebarStyle } from '../../../../../styles/service/chat'
import { IChannel } from '../../../../../types/chat.types'

interface ISidebarProps {
  channelList: IChannel[]
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: ISidebarProps) {
  const { channelList, setTarget, setModal } = props
  const classes = chatSidebarStyle()

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <div className={classes.search}>
          <Search />
          <input type="text" placeholder="Search User or Channel" />
        </div>
      </div>
      <div className={classes.sidebarContent}>
        {channelList.map((v, i) => {
          return (
            <div
              className={classes.channel}
              key={`channel-${i}`}
              onClick={() => {
                setTarget(v)
              }}
            >
              <div
                className={classes.channelThumbnail}
                style={{
                  backgroundImage: '',
                  // userList?.find((user) => user.userId === v.chatName)?.userThumbnail === undefined
                  //   ? "url('/images/picode-7.svg')"
                  //   : `url('${API_SERVER}:8000/api/temp/${userList?.find((user) => user.userId === v.chatName)?.userThumbnail}')`,
                  // backgroundSize: userList?.find((user) => user.userId === v.chatName)?.userThumbnail === undefined ? 'contain' : 'cover,
                  backgroundPosition: 'center',
                  backgroundRepeat: 'no-repeat',
                }}
              ></div>
              <div className={classes.channelBody}>
                <div className={classes.channelInfo}>
                  <span className={classes.channelName}>{v.chatName ?? v.userId!}</span>
                  <span className={classes.channelParticipant}>{v.chatName?.includes('#') && `(${v.chatParticipant.join(', ')})`}</span>
                </div>
                <div className={classes.lastContent}>{v.description ?? 'this chat has no description'}</div>
              </div>
              <div className={classes.channelTail}>
                <div className={classes.unreadMessage}></div>
                <div className={classes.lastTime}>44 minutes</div>
              </div>
            </div>
          )
        })}
        <div
          className={classes.createChannel}
          onClick={() => {
            setModal(true)
          }}
        >
          <Add />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
