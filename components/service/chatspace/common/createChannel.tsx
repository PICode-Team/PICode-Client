import React, { useState } from 'react'

import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../../styles/theme'
import CustomTextInput from '../../../items/input/text'
import Modal from '../../../items/modal/modal'
import CustomTextarea from '../../../items/input/textarea'

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
  const [isChannel, setIsChannel] = useState<boolean>(false)

  const handleModalSubmit = () => {}

  return (
    <Modal modal={modal} setModal={setModal} onSubmit={handleModalSubmit} title={title}>
      <React.Fragment>
        <CustomTextInput value={name} label="name" placeholder="name" />
        <CustomTextarea value={description} label="description" placeholder="description" />
      </React.Fragment>
    </Modal>
  )
}

export default CreateChannel
