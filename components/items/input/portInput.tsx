import { makeStyles, createStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'
import React, { useState } from 'react'

import { IThemeStyle } from '../../../styles/theme'
import { IDockerInfo } from '../../../types/workspace.types'

const textInputStyle = makeStyles((theme: IThemeStyle) =>
  createStyles({
    wrapper: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
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
    inputColon: {
      textAlign: 'center',
      padding: '0px 6px',
      margin: '0px',
      fontWeight: 'bold',
      color: theme.font.high.color,
    },
    portColon: {
      padding: '0px 2px',
      color: theme.font.high.color,
      display: 'flex',
      alignItems: 'center',
    },
    addPort: {
      marginLeft: '8px',
      border: 'none',
      color: theme.font.high.color,
      cursor: 'pointer',
      background: '#4078b8',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: '32px',
      '&:hover': {
        background: '#488cd9',
        transition: 'all 0.3s',
      },
    },
    portWrapper: {
      display: 'flex',
      color: theme.font.high.color,
      fontSize: '10px',
      marginRight: '12px',
    },
    left: {
      backgroundColor: '#4c5661',
      padding: '2px 6px',
      borderRadius: '3px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: '1px',
    },
    right: {
      backgroundColor: '#4c5661',
      padding: '2px 6px',
      borderRadius: '3px',
      marginTop: '1px',
    },
    portInfo: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '8px',
    },
  })
)

interface IPortInputProps {
  dockerInfo: IDockerInfo
  setDockerInfo: React.Dispatch<React.SetStateAction<IDockerInfo>>
}

interface IPortState {
  hostPort: string
  containerPort: string
}

const initialState: IPortState = {
  hostPort: '',
  containerPort: '',
}

function CustomPortInput(props: IPortInputProps) {
  const { dockerInfo, setDockerInfo } = props
  const classes = textInputStyle()
  const [portState, setPortState] = useState<IPortState>(initialState)

  const handleChangeState = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPortState({ ...portState, [event.target.id]: event.target.value.replace(/[^0-9]/g, '').slice(0, 5) })
  }

  const handleEnterPort = () => {
    setDockerInfo({
      ...dockerInfo,
      portInfo: {
        ...dockerInfo.portInfo,
        [portState.hostPort]: Number(portState.containerPort),
      },
    })
    setPortState(initialState)
  }

  return (
    <React.Fragment>
      <div className={classes.wrapper}>
        <span className={classes.label}>Port</span>
        <input className={classes.input} placeholder="Input Host Port" onChange={handleChangeState} id="hostPort" value={portState.hostPort} />
        <span className={classes.inputColon}>:</span>
        <input className={classes.input} placeholder="Input Container Port" onChange={handleChangeState} id="containerPort" value={portState.containerPort} />
        <button className={classes.addPort} onClick={handleEnterPort}>
          <Add />
        </button>
      </div>
      {dockerInfo.portInfo !== undefined && Object.keys(dockerInfo.portInfo).length > 0 && (
        <div className={classes.portInfo}>
          <span className={classes.label}></span>
          {Object.keys(dockerInfo.portInfo).map((v, i) => (
            <div className={classes.portWrapper} key={`port-info-${i}`}>
              <div className={classes.left}>{v}</div>
              <div className={classes.portColon}>:</div>
              <div className={classes.right}>{dockerInfo.portInfo![v]}</div>
            </div>
          ))}
        </div>
      )}
    </React.Fragment>
  )
}

export default CustomPortInput
