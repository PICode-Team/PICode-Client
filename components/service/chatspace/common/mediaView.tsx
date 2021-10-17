import { ArrowLeft, ArrowRight, Close, CloudDownload, FilterNone, Share } from '@material-ui/icons'
import React, { useState } from 'react'
import { mediaViewStyle } from '../../../../styles/service/chatspace/chat'

interface IMediaViewProps {
  mediaViewData: string[]
  setMediaViewData: React.Dispatch<React.SetStateAction<string[] | null>>
}

function MediaView(props: IMediaViewProps) {
  const { mediaViewData, setMediaViewData } = props
  const classes = mediaViewStyle()
  const [index, setIndex] = useState<number>(0)

  const handleExpandClick = (url: string) => () => {
    console.log(url)

    window.location.href = url
  }

  const handleCloseClick = () => {
    setMediaViewData(null)
  }

  const handleDownloadClick = (url: string) => () => {
    const downloadTag = document.createElement('a')
    downloadTag.style.display = 'none'
    downloadTag.href = url
    document.body.append(downloadTag)
    downloadTag.click()
    setTimeout(() => {
      document.body.removeChild(downloadTag)
    }, 500)
  }

  const handleShareClick = () => {}

  const handlePreviousClick = () => {
    if (index === 0) return
    setIndex(index - 1)
  }

  const handleNextClick = () => {
    if (index === mediaViewData.length - 1) return
    setIndex(index + 1)
  }

  return (
    <React.Fragment>
      <div className={classes.overlay} onClick={handleCloseClick} />
      <div className={classes.content}>
        <div className={classes.arrowWrapper}>
          <div className={`${classes.arrow} ${index === 0 && classes.disabled}`} onClick={handlePreviousClick}>
            <ArrowLeft />
          </div>
          <div className={`${classes.arrow} ${index === mediaViewData.length - 1 && classes.disabled}`} onClick={handleNextClick}>
            <ArrowRight />
          </div>
        </div>
        <div className={classes.header}>
          <div className={classes.info}></div>
          <div className={classes.interaction}>
            <div className={classes.icon} onClick={handleExpandClick(mediaViewData[index])}>
              <FilterNone />
            </div>
            <div className={classes.icon} onClick={handleCloseClick}>
              <Close />
            </div>
          </div>
        </div>
        <div className={classes.body}>
          <img src={mediaViewData[index]} />
        </div>
        <div className={classes.footer}>
          <div className={classes.icon} onClick={handleDownloadClick(mediaViewData[index])}>
            <CloudDownload />
          </div>
          <div className={classes.icon} onClick={handleShareClick}>
            <Share />
          </div>
        </div>
      </div>
    </React.Fragment>
  )
}

export default MediaView
