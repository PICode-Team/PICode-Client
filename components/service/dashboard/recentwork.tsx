import React, { useState, useEffect, useLayoutEffect } from 'react'

import { recentWorkStyle } from '../../../styles/service/dashboard/dashboard'
import { Add, ArrowBackIos, DeleteForever, Settings, CloudDownload, ArrowForwardIos } from '@material-ui/icons'
import { IconButton } from '@material-ui/core'
import { Carousel } from 'react-responsive-carousel'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

import { IWorkspaceSpec } from '../../../types/workspace.types'
import { uuidv4 } from '../../context/uuidv4'
import { fetchSet } from '../../context/fetch'
import DeleteModal from '../../items/modal/detail/delete'
import ExportWorkspace from '../../items/modal/detail/export'
import Alert from '../../items/modal/alert'

interface IRecentWorkProps {}

function RecentWork(props: IRecentWorkProps) {
  const {} = props
  const classes = recentWorkStyle()
  const [workspaceData, setWorkspaceData] = useState<IWorkspaceSpec[]>([])
  const [itemNum, setItemNum] = useState<number>(0)
  const [openDelete, setOpenDelete] = useState<boolean>(false)
  const [openExport, setOpenExport] = useState<boolean>(false)
  const [name, setName] = useState<string>('')
  const [uuid, setUuid] = useState<string>('')
  const [modalInfo, setModalInfo] = useState<IWorkspaceSpec | null>(null)
  const [openResult, setOpenResult] = useState<boolean>(false)
  const [resultStatus, setResultStatus] = useState<boolean>(true)

  const handleLinkCreateWorkspace = () => {
    window.location.href = '/workspace/create'
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

  const handleExportWorkspace = (workspaceInfo: IWorkspaceSpec) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    setOpenExport(true)
    setModalInfo(workspaceInfo)
  }

  const handleLinkEditPage = (workspaceId: string) => (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()
    window.location.href = `/workspace/edit?workspaceId=${workspaceId}`
  }

  const handleDeleteSubmit = (workspaceId: string) => async () => {
    const response = await fetchSet(`/workspace?workspaceId=${workspaceId}`, 'DELETE', true)
    const { code } = await response.json()

    if (code / 2 === 100) {
      setOpenDelete(false)
      setOpenResult(true)
      setResultStatus(true)
      setWorkspaceData(workspaceData.filter((v) => v.workspaceId !== workspaceId))
    } else {
      setOpenDelete(false)
      setOpenResult(true)
      setResultStatus(false)
    }
  }

  const handleClickDelete = (workspaceId: string, name: string) => async (event: React.MouseEvent) => {
    event.stopPropagation()
    event.preventDefault()

    setOpenDelete(true)
    setName(name)
    setUuid(workspaceId)
  }

  const handlePreviousClick = () => {
    if (itemNum - 1 < 0) {
      setItemNum(workspaceData.length)
    } else {
      setItemNum(itemNum - 1)
    }
  }

  const handleNextClick = () => {
    if (itemNum + 1 > workspaceData.length) {
      setItemNum(0)
    } else {
      setItemNum(itemNum + 1)
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
                <span onClick={handleExportWorkspace(i)} className={classes.export}>
                  <CloudDownload />
                </span>
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
                    <div className={classes.key}>Participant</div>
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

  return (
    <div className={classes.recentWork}>
      <div className={classes.title}>Recent Work</div>
      <div className={classes.content}>
        <div className={classes.view} id="view">
          <IconButton className={classes.leftButton} onClick={handlePreviousClick}>
            <ArrowBackIos />
          </IconButton>
          <IconButton className={classes.rightButton} onClick={handleNextClick}>
            <ArrowForwardIos />
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
        </div>
      </div>
      {openDelete && <DeleteModal name={name} uuid={uuid} modal={openDelete} setModal={setOpenDelete} handleSubmit={handleDeleteSubmit} type="workspace" title="Delete Workspace" />}
      {openExport && modalInfo !== null && <ExportWorkspace modal={openExport} setModal={setOpenExport} workspaceInfo={modalInfo} />}
      {openResult && <Alert modal={openResult} setModal={setOpenResult} title="Workspace" description={resultStatus ? 'Success Deleting workspace' : 'Error in Deleting workspace'} />}
    </div>
  )
}

export default RecentWork
