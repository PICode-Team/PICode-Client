import { useRouter } from 'next/dist/client/router'
import React, { useEffect, useState } from 'react'
import { rowStyle, sidebarStyle } from '../../styles/layout/sidebar'
import { sidebarData } from './data'
import clsx from 'clsx'
import { ArrowDropDownOutlined } from '@material-ui/icons'

const checkActive = (props: any, route: any) => {
  if (route.route === props.url) {
    return true
  } else {
    if (props.subUrl !== undefined && props.subUrl.some((v: any) => v === route.route)) {
      return true
    }
  }
  return false
}

const Row = (props: { data: { url?: string; icon: JSX.Element; title: string; children?: [] }; toggle: boolean }): JSX.Element => {
  const classes = rowStyle()
  const route = useRouter()
  const [haveChildren, setHaveChildren] = useState(props.data.children ? true : false)
  const [rowOpen, setRowOpen] = useState<boolean>(false)
  let serverCheck = false

  if (props.data.children !== undefined) {
    props.data.children.map((v) => {
      if (checkActive(v, route)) {
        serverCheck = true
      }
    })
  }

  const handleArcodian = () => {
    if (haveChildren) {
      setRowOpen(!rowOpen)
    }
  }

  return (
    <React.Fragment>
      <a
        className={clsx(`${classes.row} ${props.toggle && classes.toggle}`, !props.data.children && checkActive(props.data, route) ? classes.active : classes.unactive)}
        href={props.data.url}
        onClick={handleArcodian}
      >
        {props.data.icon}
        {!props.toggle && (
          <div className={classes.content}>
            <span className={`${classes.text} ${props.toggle && classes.hidden}`}>{props.data.title}</span>
            {haveChildren && <ArrowDropDownOutlined className={classes.collapseButton} />}
          </div>
        )}
      </a>
      {props.data.children && (
        <div className={clsx(rowOpen || checkActive(props.data, route) ? classes.collapseWrapper : classes.unOpenWrapper)}>
          {props.data.children.map((v: any) => {
            return (
              <a key={v.title} className={clsx(`${classes.row} ${props.toggle && classes.toggle}`, checkActive(v, route) ? classes.active : classes.unactive)} href={v.url}>
                {v.icon}
                {!props.toggle && <span className={`${classes.text} ${props.toggle && classes.hidden}`}>{v.title}</span>}
              </a>
            )
          })}
        </div>
      )}
    </React.Fragment>
  )
}

function Sidebar({ toggle, setToggle }: { toggle: boolean; setToggle: React.Dispatch<React.SetStateAction<boolean>> }) {
  const classes = sidebarStyle()

  const handleResize = (event: any) => {
    if (toggle === false && window.innerWidth < 960) {
      setToggle(true)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div id="sidebar" className={`${classes.sideBar} ${toggle ? classes.toggle : classes.show}`}>
      <a className={`${classes.logo} ${toggle ? classes.toggleLogo : ''}`} href="/">
        <img className={classes.logoImage} src="/images/picode-7.svg" alt="logo" />
        <span className={classes.logoText}>PICode</span>
      </a>
      <div className={classes.rowWrapper}>
        {Object.keys(sidebarData).map((v: string, idx: number) => (
          <Row data={(sidebarData as any)[v]} toggle={toggle} key={idx} />
        ))}
      </div>
    </div>
  )
}

export default Sidebar
