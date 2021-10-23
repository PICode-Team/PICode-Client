import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/router'

import { layoutStyle } from '../../styles/layout/layout'
import { IPageInfo } from '../../types/layout.types'
import { IPageProps } from '../../types/page.types'
import { sidebarData } from './data'
import Messenger from '../service/chatspace/messenger/messenger'
import Sidebar from './sidebar'
import Topbar from './topbar'

function Layout(props: IPageProps) {
  const { children, path } = props
  const classes = layoutStyle()
  const [toggle, setToggle] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>('')
  const [pageInfo, setPageInfo] = useState<IPageInfo | null>(null)
  const pageData: any = sidebarData
  const route = useRouter()

  useEffect(() => {
    if (typeof window === undefined) return

    const value = window.localStorage.getItem('userId')
    if (value === null) return

    setUserId(value)
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      let checkId = localStorage.getItem('userId')
      if (checkId === null) {
        window.location.href = '/'
      }
    }
  }, [])

  useEffect(() => {
    if (pageInfo !== null) return

    const splitedPath = route.route.split('/')

    for (let i in pageData) {
      if (pageData[i].url === route.route) {
        setPageInfo({
          name: pageData[i].title,
          icon: pageData[i].icon,
        })
      } else {
        if (pageData[i].subUrl !== undefined && pageData[i].subUrl.some((v: any) => route.route.includes(v))) {
          if (pageData[i].children !== undefined) {
            let realTile = pageData[i].children.find((v1: any) => {
              let tmpResult = v1.url === route.route;
              let tmpResult2 = false;
              if (v1.subUrl !== undefined) {
                tmpResult2 = v1.subUrl.some((v2: any) => v2 === route.route)
              }
              return tmpResult || tmpResult2;
            })
            setPageInfo({
              name: realTile.title,
              icon: realTile.icon,
            })
          } else {
            setPageInfo({
              name: pageData[i].title,
              icon: pageData[i].icon,
            })
          }
        } else {
          if (route.route.includes(i)) {
            setPageInfo({
              name: pageData[i].title,
              icon: pageData[i].icon,
            })
          }
        }
      }
    }
  }, [])

  return (
    <React.Fragment>
      <div className={classes.layout}>
        <Sidebar toggle={toggle} setToggle={setToggle} />
        <div className={`${classes.contentWrapper} ${toggle && classes.toggle}`}>
          <Topbar toggle={toggle} setToggle={setToggle} />
          <div className={classes.pageName}>
            {pageInfo !== null && pageInfo.icon}
            {pageInfo !== null && pageInfo.name}
          </div>
          {React.cloneElement(children, {
            path: path,
            toggle: toggle,
          })}
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
      <Messenger userId={userId} />
    </React.Fragment>
  )
}

export default Layout
