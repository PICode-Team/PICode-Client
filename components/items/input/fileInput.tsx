import { makeStyles, createStyles } from '@material-ui/core'
import React from 'react'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const fileInputStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'flex',
      justifyContent: 'space-around',
      gap: '25px',
    },
    input: {
      width: '100%',
      backgroundColor: theme.backgroundColor.step1,
      filter: theme.brightness.step0,
      padding: '4px 8px',
      border: 'none',
      borderRadius: '2px',
      color: theme.font.high.color,
      height: '32px',
      lineHeight: '32px',
      flex: 1,
      outline: 'none',
    },
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
      marginRight: '8px',
      marginTop: '2px',
      width: '106px',
    },
    required: {
      color: '#C33030',
    },
  })
)

function CustomFileInput(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style, label, placeholder, value, required } = props
  const classes = fileInputStyle()

  return <React.Fragment></React.Fragment>
}

export default CustomFileInput
