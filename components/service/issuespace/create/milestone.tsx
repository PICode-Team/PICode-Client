import { useState } from 'react'
import Modal from '../../../items/modal/modal'

function CreateMilestone() {
  const [modal, setModal] = useState<boolean>(false)

  const handleSubmit = () => {}

  return <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit}></Modal>
}

export default CreateMilestone
