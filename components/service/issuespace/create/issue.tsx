import { useState } from 'react'
import Modal from '../../../items/modal/modal'

function CreateIssue() {
  const [modal, setModal] = useState<boolean>(false)

  const handleSubmit = () => {}

  return <Modal modal={modal} setModal={setModal} onSubmit={handleSubmit}></Modal>
}

export default CreateIssue
