import React, { useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../../styles/theme'
import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'
import CustomTextarea from '../../../items/input/textarea'
import CustomUserInput from '../../../items/input/userInput'
import CustomCheckbox from '../../../items/input/checkbox'

const createChannelStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

interface ICreateChannelProps {
  title: string
  modal: boolean
  setModal: React.Dispatch<React.SetStateAction<boolean>>
}

function CreateChannel(props: ICreateChannelProps) {
  const { modal, setModal, title } = props
  const classes = createChannelStyle()
  const [name, setName] = useState<string>('')
  const [description, setDescription] = useState<string>('')
  const [isDM, setIsDM] = useState<boolean>(false)

  const handleModalSubmit = () => {}

  const handleSetChannelType = () => {
    setIsDM(!isDM)
  }

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleModalSubmit} title={title}>
      <React.Fragment>
        <CustomTextInput value={name} label="name" placeholder="name" />
        <CustomTextarea value={description} label="description" placeholder="description" />
        <CustomCheckbox value={isDM} label="is direct message?" onClick={handleSetChannelType} />
        {!isDM && <CustomUserInput />}
      </React.Fragment>
    </Modal>
  )
}

export default CreateChannel
