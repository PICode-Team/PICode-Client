import { makeStyles, createStyles, TextField } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const dateStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    textField: {
      width: '100%',
      marginTop: '6px',
      color: `${theme.font.high.color} !important`,
      '& *': {
        fill: `${theme.font.high.color} !important`,
        color: `${theme.font.high.color} !important`,
        borderColor: `${theme.font.high.color} !important`,
      },
      '& input::-webkit-calendar-picker-indicator': {
        fill: `${theme.font.high.color} !important`,
        color: `${theme.font.high.color} !important`,
        filter: 'invert(48%) sepia(30%) saturate(0%) hue-rotate(203deg) brightness(90%) contrast(95%)',
      },
      '& input::-webkit-inner-spin-button': {
        fill: `${theme.font.high.color} !important`,
        color: `${theme.font.high.color} !important`,
      },
      '& svg': {
        color: theme.font.high.color,
      },
      '& .MuiInput-underline:before': {
        borderColor: 'rgba(255, 255, 255, 0.32) !important',
      },
      '& .MuiInput-underline:after': {
        borderColor: 'rgba(255, 255, 255, 0.62)',
      },
      '& .MuiInput-underline:before:hover': {
        borderColor: 'rgba(255, 255, 255, 0.62)',
      },
    },
  })
)

function CustomDate(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style, label, value } = props
  const classes = dateStyle()

  return (
    <TextField
      label={label}
      type="date"
      value={value}
      onChange={onChange}
      className={`${classes.textField} ${className}`}
      InputLabelProps={{
        shrink: true,
      }}
      style={style}
    />
  )
}

export default CustomDate
