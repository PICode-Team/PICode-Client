import { AccountCircleRounded, Brightness4, MenuRounded, Notifications } from '@material-ui/icons'
import React from 'react'
import { topbarStyle } from '../../styles/layout/topbar'

function Topbar({ toggle, setToggle }: { toggle: boolean; setToggle: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = topbarStyle()
  return (
    <div className={classes.topBar}>
      <div className={classes.toggle}>
        <div
          className={classes.toggleIcon}
          onClick={() => {
            setToggle(!toggle)
          }}
        >
          <MenuRounded />
        </div>
      </div>
      <div className={classes.interaction}>
        <div className={classes.icon}>
          <AccountCircleRounded />
        </div>
        <div className={classes.icon}>
          <Brightness4 />
        </div>
        <div className={classes.icon}>
          <Notifications />
        </div>
      </div>
    </div>
  )
}

export default Topbar
