import { makeStyles, createStyles } from '@material-ui/core'

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
      filter: 'brightness(1.2)',
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
    imageUpload: {
      height: '100px',
      width: '100%',
      marginTop: '8px',
      marginBottom: '14px',
      border: `1px solid ${theme.font.small.color}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: theme.font.high.color,
    },
  })
)

function CustomThumbnailInput(props: IItemDefautlProps & IInputProps) {
  const { onChange, className, style, label, placeholder, value, required } = props
  const classes = fileInputStyle()

  return (
    <div className={classes.wrapper}>
      <span className={classes.label}>
        {label} Thumbnail
        {required && <span className={classes.required}>*</span>}
      </span>
      <input type="file" onChange={onChange} className={`${classes.input} ${className}`} style={style} placeholder={placeholder} value={value as string} />
    </div>
  )
}

export default CustomThumbnailInput
