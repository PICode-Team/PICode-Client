import React, { useEffect, useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'
import CustomTextarea from '../../../items/input/textarea'
import CustomUserInput from '../../../items/input/userInput'
import CustomCheckbox from '../../../items/input/checkbox'
import CustomMonoUserInput from '../../../items/input/monoUserInput'
import { IThemeStyle } from '../../../../styles/theme'
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
  const [name, setName] = useState<string>('')
  const ws: any = useWs()

  const handleSubmit = () => {
    if (ws !== undefined && ws.readyState === WebSocket.OPEN) {
      ws.send(
        JSON.stringify({
          category: 'chat',
          type: 'createChannel',
          data: {
            ...payload,
            target: isDM ? name : `#${payload.name}`,
            chatParticipant: isDM ? undefined : payload.participants,
          },
        })
      )
    }
    setPayload(initialState)
    setName('')
    setUserList([])
    setModal(false)
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
        {isDM ? <CustomMonoUserInput setValue={setName} value={name} label="name" /> : <CustomTextInput onChange={handlePayload} id="name" value={payload.name} label="name" placeholder="name" />}
        <CustomTextarea onChange={handlePayload} id="description" value={payload.description} label="description" placeholder="description" />
        {!isDM && <CustomUserInput value={userList} setValue={setUserList} label="Project Participant" />}
        <CustomCheckbox value={isDM} label="is direct message?" onClick={handleSetChannelType} />
      </React.Fragment>
    </Modal>
  )
}

export default CreateChannel
