import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type {
  conversationsWithMembersType,
  conversationIdType,
} from "../types/conversations.types";

interface ConversationsState {
  activeConversation: conversationIdType;
  items: conversationsWithMembersType[];
  conversation: conversationsWithMembersType | null;
  loading: boolean;
  error?: string;
}

const initialState: ConversationsState = {
  activeConversation: null,
  items: [],
  loading: false,
  conversation: null,
};

export const conversationsSlice = createSlice({
  name: "conversations",
  initialState,
  reducers: {
    setConversations: (
      state,
      action: PayloadAction<conversationsWithMembersType[]>,
    ) => {
      state.items = action.payload;
    },
    setActiveConversation: (
      state,
      action: PayloadAction<conversationsWithMembersType>,
    ) => {
      state.conversation = action.payload;
    },
    getItemById: (state, action: PayloadAction<conversationIdType>) => {
      state.conversation =
        state.items.find((a) => a.id === action.payload?.id) ?? null;
    },
  },
});

export const { setConversations, setActiveConversation, getItemById } =
  conversationsSlice.actions;

export default conversationsSlice.reducer;
