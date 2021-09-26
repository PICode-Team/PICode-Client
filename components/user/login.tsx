import React, { useState } from 'react'

import { loginStyle } from '../../styles/user/login'
import { fetchSet } from '../context/fetch'
import CustomTextField from '../items/input/textfield'
import Layout from './layout'

interface ILoginInfo {
  id: string
  password: string
}

const initialInfoState: ILoginInfo = {
  id: '',
  password: '',
}

function Login() {
  const classes = loginStyle()
  const [info, setInfo] = useState<ILoginInfo>(initialInfoState)

  const submitLogin = async () => {
    if (info.id === '') return
    if (info.password === '') return

    const payload = {
      userId: info.id,
      passwd: info.password,
    }

    fetchSet('/user/sign', 'POST', true, JSON.stringify(payload))

    window.location.reload()
  }

  const handleChangeValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfo({ ...info, [event.target.id]: event.target.value })
  }

  const handleEnterKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      submitLogin()
    }
  }

  const handleClickLoginButton = () => {
    submitLogin()
  }

  return (
    <Layout isLogin={true}>
      <React.Fragment>
        <CustomTextField id="id" label="ID" onChange={handleChangeValue} />
        <CustomTextField id="password" label="PW" type="password" onChange={handleChangeValue} onKeyPress={handleEnterKeyPress} />
        <div className={classes.button} onClick={handleClickLoginButton}>
          Login
        </div>
        <div className={classes.signUpbutton}>
          If you don't have a account,
          <a href="/signup">Sign up</a>
        </div>
      </React.Fragment>
    </Layout>
  )
}

export default Login
