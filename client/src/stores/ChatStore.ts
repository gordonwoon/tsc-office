import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { IChatMessage } from '../../../types/IOfficeState'

interface MessageState {
  messages: IChatMessage[]
}

const initialState: MessageState = {
  messages: []
}

export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<IChatMessage>) => {
      state.messages.push(action.payload)
    }
  }
})

export const {
  addMessage,
} = chatSlice.actions

export default chatSlice.reducer
