import React, { useRef } from 'react'
import styled from 'styled-components'
import Box from '@mui/material/Box'
import Fab from '@mui/material/Fab'
import List from '@mui/material/List'
import Divider from '@mui/material/Divider'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon'
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline'
import CloseIcon from '@mui/icons-material/Close'
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'
import Game from '../scenes/Game'
import phaserGame from '../PhaserGame'
import { useAppSelector } from '../hooks'

const Backdrop = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  height: 420px;
  width: 560px;
  max-height: 50%;
  max-width: 50%;
`

const Wrapper = styled.div`
  height: 100%;
  padding: 16px;
  position: relative;
  display: flex;
  flex-direction: column;
`

const FabWrapper = styled.div`
  margin-top: auto;
`

const ChatHeader = styled.div`
  height: 35px;
  background: #000000a7;
  /* background: linear-gradient(0deg, #000000a7, #2424249e); */
  border-radius: 10px 10px 0px 0px;

  h3 {
    color: #fff;
    margin: 7px;
    font-size: 17px;
    text-align: center;
  }

  .close {
    position: absolute;
    top: 15px;
    right: 15px;
  }
`

const ChatBox = styled(Box)`
  height: 100%;
  width: 100%;
  overflow: auto;
  background: #000000a7;
  background: #2c2c2c;
  border: 1px solid #00000029;
  /* border: 1px solid #5e696b; */
`

const InputWrapper = styled.div`
  box-shadow: 10px 10px 10px #00000018;
  border: 1px solid #42eacb;
  border-radius: 0px 0px 10px 10px;
  display: flex;
  flex-direction: row;
  background: linear-gradient(180deg, #000000c1, #242424c0);
`

const InputTextField = styled(InputBase)`
  border-radius: 0px 0px 10px 10px;
  input {
    padding: 5px;
    font-size: 15;
  }
`

const colorArr = ['#7bf1a8', '#ff7e50', '#9acd32', '#daa520', '#ff69b4', '#c085f6']

const o = new Intl.DateTimeFormat('en', {
  timeStyle: 'short',
  dateStyle: 'short',
})

export default function Chat() {
  const messages = useAppSelector((state) => state.chat.messages)
  const [value, setValue] = React.useState('')
  const [showChat, setShowChat] = React.useState(true)
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const messageRef = useRef('');


  const onChat = event => {
    setValue(event.target.value)
    messageRef.current = event.target.value
  }

  const game = phaserGame.scene.keys.game as Game
  const handleInput = event => {
    event.stopPropagation()
    if(event.keyCode === 13) { //Enter key
      game.network.onChatMessage(messageRef.current)
      messageRef.current = ''
      setValue('')
    }
  }

  React.useEffect(() => {
    const chatRef = (ref.current as HTMLDivElement)

    const scrollHeight = chatRef?.scrollHeight || 0;
    const height = chatRef?.clientHeight || 0;
    const maxScrollTop = scrollHeight - height;
    chatRef.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }, [messages])
  return (
    <>
      <Backdrop>
        <Wrapper>
          {showChat ? (
            <>
              <ChatHeader>
                <h3>Chat</h3>
                <IconButton
                  aria-label="close dialog"
                  className="close"
                  onClick={() => setShowChat(!showChat)}
                  size="small"
                >
                  <CloseIcon />
                </IconButton>
              </ChatHeader>
              <ChatBox ref={ref}>
                <List>
                  {messages.map(({ content, name }, index) => (
                    <React.Fragment key={index}>
                      <Divider
                        style={{
                          color: '#d1cfcf',
                          margin: '7px',
                          textShadow: '0.3px 0.3px black',
                          fontSize: 14,
                        }}
                      >
                        {o.format(Date.now())}
                      </Divider>
                      <p
                        style={{
                          // color: '#7bffe7',
                          color: colorArr[Math.floor(Math.random() * colorArr.length)],
                          margin: '7px',
                          textShadow: '0.3px 0.3px black',
                          fontSize: 15,
                          fontWeight: 'bold',
                          lineHeight: 1.4,
                        }}
                      >
                        {`${name} `}
                        <span style={{ color: 'white', fontWeight: 'normal' }}>{content}</span>{' '}
                      </p>
                      {/* <ListItem key={index + person}>
                    <ListItemText primary={value} secondary={secondary} />
                  </ListItem> */}
                    </React.Fragment>
                  ))}

                  {/* <p
                    style={{
                      color: '#ffe346',
                      fontWeight: 'bold',
                      margin: '7px',
                      lineHeight: 1.3,
                      fontSize: 15,
                    }}
                  >
                    Dax Joined the room!
                  </p> */}
                </List>
                {showEmojiPicker && (
                  <Picker
                    theme="dark"
                    showSkinTones={false}
                    showPreview={false}
                    style={{ position: 'absolute', bottom: '58px', right: '16px' }}
                    onSelect={(emoji) => {
                      setValue('hihi ' + emoji.native)
                      setShowEmojiPicker(!showEmojiPicker)
                    }}
                    exclude={['recent', 'flags']}
                  />
                )}
              </ChatBox>
              <InputWrapper>
                <InputTextField autoFocus fullWidth placeholder="Aa" value={value} onChange={onChat} onKeyDown={handleInput} />
                {/* <IconButton aria-label="emoji">
                  <InsertEmoticonIcon
                    onClick={() => {
                      setShowEmojiPicker(!showEmojiPicker)
                    }}
                  />
                </IconButton> */}
              </InputWrapper>
            </>
          ) : (
            <FabWrapper>
              <Fab
                color="secondary"
                aria-label="showChat"
                onClick={() => {
                  setShowChat(!showChat)
                }}
              >
                <ChatBubbleOutlineIcon />
              </Fab>
            </FabWrapper>
          )}
        </Wrapper>
      </Backdrop>
    </>
  )
}
