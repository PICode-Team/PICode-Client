import React, { useEffect, useState } from 'react'
import { Search, Add } from '@material-ui/icons'
import { chatSidebarStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { fetchSet } from '../../../../context/fetch'
import { API_SERVER } from '../../../../../constants/serverUrl'

interface ISidebarProps {
  channelList: IChannel[]
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: ISidebarProps) {
  const { channelList, setTarget, setModal } = props
  const classes = chatSidebarStyle()
  const [participantList, setParticipantList] = useState<IUser[]>([])

  const getParticipantList = async () => {
    const response = await fetchSet('/userList', 'GET', false)
    const { user, code } = await response.json()

    if (code !== 200) return

    setParticipantList(user)
  }

  useEffect(() => {
    getParticipantList()
  }, [])

  const handleClickChannel = (targetChannel: IChannel) => (event: React.MouseEvent<HTMLDivElement>) => {
    setTarget(targetChannel)
  }

  const handleCreateChannel = () => {
    setModal(true)
  }

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
          const thumbnailUrl = participantList.find((user) => user.userName === v.chatName)?.userThumbnail

          return (
            <div className={classes.channel} key={`channel-${i}`} onClick={handleClickChannel(v)}>
              <div
                className={classes.channelThumbnail}
                style={
                  thumbnailUrl !== undefined
                    ? {
                        backgroundImage: `url('${API_SERVER}:80/api/temp/${thumbnailUrl}')`,
                        backgroundSize: 'cover',
                      }
                    : {}
                }
              ></div>
              <div className={classes.channelBody}>
                <div className={classes.channelInfo}>
                  <span className={classes.channelName}>{v.chatName ?? v.userId!}</span>
                  <span className={classes.channelParticipant}>{v.chatName?.includes('#') && `(${v.chatParticipant.join(', ')})`}</span>
                </div>
                <div className={classes.lastContent}>{v.recentMessage ?? ''}</div>
              </div>
              <div className={classes.channelTail}>
                <div className={classes.unreadMessage}></div>
                <div className={classes.lastTime}>{v.recentTime !== undefined && v.recentTime.split(' ')[0]}</div>
              </div>
            </div>
          )
        })}
        <div className={classes.createChannel} onClick={handleCreateChannel}>
          <Add />
        </div>
      </div>
    </div>
  )
}

export default Sidebar
