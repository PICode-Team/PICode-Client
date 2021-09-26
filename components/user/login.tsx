import { IconButton } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toDark, toWhite } from '../../modules/theme'
import { loginStyle } from '../../styles/user/login'
import CustomTextField from '../items/input/textfield'

function Login() {
  const classes = loginStyle()
  const theme = useSelector((state: any) => state.theme).theme
  const [userId, setUserId] = useState<string>('')
  const [passwd, setPasswd] = useState<string>('')
  const dispatch = useDispatch()

  const submitLogin = async () => {
    let payload = {
      userId: userId,
      passwd: passwd,
    }

    let data: { code: number } = await fetch(`http://localhost:8000/api/user/sign`, {
      method: 'POST',
      mode: 'cors',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    }).then((res) => res.json())
    window.location.reload()
  }

  return (
    <div className={classes.login}>
      <div className={classes.themeChangeButton}>
        {theme === 'dark' ? (
          <IconButton onClick={() => dispatch(toWhite())} style={{ color: '#fff' }}>
            <Brightness7 />
          </IconButton>
        ) : (
          <IconButton onClick={() => dispatch(toDark())} style={{ color: '#414C50' }}>
            <Brightness4 />
          </IconButton>
        )}
      </div>
      <div className={classes.loginForm}>
        <div style={{ width: '100%', height: '449px', textAlign: 'center' }}>
          <img src={'http://localhost:8000/images/picode-7.svg'} width={'110px'} draggable={false} />
          <div className={classes.titleText}>PICODE</div>
          <div style={{ marginTop: '50px' }}>
            <CustomTextField label="ID" onChange={(event: React.ChangeEvent<HTMLInputElement>) => setUserId(event.target.value)} />
            <CustomTextField
              label="PW"
              type="password"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => setPasswd(event.target.value)}
              onKeyPress={(event: React.KeyboardEvent) => {
                if (event.key === 'Enter') {
                  submitLogin()
                }
              }}
            />
            <div
              className={classes.button}
              style={{ marginTop: '40px' }}
              onClick={() => {
                if (userId === '') return
                if (passwd === '') return
                submitLogin()
              }}
            >
              Login
            </div>
            <div className={classes.signUpbutton} style={{ marginTop: '20px' }}>
              If you don't have a account,{' '}
              <a href="/signup" style={{ color: '#609FF3' }}>
                Sign up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
