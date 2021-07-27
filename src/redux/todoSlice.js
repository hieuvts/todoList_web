import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// const initialState = [
//   { id: 1, text: "Todo 1", isCompleted: false },
//   { id: 2, text: "Todo 2", isCompleted: true },
//   { id: 3, text: "Todo 3", isCompleted: true },
// ];

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://52.151.17.51:8000/api/todos");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    // const response = await fetch("http://52.151.17.51:8000/api/todo/create");
    const response = await fetch("http://52.151.17.51:8000/api/todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: JSON.stringify({
        task: payload.task,
        isCompleted: false,
      }),
    });

    if (response.ok) {
      const todo = await response.json();
      return { todo };
    } else {
      console.log("failed response: ", response);
    }
  }
);

export const updateTodoAsync = createAsyncThunk(
  "todos/updateTodoAsync",
  async (payload) => {
    const response = await fetch(
      `http://52.151.17.51:8000/api/todo/${payload.id}/update`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: payload.id,
          isCompleted: payload.isCompleted,
        }),
      }
    );

    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id, isCompleted: todo.isCompleted };
    } else {
      console.log("update failed at api call ", response);
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
    [getTodoAsync.pending]: (state, action) => {},
    [getTodoAsync.fulfilled]: (state, action) => {
      return action.payload.todos;
    },
    [addTodoAsync.pending]: () => {
      console.log("Pending addTodoAsync");
    },
    [addTodoAsync.rejected]: () => {
      console.log("addTodoAsync is rejected");
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      console.log("New todo is added successfully");
      state.push(action.payload.todo);
    },
    [updateTodoAsync.pending]: () => {
      console.log("Update todo is pending");
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      const index = state.findIndex((todo) => todo.id === action.payload.id);
      state[index].isCompleted = action.payload.isCompleted;
    },
  },
});

export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
