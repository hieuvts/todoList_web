import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = [
//   { id: 1, text: "Todo 1", isCompleted: false },
//   { id: 2, text: "Todo 2", isCompleted: true },
//   { id: 3, text: "Todo 3", isCompleted: true },
// ];

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsyncs",
  async () => {
    const response = await fetch("http://localhost:8000/api/todos");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);
const todoSlice = createSlice({
  name: "todo",
  initialState: [],
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: action.payload.id,
        task: action.payload.text,
        isCompleted: action.payload.isCompleted,
      };
      state.push(newTodo);
    },
    completeTodo: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].isCompleted = action.payload.isCompleted;
    },
    deleteTodo: (state, action) => {
      return state.filter((todo) => todo.id !== action.payload.id);
    },
  },
  extraReducers: {
    [getTodoAsync.pending]: (state, action) => {
      console.log("Fetching data....");
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      console.log("Data is fetched!");
      return action.payload.todos;
    },
  },
});

export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
