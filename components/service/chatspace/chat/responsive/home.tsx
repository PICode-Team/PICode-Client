import { Add } from '@material-ui/icons'
import { responsiveHomeStyle } from '../../../../../styles/service/chat'
import { IChannel } from '../../../../../types/chat.types'
import Row from './row'

interface IHomeProps {
  channelList: IChannel[]
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function Home(props: IHomeProps) {
  const { channelList, setTarget, setModal } = props
  const classes = responsiveHomeStyle()

  const handleCreateChannel = () => {
    setModal(true)
  }

  return (
    <div className={classes.home}>
      <div className={classes.wrapper}>
        <div className={classes.header}>
          <div className={classes.channel}>
            <div className={classes.name}>
              <span>ChatSpace</span>
            </div>
            <div className={classes.online}></div>
          </div>
        </div>
        <div className={classes.body}>
          {channelList.map((v, i) => (
            <Row key={`responsive-chat-row-${i}`} setTarget={setTarget} classes={classes} target={v} />
          ))}
          <div className={`${classes.row} ${classes.createChannel}`} onClick={handleCreateChannel}>
            <Add />
          </div>
        </div>
        <div className={classes.footer}></div>
      </div>
    </div>
  )
}

export default Home
