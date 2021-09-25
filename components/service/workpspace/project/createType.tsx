import { CreateNewFolder, GitHub, Publish } from '@material-ui/icons'

import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'
import { ICreateType } from '../../../../types/workspace.types'

interface ICreateTypeProps {
  setStep: React.Dispatch<React.SetStateAction<number>>
  setType: React.Dispatch<React.SetStateAction<ICreateType>>
}

function CreateType(props: ICreateTypeProps) {
  const { setStep, setType } = props
  const classes = createWorkspaceStyle()

  const setCreateType = (type: ICreateType) => () => {
    setType(type)
    setStep(2)
  }

  return (
    <div className={classes.content}>
      <div className={classes.typeContent}>
        <div className={classes.typeNode} onClick={setCreateType('nothing')}>
          <CreateNewFolder />
          <div>Create Project</div>
        </div>
        <div className={classes.typeNode} onClick={setCreateType('gitUrl')}>
          <GitHub />
          <div>Clone Project</div>
        </div>
        <div className={classes.typeNode} onClick={setCreateType('upload')}>
          <Publish />
          <div>Upload Project</div>
        </div>
      </div>
    </div>
  )
}

export default CreateType
