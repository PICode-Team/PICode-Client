import React, { useState } from 'react'
import { Search } from '@material-ui/icons'
import clsx from 'clsx'
import { useRouter } from 'next/router'
import { manageStyle } from '../../../styles/service/issuespace/issue'
import CustomButton from '../../items/button/button'
import CreateMilestone from './create/milestone'
import CreateKanban from './create/kanban'
import { IKanban, IMilestone } from '../../../types/issue.types'
import Board from './board'
import Milestone from './milestone'

export default function ManageSpace(ctx: any) {
  const classes = manageStyle()
  const router = useRouter()
  const manageMenu = ['Board', 'Milestone']
  const [menu, setMenu] = useState<string>('Board')
  const [modal, setModal] = useState<boolean>(false)
  const [kanbanList, setKanbanList] = useState<IKanban[]>([])
  const [modalKanban, setModalKanban] = useState<IKanban | null>(null)
  const [mileList, setMileList] = useState<IMilestone[]>([])
  const [modalMile, setModalMile] = useState<IMilestone | null>(null)

  const handleCreateButton = (event: React.MouseEvent<HTMLElement>) => {
    setModal(true)
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
            {menu === 'Board' ? (
              <Board kanbanList={kanbanList} setModal={setModal} setModalKanban={setModalKanban} />
            ) : (
              <Milestone milestoneList={mileList} setModal={setModal} setModalMile={setModalMile} />
            )}
          </div>
        </div>
      </div>
      {menu === 'Board' ? <CreateKanban modal={modal} setModal={setModal} modalKanban={modalKanban} /> : <CreateMilestone modal={modal} setModal={setModal} modalMile={modalMile} />}
    </div>
  )
}
