import React from 'react'

import { useAppSelector } from './hooks'

import LoginDialog from './components/LoginDialog'
import ComputerDialog from './components/ComputerDialog'
import VideoConnectionDialog from './components/VideoConnectionDialog'
import WhiteboardDialog from './components/WhiteboardDialog'
// import Debug from './components/Debug'

function App() {
  const loggedIn = useAppSelector((state) => state.user.loggedIn)
  const computerDialogOpen = useAppSelector((state) => state.computer.computerDialogOpen)
  const videoConnected = useAppSelector((state) => state.user.videoConnected)
  const whiteboardDialogOpen = useAppSelector((state) => state.whiteboard.whiteboardDialogOpen)

  return (
    <div className="App">
      {/* <Debug /> */}

      {/* Render the LoginDialog if not logged in yet. */}
      {!loggedIn && <LoginDialog />}

      {/* Render the ComputerDialog if user is using a computer. */}
      {computerDialogOpen && <ComputerDialog />}

      {/* Render the VideoConnectionDialog if user is not connected to a webcam. */}
      {!computerDialogOpen && !videoConnected && loggedIn && <VideoConnectionDialog />}
      {/* Render the WhiteboardDialog if user is using a whiteboard. */}
      {whiteboardDialogOpen && <WhiteboardDialog />}
    </div>
  )
}

export default App
