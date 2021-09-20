import React, { useState } from 'react'
import { layoutStyle } from '../../styles/layout/layout'
import Sidebar from './sidebar'
import Topbar from './topbar'

function Layout() {
  const classes = layoutStyle()
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Sidebar toggle={toggle} />
        <div className={`${classes.contentWrapper} ${toggle && classes.toggle}`}>
          <Topbar toggle={toggle} setToggle={setToggle} />
          <div className={classes.pageName}>
            <div></div>
          </div>
        </div>
      </div>
      {!toggle && (
        <div
          className={classes.overlay}
          onClick={() => {
            const target = document.getElementById('sidebar')
            if (target !== undefined) {
              for (let i = 0; i < target!.classList.length; i++) {
                if (target!.classList[i].includes('show')) {
                  target!.classList.remove(target!.classList[i])
                }
              }
            }

            setTimeout(() => {
              setToggle(!toggle)
            }, 200)
          }}
        />
      )}
    </React.Fragment>
  )
}

export default Layout
