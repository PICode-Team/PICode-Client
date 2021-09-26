import { boundaryStyle } from '../../../../styles/service/chatspace/chat'

function Boundary({ text }: { text: string }) {
  const classes = boundaryStyle()

  return (
    <div className={classes.boundaryWrapper}>
      <div className={classes.boundary}></div>
      <div className={classes.boundaryTicket}>{text}</div>
    </div>
  )
}

export default Boundary
