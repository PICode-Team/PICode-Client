import { IconButton } from '@material-ui/core'
import { Brightness4, Brightness7 } from '@material-ui/icons'
import { useDispatch, useSelector } from 'react-redux'

import { layoutStyle } from '../../styles/user/layout'
import { toDark, toWhite } from '../../modules/theme'

interface ILayoutProps {
  isLogin: boolean
  children: JSX.Element
}

function Layout(props: ILayoutProps) {
  const { isLogin, children } = props
  const classes = layoutStyle()
  const theme = useSelector((state: any) => state.theme).theme
  const dispatch = useDispatch()

  const handleToWhite = () => {
    dispatch(toWhite())
  }

  const handleToBlack = () => {
    dispatch(toDark())
  }

  return (
    <div className={classes.layout}>
      <div className={classes.themeChangeButton}>
        {theme === 'dark' ? (
          <IconButton onClick={handleToWhite} className={classes.whiteButton}>
            <Brightness7 />
          </IconButton>
        ) : (
          <IconButton onClick={handleToBlack} className={classes.blackButton}>
            <Brightness4 />
          </IconButton>
        )}
      </div>
      <div className={isLogin ? classes.loginContent : classes.signupContent}>
        <div className={classes.header}>
          <img className={classes.logo} src="/images/picode-7.svg" draggable={false} />
          <div className={classes.titleText}>{isLogin ? 'PICODE' : 'SIGNUP'}</div>
          <div>{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
