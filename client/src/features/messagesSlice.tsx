import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { messageTypes } from "../types/messages.types";

interface MessagesState {
  messages: messageTypes[];
  loading: boolean;
}

const initialState: MessagesState = {
  messages: [],
  loading: false,
};

export const messagesSlice = createSlice({
  name: "Messages",
  initialState,
  reducers: {
    loadMessages: (state, action: PayloadAction<messageTypes[]>) => {
      state.messages = action.payload;
    },
  },
});

export const { loadMessages } = messagesSlice.actions;

export default messagesSlice.reducer;
