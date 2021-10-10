import { makeStyles, createStyles } from '@material-ui/core'

import { IThemeStyle } from '../../../styles/theme'
import { IItemDefautlProps, IInputProps } from '../../../types/item.types'

const selectStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
    },
    select: {
      flex: 1,
      borderRadius: '2px',
      color: theme.font.high.color,
      background: '#3b434c',
      padding: '4px 8px',
      width: '100%',
      height: '32px',
      outline: 'none',
      border: 'none',
    },
    option: {
      height: '32px',
      '&:disabled': {
        color: theme.font.low.color,
      },
    },
    label: {
      color: theme.font.high.color,
      fontSize: theme.font.small.size,
      marginRight: '8px',
      marginTop: '2px',
      width: '106px',
    },
  })
)

function CustomSelect(props: IItemDefautlProps & IInputProps) {
  const { label, placeholder, optionList, onChange, id } = props
  const classes = selectStyle()

  return (
    <div className={classes.wrapper}>
      <span className={classes.label}>{label}</span>
      <select id={id} defaultValue="" className={classes.select} onChange={onChange as any}>
        {placeholder !== undefined && placeholder !== '' && (
          <option value="" className={classes.option} disabled>
            {placeholder}
          </option>
        )}
        {optionList?.map((v, i) => (
          <option key={`${v.value}-option-${i}`} value={v.value} className={classes.option}>
            {v.name}
          </option>
        ))}
      </select>
    </div>
  )
}

export default CustomSelect
