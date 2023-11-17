import { createAsyncThunk, createSlice, current } from "@reduxjs/toolkit";
import axiosApi from "../../../utils/axiosApi";
import { toast } from "react-toastify";

const initialState = {
  todos: [],
  singleTodo: null,
  loading: false,
  error: null,
};

export const getAllTodoAsync = createAsyncThunk(
  "todo/getAllTodo",
  async (_, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axiosApi.get("/todo/getTodos", {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todo/addTodo",
  async (todoInfo, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axiosApi.post(
        "/todo/addTodo",
        {
          title: todoInfo.title,
          description: todoInfo.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todo/updateTodo",
  async (todoInfo, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axiosApi.put(
        `/todo/updateTodo/${todoInfo.todoId}`,
        {
          title: todoInfo.title,
          description: todoInfo.description,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: token,
          },
        }
      );
      return {
        response: response.data,
        title: todoInfo.title,
        description: todoInfo.description,
      };
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todo/deleteTodo",
  async (todoId, { rejectWithValue }) => {
    try {
      let token = localStorage.getItem("token");
      const response = await axiosApi.delete(`/todo/deleteTodo/${todoId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    getSingleTodo: (state, action) => {
      state.singleTodo = state.todos.find(
        (todo) => todo._id === action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllTodoAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
      })
      .addCase(getAllTodoAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.todos = payload.todos ?? [];
        state.error = null;
      })
      .addCase(addTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addTodoAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
        toast.error("Failed to add todo");
      })
      .addCase(addTodoAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.todos.push(payload);
        state.error = null;
        toast.success("Todo added successfully");
      })
      .addCase(updateTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTodoAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
        toast.error("Failed to update todo");
      })
      .addCase(updateTodoAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        const todoItemId = payload.response.todo._id;

        const index = state.todos.findIndex((todo) => todo._id === todoItemId);

        if (index !== -1) {
          state.todos[index].title = payload.title;
          state.todos[index].description = payload.description;
        }
        toast.success("Todo updated successfully");
      })
      .addCase(deleteTodoAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTodoAsync.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
        toast.error("Failed to delete todo");
      })
      .addCase(deleteTodoAsync.fulfilled, (state, { payload }) => {
        state.loading = false;
        const todoId = payload._id;
        state.todos = state.todos.filter((todo) => todo._id !== todoId);
        state.error = null;
        toast.success("Todo deleted successfully");
      });
  },
});

export const { openModal, closeModal, getSingleTodo, setUpdateValues } =
  todoSlice.actions;

export default todoSlice.reducer;
