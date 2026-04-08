import { configureStore } from "@reduxjs/toolkit";
import conversationsReducer from "./features/conversationsSlice";
import messagesReducer from "./features/messagesSlice";

export const store = configureStore({
  reducer: {
    conversations: conversationsReducer,
    messages: messagesReducer,
  },
});

// Types for useSelector and useDispatch
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
