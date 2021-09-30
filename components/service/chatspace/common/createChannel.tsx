import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../../styles/theme'
import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'
import CustomTextarea from '../../../items/input/textarea'
import CustomUserInput from '../../../items/input/userInput'
import CustomCheckbox from '../../../items/input/checkbox'
import { useWs } from '../../../context/websocket'

const createChannelStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

interface ICreateChannelProps {
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

interface ICreateChannelState {
  name: string
  description: string
  participants: string[]
}

const initialState: ICreateChannelState = {
  name: '',
  description: '',
  participants: [],
}

function CreateChannel(props: ICreateChannelProps) {
  const { modal, setModal } = props
  const classes = createChannelStyle()
  const [payload, setPayload] = useState<ICreateChannelState>(initialState)
  const [isDM, setIsDM] = useState<boolean>(false)
  const [userList, setUserList] = useState<string[]>([])
  const ws: any = useWs()

  const handleSubmit = () => {
    if (ws !== undefined && ws.readyState === WebSocket.CONNECTING) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'createChannel',
          data: {
            ...payload,
            name: isDM ? `#${payload.name}` : payload.name,
            participants: isDM ? payload.participants : undefined,
          },
        })
      )
    }
  }

  const handlePayload = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPayload({ ...payload, [event.target.id]: event.target.value })
  }

  const handleSetChannelType = () => {
    setIsDM(!isDM)
  }

  useEffect(() => {
    setPayload({
      ...payload,
      participants: userList,
    })
  }, [userList])

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit} title="Create Channel">
      <React.Fragment>
        <CustomTextInput onChange={handlePayload} id="name" value={payload.name} label="name" placeholder="name" />
        <CustomTextarea onChange={handlePayload} id="description" value={payload.description} label="description" placeholder="description" />
        <CustomCheckbox value={isDM} label="is direct message?" onClick={handleSetChannelType} />
        {!isDM && <CustomUserInput value={payload.participants} setValue={setUserList} label="Project Participant" />}
      </React.Fragment>
    </Modal>
  )
}

export default CreateChannel
