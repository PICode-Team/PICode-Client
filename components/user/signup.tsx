import React, { useCallback, useEffect, useState } from 'react'

import { Step, StepLabel, Stepper } from '@material-ui/core'
import { Close } from '@material-ui/icons'
import { useDropzone } from 'react-dropzone'
import clsx from 'clsx'
import Link from 'next/link'

import { signupStyle } from '../../styles/user/signup'
import CustomTextField from '../items/input/textfield'
import Layout from './layout'
import { fetchSet } from '../context/fetch'
import Alert from '../items/modal/alert'

interface IValidate {
  email: boolean
  pw: boolean
}

interface ISignUpInfo {
  id: string
  password: string
  confirmPassword: string
  name: string
}

const initialInfoState: ISignUpInfo = {
  id: '',
  password: '',
  confirmPassword: '',
  name: '',
}

function SignUp() {
  const classes = signupStyle()
  const [userImage, setUserImage] = useState<any>()
  const [imageUUID, setImageUUID] = useState<string>('')
  const [info, setInfo] = useState<ISignUpInfo>(initialInfoState)
  const [activeStep, setActiveStep] = useState<number>(0)
  const [modal, setModal] = useState<boolean>(false)
  const [validate, setValidate] = useState<IValidate>({
    email: true,
    pw: true,
  })
  const onDrop = useCallback((acceptedFiles) => {
    setUserImage(acceptedFiles[0])
  }, [])
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

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

  const handleUserImageCancel = (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    setUserImage(undefined)
    setImageUUID('')
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [event.target.id]: event.target.value })
  }

  const stepDiv = [
    <div className={classes.inputBox} key={0}>
      <CustomTextField id="id" label="ID" onChange={handleChangeValue} />
      <CustomTextField id="password" label="Password" type="password" onChange={handleChangeValue} error={!validate.pw} errorText={"Isn't required password"} />
      <CustomTextField id="confirmPassword" label="Confirm Password" type="password" onChange={handleChangeValue} error={info.password !== info.confirmPassword} errorText={'Password is wrong'} />
    </div>,
    <div className={classes.inputBox} key={1}>
      <CustomTextField id="name" label="Name" onChange={handleChangeValue} />
    </div>,
    <div className={classes.inputBox} key={1}>
      <div {...getRootProps()} className={classes.uploadFile}>
        {userImage && (
          <div className={classes.userImageCancel} onClick={handleUserImageCancel}>
            <Close />
          </div>
        )}
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the files here!</p>
        ) : (
          <>
            {userImage !== undefined ? (
              <div className={classes.userImage}>
                <img src={URL.createObjectURL(userImage)} />
                <p>{userImage!.name}</p>
              </div>
            ) : (
              <div className={classes.fileContent}>{`Drag 'n' drop some files here, or click to select files`}</div>
            )}
          </>
        )}
      </div>
    </div>,
  ]

  const submitSignUp = async () => {
    const payload = {
      userId: info.id,
      userName: info.name,
      passwd: info.password,
      userThumbnail: imageUUID !== '' ? imageUUID : undefined,
    }

    const response = await fetchSet('/user', 'POST', true, JSON.stringify(payload))
    const { code } = await response.json()

    if (code !== 201) return
    window.location.href = '/'
  }

  const handleClickPrevButton = () => {
    if (activeStep === 0) return
    setActiveStep(activeStep - 1)
  }

  const handleClickSubmitButton = () => {
    if (activeStep === 0) {
      if (info.id === '' || info.password === '' || info.confirmPassword) {
        setModal(true)
        return
      }
    }

    if (activeStep === 1) {
      if (info.name === '') {
        setModal(true)
        return
      }
    }

    if (activeStep === 2) {
      submitSignUp()
      return
    }

    setActiveStep(activeStep + 1)
  }

  const makeImageUuid = async () => {
    if (userImage === undefined) return

    const formData = new FormData()
    formData.append('uploadFile', userImage)
    const response = await fetchSet('/data', 'POST', false, formData)
    const { code, uploadFileId } = await response.json()

    if (code === 200) {
      setImageUUID(uploadFileId)
    }
  }

  useEffect(() => {
    makeImageUuid()
  }, [userImage])

  return (
    <Layout isLogin={false}>
      <React.Fragment>
        <Stepper activeStep={activeStep} alternativeLabel className={classes.stepper}>
          {step.map((label, idx) => (
            <Step key={label} className={clsx(activeStep >= idx ? classes.activeCir : classes.disableCir)}>
              <StepLabel className={clsx(activeStep >= idx ? classes.stepperTextact : classes.stepperText)}>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {stepDiv[activeStep]}
        <div className={classes.buttonGroup}>
          <div className={clsx(classes.button, stpeInfo[activeStep].prev.display ? classes.activeButton : classes.disableButton)} onClick={handleClickPrevButton}>
            {stpeInfo[activeStep].prev.label}
          </div>
          <div className={clsx(classes.button, stpeInfo[activeStep].next.display ? classes.activeButton : classes.disableButton)} onClick={handleClickSubmitButton}>
            {stpeInfo[activeStep].next.label}
          </div>
        </div>
        <div className={classes.buttonBox}>
          <Link href="/">
            <a>If you have account&nbsp;&nbsp;→</a>
          </Link>
        </div>
        <Alert modal={modal} setModal={setModal} title="Empty Space" description={info.password !== info.confirmPassword ? `password doesn't match.` : 'Please fill in the essential information.'} />
      </React.Fragment>
    </Layout>
  )
}

export default SignUp
