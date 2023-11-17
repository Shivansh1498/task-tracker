import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slices/auth/authSlice";
import todoReducer from "./slices/todos/todoSlice";

const store = configureStore({
  reducer: { auth: authSlice, todo: todoReducer },
});

export default store;
