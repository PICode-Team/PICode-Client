import React from 'react'
import { Search } from '@material-ui/icons'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { manageStyle } from '../../../styles/service/issuespace/issue'
import CustomButton from '../../items/button/button'

export default function ManageSpace(ctx: any) {
  const classes = manageStyle()
  const router = useRouter()
  const manageMenu = ['Board', 'Milestone']
  const [menu, setMenu] = React.useState<string>('Board')
  const [create, setCreate] = React.useState<boolean>(false)
  const [kanban, setKanban] = React.useState<any[]>()
  const [milestone, setMilestone] = React.useState<any>()
  const [open, setOpen] = React.useState(false)

  const handleCreateButton = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(true)
  }

  return (
    <div className={classes.manage}>
      <div className={classes.title}>
        <div className={classes.search}>
          <Search />
          <input type="text" placeholder="Search User or Channel" />
        </div>
        <CustomButton text="Create" onClick={handleCreateButton} />
      </div>
      <div className={classes.content}>
        <div className={classes.projectContent}>
          <div className={classes.projectHeader}>
            {manageMenu.map((v: string) => {
              return (
                <div
                  className={clsx(classes.headerMenu, v === menu && classes.makeLine, v !== menu && classes.notSelect)}
                  onClick={() => {
                    setMenu(v)
                  }}
                  key={v}
                >
                  {v}
                </div>
              )
            })}
          </div>
          <div className={classes.manageContent}>
            {
              //   makeContent()
            }
          </div>
        </div>
      </div>
      {/* {menu === 'Board' ? <MakeKanban userId={ctx.session.userId} open={open} setOpen={setOpen} ws={ctx.ws.current} /> : <MakeMile open={open} setOpen={setOpen} ws={ctx.ws.current} />} */}
    </div>
  )
}
