import { Add, Close, FilterNone } from '@material-ui/icons'
import { useState } from 'react'

import { messengerStyle } from '../../../../styles/service/chatspace/messenger'
import { IChannel } from '../../../../types/chat.types'
import CreateChannel from '../common/createChannel'
import Row from './row'

interface IHomeProps {
  channelList: IChannel[]
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
}

function Home(props: IHomeProps) {
  const { channelList, setOpen, setTarget } = props
  const classes = messengerStyle()
  const [modal, setModal] = useState<boolean>(false)

  const handleLinkChatspace = () => {
    window.location.href = '/chatspace'
  }

  const handleClickCancel = () => {
    setOpen(false)
  }

  const handleShowModal = () => {
    setModal(true)
  }

  return (
    <div className={classes.messenger}>
      <div className={classes.wrapper}>
        <div className={classes.homeHeader}>
          <div className={classes.opponent}>
            <div className={classes.name}>
              <span>ChatSpace</span>
            </div>
            <div className={classes.online}></div>
          </div>
          <div className={classes.expand} onClick={handleLinkChatspace}>
            <FilterNone />
          </div>
          <div className={classes.cancel} onClick={handleClickCancel}>
            <Close />
          </div>
        </div>
        <div className={classes.homeBody}>
          {channelList.map((v, i) => (
            <Row key={`messenger-row-${i}`} target={v} setTarget={setTarget} classes={classes} />
          ))}
          <div className={classes.createChannel} onClick={handleShowModal}>
            <Add className={classes.add} />
          </div>
        </div>
        <div className={classes.homeFooter}></div>
      </div>
      <CreateChannel modal={modal} setModal={setModal} title="Create Channel" />
    </div>
  )
}

export default Home
