import { Add, Close, FilterNone } from '@material-ui/icons'

import { messengerStyle } from '../../../../styles/service/messenger'
import { IChannel } from '../../../../types/chat.types'
import Row from './row'

interface IHomeProps {
  channelList: IChannel[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function Home(props: IHomeProps) {
  const { channelList, setOpen, setTarget, setModal } = props
  const classes = messengerStyle()

  return (
    <div className={classes.messenger}>
      <div className={classes.wrapper}>
        <div className={classes.homeHeader}>
          <div className={classes.opponent}>
            <div className={classes.name}>
              <span
                style={{
                  marginRight: '4px',
                  fontSize: '18px',
                  fontWeight: 'bold',
                }}
              >
                Chatting
              </span>
            </div>
            <div className={classes.online}></div>
          </div>
          <div
            className={classes.expand}
            onClick={() => {
              window.location.href = '/chat'
            }}
          >
            <FilterNone />
          </div>
          <div
            className={classes.cancel}
            onClick={() => {
              setOpen(false)
            }}
          >
            <Close />
          </div>
        </div>
        <div className={classes.homeBody}>
          {channelList.map((v, i) => (
            <Row key={`messenger-row-${i}`} target={v} setTarget={setTarget} classes={classes} />
          ))}
          <div
            className={classes.row}
            onClick={() => {
              setModal(true)
            }}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Add style={{ color: '#ffffff', width: '30px', height: '30px' }} />
          </div>
        </div>
        <div className={classes.homeFooter}></div>
      </div>
    </div>
  )
}

export default Home
