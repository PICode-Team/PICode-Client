import React, { useState, useEffect } from 'react'

import { recentWorkStyle } from '../../../styles/service/dashboard/dashboard'
import { Add, ArrowBackIos, DeleteForever, Settings } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { Carousel } from 'react-responsive-carousel'
import Swal from 'sweetalert2'
import * as d3 from 'd3'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { IWorkspaceSpec } from '../../../types/workspace.types'
import { uuidv4 } from '../../context/uuidv4'
import { fetchSet } from '../../context/fetch'

interface IRecentWorkProps {}

function RecentWork(props: IRecentWorkProps) {
  const {} = props
  const classes = recentWorkStyle()
  const [workspaceData, setWorkspaceData] = useState<IWorkspaceSpec[]>([])
  const [state, setState] = useState<boolean>(true)
  const [sliderNum, setSliderNum] = useState<number | number[]>(3)
  const [itemNum, setItemNum] = useState<number>(0)

  const handleChange = () => {
    setState(!state)
  }

  useEffect(() => {}, [sliderNum])

  const handleLinkCreateWorkspace = () => {
    window.location.href = '/workspace/create'
  }

  const drawTableView = () => {
    let width = (d3.select('#view')?.node() as any)?.getBoundingClientRect().width
    let col = width / Number(sliderNum) - 20
    let tmpContent = [
      <div key={`workspace-table-${uuidv4()}`} className={classes.carouse} style={{ width: col + 'px' }}>
        <div className={classes.carouselContent}>
          <div className={classes.alignCenter}>
            <div onClick={handleLinkCreateWorkspace}>
              <Add className={classes.add} />
            </div>
            <span className={classes.createWorkspaceText}>Create Workspace</span>
          </div>
        </div>
      </div>,
    ]
    for (let i of workspaceData) {
      tmpContent.push(
        <div key={`workspace-table-${uuidv4()}`} className={classes.carouse} style={{ width: col + 'px' }}>
          <div className={classes.carouselContent}>
            <div className={classes.alignCenter}>
              <span className={classes.tableContent}>{i.description}</span>
              <span className={classes.tableContent}>{i.name}</span>
              <span className={classes.tableContent}>{i.creator}</span>
            </div>
          </div>
        </div>
      )
    }
    return tmpContent
  }

  const getWorkspaceData = async () => {
    const response = await fetchSet('/workspace', 'GET', true)
    const { workspaceList, code } = await response.json()

    if (code === 200) {
      setWorkspaceData(workspaceList)
    }
  }

  useEffect(() => {
    getWorkspaceData()
  }, [])

  const handleLinkEditPage = (workspaceId: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = `/workspace/edit?workspaceId=${workspaceId}`
  }

  const handleClickDelete = (workspaceId: string, name: string) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    const result = await Swal.fire({
      title: 'Delete Workspace',
      text: `Are you sure delete ${name} Workspace?`,
      icon: 'warning',
      heightAuto: false,
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
    })

    if (result.isConfirmed) {
      const response = await fetchSet(`/workspace?workspaceId=${workspaceId}`, 'DELETE', true)
      const { code } = await response.json()

      if (code / 100 === 2) {
        Swal.fire({
          title: 'SUCCESS',
          text: `DELETE ${name}`,
          icon: 'success',
          heightAuto: false,
        }).then(() => {
          window.location.reload()
        })
      } else {
        Swal.fire({
          title: 'ERROR',
          html: `
                ERROR in DELETE ${name}
                <br />
                <span>${code}</span>
                `,
          icon: 'error',
          heightAuto: false,
        })
      }
    }
  }

  const handleLinkCodePage = (workspaceId: string) => () => {
    window.location.href = `/codespace?workspaceId=${workspaceId}`
  }

  const handleLinkIssuePage = (workspaceId: string) => () => {
    window.location.href = `/issuespace?workspaceId=${workspaceId}`
  }

  const drawCarouselView = () => {
    let tmpContent = [
      <div key={`add-workspace-${uuidv4()}`} className={classes.carouseView}>
        <div className={classes.carouselContent}>
          <div className={classes.alignCenter}>
            <IconButton className={classes.carouselButton} onClick={handleLinkCreateWorkspace}>
              <Add />
            </IconButton>
            <span className={classes.blockCarouseButton}>Create Workspace</span>
          </div>
        </div>
      </div>,
    ]
    for (let i of workspaceData) {
      let participantsInfo: string[] | string = i.participants
      if (participantsInfo !== undefined) {
        participantsInfo = participantsInfo.join(', ')
        if (participantsInfo.length > 15) {
          participantsInfo = participantsInfo.substring(0, 15) + '...'
        }
      }

      tmpContent.push(
        <div key={`workspace-carouse-${uuidv4()}`} style={{ padding: '0px 20px', height: '100%' }}>
          <div className={classes.carouselContent}>
            <div className={classes.full}>
              <div className={classes.projectName}>
                <span>{i.name}</span>
                <span onClick={handleLinkEditPage(i.workspaceId)} className={classes.edit}>
                  <Settings className={classes.icon} />
                </span>
                <span onClick={handleClickDelete(i.workspaceId, i.name)} className={classes.delete}>
                  <DeleteForever className={classes.icon} />
                </span>
              </div>

              <div className={classes.imageContent}>
                {i.thumbnail === undefined ? <img alt="logo" className={classes.image} src={`/images/picode-7.svg`} /> : <img alt="logo" className={classes.image} src={`/api/temp/${i.thumbnail}`} />}
              </div>
              <div className={classes.space}></div>
              <div className={classes.cardContent} id="textcontent">
                <div className={classes.wrapper}>
                  <div className={classes.line}>
                    <div className={classes.key}>Author</div>
                    <div className={classes.value}>{participantsInfo ?? 'No one'}</div>
                  </div>
                  <div className={classes.line}>
                    <div className={classes.key}>Creator</div>
                    <div className={classes.value}>{i.creator}</div>
                  </div>
                  <div className={classes.line}>
                    <div className={classes.key}>Create time</div>
                    <div className={classes.value}>{i.creation}</div>
                  </div>
                  <div className={classes.line}>
                    <div className={classes.key}>Description</div>
                    <div className={classes.value}>{i.description}</div>
                  </div>
                </div>
                <div className={classes.footer}>
                  <div className={classes.buttonGroup}>
                    <div className={classes.button} onClick={handleLinkCodePage(i.workspaceId)}>
                      To Code
                    </div>
                    <div className={classes.button} onClick={handleLinkIssuePage(i.workspaceId)}>
                      To Issue
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    }
    return tmpContent
  }

  useEffect(() => {
    let width = (d3.select('#view')?.node() as any)?.getBoundingClientRect().width
    d3.select('.carousel-root').style('max-width', `${width}px`)
  }, [workspaceData])

  useEffect(() => {
    if (state) {
      d3.select('#view').style('overflow-y', 'hidden')
    } else {
      d3.select('#view').style('overflow-y', 'auto')
    }
  }, [state])

  return (
    <div className={classes.recentWork}>
      <div className={classes.title}>Recent Work</div>
      <div className={classes.content}>
        <div className={classes.view} id="view">
          {state && (
            <>
              <IconButton
                className={classes.leftButton}
                onClick={() => {
                  if (itemNum - 1 < 0) {
                    setItemNum(workspaceData.length)
                  } else {
                    setItemNum(itemNum - 1)
                  }
                }}
              >
                <ArrowBackIos />
              </IconButton>
              <IconButton
                className={classes.rightButton}
                onClick={() => {
                  if (itemNum + 1 > workspaceData.length) {
                    setItemNum(0)
                  } else {
                    setItemNum(itemNum + 1)
                  }
                }}
              >
                <ArrowBackIos style={{ transform: 'rotate(-180deg)' }} />
              </IconButton>
              <Carousel
                showArrows={false}
                selectedItem={itemNum as number}
                showStatus={false}
                showThumbs={false}
                showIndicators={false}
                centerSlidePercentage={50}
                centerMode={true}
                autoPlay={false}
                dynamicHeight={true}
                infiniteLoop
                useKeyboardArrows={true}
              >
                {drawCarouselView().map((v: any) => v)}
              </Carousel>
            </>
          )}
          {!state && drawTableView().map((v: any) => v)}
        </div>
      </div>
    </div>
  )
}

export default RecentWork
