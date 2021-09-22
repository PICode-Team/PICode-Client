import { FiberManualRecord } from '@material-ui/icons'
import { enteringStyle } from '../../../../styles/service/chat'

function Entering({ typingUserList }: { typingUserList: string[] }) {
  const classes = enteringStyle()

  return (
    <div className={classes.entering}>
      <span className={classes.enterIcon}>
        <FiberManualRecord />
        <FiberManualRecord />
        <FiberManualRecord />
      </span>
      <span className={classes.enterText}>{`${typingUserList.map((v) => `${v} `)}is typing...`}</span>
    </div>
  )
}

export default Entering
