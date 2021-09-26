import { useCallback, useState } from 'react'

import { IconButton, Step, StepLabel, Stepper } from '@material-ui/core'
import { Brightness4, Brightness7, Close } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'

import { toDark, toWhite } from '../../modules/theme'
import { signupStyle } from '../../styles/user/signup'
import { emailRegex, pwRegex } from '../context/regex'
import CustomTextField from '../items/input/textfield'

interface IValidate {
  email: boolean
  pw: boolean
}

function SignUp() {
  const classes = signupStyle()
  const theme = useSelector((state: any) => state.theme).theme
  const [userId, setUserId] = useState<string>('')
  const [userName, setUserName] = useState<string>('')
  const [passwd, setPasswd] = useState<string>('')
  const [confirmPw, setConfirmPw] = useState<string>('')
  const [userImage, setUserImage] = useState<any>()
  const [imageUUID, setImageUUID] = useState<string>('')
  const [activeStep, setActiveStep] = useState<number>(0)
  const [validate, setValidate] = useState<IValidate>({
    email: true,
    pw: true,
  })
  const onDrop = useCallback((acceptedFiles) => {
    setUserImage(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })
  const dispatch = useDispatch()

  const step = ['Account Info', 'User Info', 'Optional']

  const stpeInfo = [
    {
      prev: {
        display: false,
        label: 'Prev',
      },
      next: {
        display: true,
        label: 'Next',
      },
    },
    {
      prev: {
        display: true,
        label: 'Prev',
      },
      next: {
        display: true,
        label: 'Next',
      },
    },
    {
      prev: {
        display: true,
        label: 'Prev',
      },
      next: {
        display: true,
        label: 'Finish',
      },
    },
  ]

  const stepDiv = [
    <div className={classes.inputBox} key={0}>
      <CustomTextField label="ID" onChange={(e: any) => handleEmail(e)} />
      <CustomTextField label="Password" type="password" onChange={(e: any) => setPasswd(e.target.value)} error={!validate.pw} errorText={"Isn't required password"} />
      <CustomTextField label="Confirm Password" type="password" onChange={(e: any) => setConfirmPw(e.target.value)} error={passwd !== confirmPw} errorText={'Password is wrong'} />
    </div>,
    <div className={classes.inputBox} key={1}>
      <CustomTextField label="Name" onChange={(e: any) => setUserName(e.target.value)} />
    </div>,
    <div className={classes.inputBox} key={1}>
      <div {...getRootProps()} className={classes.uploadFile}>
        {userImage && (
          <div
            style={{
              position: 'absolute',
              right: 15,
              top: 15,
              cursor: 'pointer',
            }}
            onClick={(e) => {
              e.stopPropagation()
              e.preventDefault()
              setUserImage(undefined)
              setImageUUID('')
            }}
          >
            <Close />
          </div>
        )}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here!</p>
        ) : (
          <>
            {userImage !== undefined ? (
              <div>
                <img src={URL.createObjectURL(userImage)} width={'50px'} height={'50px'} />
                <p style={{ width: '100%', marginTop: '6px' }}>{userImage!.name}</p>
              </div>
            ) : (
              <div className={classes.fileContent}>Drag 'n' drop some files here, or click to select files</div>
            )}
          </>
        )}
      </div>
    </div>,
  ]

  const handleEmail = (e: any) => {
    setUserId(e.target.value)
    let result = emailRegex.test(userId)
    setValidate({ ...validate, email: result })
  }

  const hadnlePw = (e: any) => {
    setPasswd(e.target.value)
    let result = pwRegex.test(passwd)
    setValidate({ ...validate, pw: result })
  }

  const submitSignUp = async () => {
    let payload = {
      userId: userId,
      userName: userName,
      passwd: passwd,
      userThumbnail: imageUUID !== '' ? imageUUID : undefined,
    }
    let data = await fetch(`http://localhost:8000/api/user`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    window.location.href = '/'
  }

  return (
    <div className={classes.login}>
      <div className={classes.themeChangeButton}>
        {theme === 'dark' ? (
          <IconButton onClick={() => dispatch(toWhite())} style={{ color: '#fff' }}>
            <Brightness7 />
          </IconButton>
        ) : (
          <IconButton onClick={() => dispatch(toDark())} style={{ color: 'black' }}>
            <Brightness4 />
          </IconButton>
        )}
      </div>
      <div className={classes.loginForm}>
        <div style={{ textAlign: 'center' }}>
          <img src={'http://localhost:8000/images/picode-7.svg'} width={'110px'} draggable={false} />
          <div className={classes.titleText}>SIGNUP</div>
        </div>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {step.map((label, idx) => (
            <Step key={label} className={clsx(activeStep >= idx ? classes.activeCir : classes.disableCir)}>
              <StepLabel className={clsx(activeStep >= idx ? classes.stepperTextact : classes.stepperText)}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {stepDiv[activeStep]}
        <div className={classes.buttonGroup}>
          <div
            className={clsx(classes.button, stpeInfo[activeStep].prev.display ? classes.activeButton : classes.disableButton)}
            onClick={() => {
              if (activeStep === 0) return
              setActiveStep(activeStep - 1)
            }}
          >
            {stpeInfo[activeStep].prev.label}
          </div>
          <div
            className={clsx(classes.button, stpeInfo[activeStep].next.display ? classes.activeButton : classes.disableButton)}
            onClick={() => {
              if (activeStep === 2) {
                if (userId === '') return
                if (userName === '') return
                if (passwd === '' || confirmPw !== passwd) return
                if (confirmPw === '') return
                submitSignUp()
                return
              }
              setActiveStep(activeStep + 1)
            }}
          >
            {stpeInfo[activeStep].next.label}
          </div>
        </div>
        <div className={classes.buttonBox}>
          <a href="/login">If you have account&nbsp;&nbsp;→</a>
        </div>
      </div>
    </div>
  )
}

export default SignUp
