import React from 'react'

import { makeStyles, createStyles } from '@material-ui/core'
import { TextField } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'

const textFiledStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    textfield: {
      backgroundColor: 'transparent',
      color: theme.font.medium.color,
      width: '100%',
      height: '48px',
      marginBottom: '15px',
      borderBottom: '1px solid' + theme.font.medium.color,
      '&>div': {
        color: theme.font.medium.color,
      },
      '&>div:hover': {
        color: theme.font.medium.color,
        borderBottom: '2px solid ' + theme.font.medium.color,
      },
      '&>div:after': {
        borderBottom: '1px solid ' + theme.font.medium.color,
      },
      '&>label.Mui-focused': {
        color: theme.font.medium.color,
      },
      '&>label': {
        color: theme.font.medium.color,
      },
    },
  })
)

interface ITextFieldProps {
  label: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  id?: string
  type?: string
  error?: boolean
  errorText?: string
  onKeyPress?: (event: React.KeyboardEvent) => void
  width?: string
  height?: string
}

function CustomTextField(props: ITextFieldProps) {
  const { label, onChange, type, error, errorText, onKeyPress, width, height, id } = props
  const classes = textFiledStyle()
  return (
    <TextField
      id={id}
      label={label}
      className={classes.textfield}
      type={type}
      onChange={onChange}
      error={error}
      onKeyPress={onKeyPress}
      helperText={error ? errorText : ''}
      style={{
        width: width ? width : '100%',
        height: height ? height : '48px',
      }}
    />
  )
}

export default CustomTextField
