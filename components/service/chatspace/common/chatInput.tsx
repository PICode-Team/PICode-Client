import { Link } from '@material-ui/core'
import {
  AlternateEmail,
  AttachFile,
  FormatBold,
  FormatItalic,
  FormatListBulleted,
  FormatListNumbered,
  FormatStrikethrough,
  Send,
  SentimentSatisfiedOutlined,
  TextFormatOutlined,
  Code,
} from '@material-ui/icons'

import { chatInputStyle } from '../../../../styles/service/chat'
import Entering from './entering'

interface IChatInputProps {
  messageRef: React.RefObject<HTMLInputElement>
  endRef: React.RefObject<HTMLDivElement>
  typingUserList: string[]
  target: string
}

function ChatInput(props: IChatInputProps) {
  const { messageRef, endRef, typingUserList, target } = props
  const classes = chatInputStyle()

  return (
    <div className={classes.input}>
      <div className={classes.inputBox}>
        <input type="text" ref={messageRef} />
        <div className={classes.interaction}>
          <div>
            <div>
              <FormatBold />
            </div>
            <div>
              <FormatItalic />
            </div>
            <div>
              <FormatStrikethrough style={{ marginRight: '1px' }} />
            </div>
            <div>
              <Code style={{ marginRight: '4px' }} />
            </div>
            <div>
              <Link style={{ marginRight: '1px' }} />
            </div>
            <div>
              <FormatListNumbered style={{ marginRight: '4px' }} />
            </div>
            <div>
              <FormatListBulleted />
            </div>
          </div>
          <div>
            <div>
              <TextFormatOutlined style={{ marginRight: '1px' }} />
            </div>
            <div>
              <AlternateEmail style={{ marginRight: '4px' }} />
            </div>
            <div>
              <SentimentSatisfiedOutlined style={{ marginRight: '4px' }} />
            </div>
            <div>
              <AttachFile style={{ marginRight: '4px' }} />
            </div>
            <div
              onClick={() => {
                if (messageRef.current && target !== '' && messageRef.current.value !== '') {
                  // sendMessage(target, messageRef.current.value)
                  messageRef.current.value = ''
                  endRef.current!.scrollIntoView()
                }
              }}
            >
              <Send />
            </div>
          </div>
        </div>
      </div>
      {typingUserList.length > 0 && <Entering typingUserList={typingUserList} />}
    </div>
  )
}

export default ChatInput
