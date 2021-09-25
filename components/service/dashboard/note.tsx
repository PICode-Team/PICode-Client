import React, { useState } from 'react'
import { noteStyle } from '../../../styles/service/dashboard/dashboard'
import { IFileView } from '../../../types/note.types'

interface INoteViewProps {}

function NoteView(props: INoteViewProps) {
  const {} = props
  const classes = noteStyle()
  const [fileView, setFileView] = useState<IFileView[]>([])

  const handleLinkNote = () => {}

  return (
    <div className={classes.note}>
      <div className={classes.title}>Note</div>
      <div className={classes.content}>
        {fileView.length > 0 ? (
          fileView.map((v, i) => {
            const pathList = v.path.split('/')
            const fileName = pathList[pathList.length - 1]
            return (
              <div key={`dashboard-file-viwe-${i}`} className={classes.card} onClick={handleLinkNote}>
                <div>
                  <span>{fileName} is created</span>
                </div>
                <div>
                  <span>{v.createTime}</span>
                </div>
              </div>
            )
          })
        ) : (
          <div className={classes.empty}>this server has no document</div>
        )}
      </div>
    </div>
  )
}

export default NoteView
