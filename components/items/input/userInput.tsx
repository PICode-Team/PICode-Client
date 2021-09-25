import { makeStyles, createStyles } from '@material-ui/core'
import { useState } from 'react'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'
import { IUser } from '../../../types/user.types'

const userInputStyle = makeStyles((theme: IThemeStyle) => createStyles({}))

function CustomUserInput(props: IItemDefautlProps & IInputProps) {
  const {} = props
  const classes = userInputStyle()
  const [participantList, setParticipantList] = useState<IUser[]>([])

  const getParticipantList = async () => {
    await fetch(`http://localhost:8000/api/userList`, {
      method: 'GET',
      mode: 'cors',
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.code === 200) {
          setParticipantList(res.user)
        }
      })
  }

  return <div></div>
}

export default CustomUserInput
