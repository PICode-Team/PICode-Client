import React, { useEffect, useState } from 'react'
import { Search, Add } from '@material-ui/icons'
import { chatSidebarStyle } from '../../../../../styles/service/chatspace/chat'
import { IChannel } from '../../../../../types/chat.types'
import { IUser } from '../../../../../types/user.types'
import { fetchSet } from '../../../../context/fetch'
import { allTagRegex, imageRegex } from '../../../../context/regex'

interface ISidebarProps {
  channelList: IChannel[]
  setTarget: React.Dispatch<React.SetStateAction<IChannel | null>>
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function Sidebar(props: ISidebarProps) {
  const { channelList, setTarget, setModal } = props
  const classes = chatSidebarStyle()
  const [participantList, setParticipantList] = useState<IUser[]>([])
  const [search, setSearch] = useState<string>('')

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

  const handleSearchInputChange = (event: any) => {
    setSearch(event.target.value)
  }

  return (
    <div className={classes.sidebar}>
      <div className={classes.sidebarHeader}>
        <div className={classes.search}>
          <Search />
          <input type="text" placeholder="Search User or Channel" value={search} onChange={handleSearchInputChange} />
        </div>
      </div>
      <div className={classes.sidebarContent}>
        {channelList
          .filter((v) => v.chatName.indexOf(search) !== -1)
          .map((v, i) => {
            const thumbnailUrl = participantList.find((user) => user.userName === v.chatName)?.userThumbnail
            const filteredMessage = (v.recentMessage ?? '').replace(allTagRegex, '')
            const checkImage = (() => {
              const regexMessage = imageRegex.exec(v.recentMessage)
              if (regexMessage === null) return false
              return true
            })()
            const recentText = (() => {
              if (filteredMessage === '' && checkImage === true) {
                return '(image)'
              }
              return filteredMessage
            })()

            return (
              <div className={classes.channel} key={`channel-${i}`} onClick={handleClickChannel(v)}>
                <div
                  className={classes.channelThumbnail}
                  style={
                    thumbnailUrl !== undefined
                      ? {
                          backgroundImage: `url('/api/temp/${thumbnailUrl}')`,
                          backgroundSize: 'cover',
                        }
                      : {}
                  }
                ></div>
                <div className={classes.channelBody}>
                  <div className={classes.channelInfo}>
                    <span className={classes.channelName}>{v.chatName ?? v.userId!}</span>
                    <span className={classes.channelParticipant}>{v.chatName?.includes('#') && v.chatParticipant.length}</span>
                  </div>
                  <div className={classes.lastContent}>{recentText}</div>
                </div>
                <div className={classes.channelTail}>
                  <div className={classes.unreadMessage}></div>
                  <div className={classes.lastTime}>{v.recentTime !== '' && v.recentTime !== undefined && v.recentTime.split(' ')[0]}</div>
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
