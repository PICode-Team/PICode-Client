import { Check } from '@material-ui/icons'
import { createWorkspaceStyle } from '../../../../styles/service/workspace/create'

interface IStepperProps {
  step: number
  edit: boolean
}

function Stepper(props: IStepperProps) {
  const { step, edit } = props
  const classes = createWorkspaceStyle()
  return (
    <div className={classes.stepper}>
      <div className={`${classes.step} ${classes.active}`}>
        <div className={classes.stepNumber} style={{ paddingBottom: step === 1 ? '15.2px' : '10px' }}>
          {step >= 2 ? <Check /> : <span>1</span>}
        </div>
        <div className={classes.stepText}>Select Type</div>
      </div>
      <div className={`${classes.lail} ${step >= 2 && classes.active}`}></div>
      <div className={`${classes.step} ${step >= 2 && classes.active}`}>
        <div className={classes.stepNumber} style={{ paddingBottom: step < 3 ? '15.2px' : '10px' }}>
          {step >= 3 ? <Check /> : <span>2</span>}
        </div>
        <div className={classes.stepText}>Create Code</div>
      </div>
      <div className={`${classes.lail} ${step === 3 && classes.active}`}></div>
      <div className={`${classes.step} ${step === 3 && classes.active}`}>
        <div className={classes.stepNumber} style={{ paddingBottom: '15.2px' }}>
          <span>3</span>
        </div>
        <div className={classes.stepText}>Create Container</div>
      </div>
    </div>
  )
}

export default Stepper
