import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getTodoAsync = createAsyncThunk(
  "todos/getTodosAsync",
  async () => {
    const response = await fetch("http://52.151.17.51:8000/api/todos");
    if (response.ok) {
      const todos = await response.json();
      return { todos };
    } else {
      console.log("Response: ", response.status);
    }
  }
);

export const addTodoAsync = createAsyncThunk(
  "todos/addTodoAsync",
  async (payload) => {
    const response = await fetch("http://52.151.17.51:8000/api/todo/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
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
      console.log("Response: ", response.status);
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
        redirect: "follow",
        body: JSON.stringify({
          isCompleted: payload.isCompleted,
        }),
      }
    );
    if (response.ok) {
      const todo = await response.json();
      return { id: todo._id, isCompleted: todo.isCompleted };
    } else {
      console.log("Response: ", response.status);
    }
  }
);

export const deleteTodoAsync = createAsyncThunk(
  "todos/deleteTodoAsync",
  async (payload) => {
    const response = await fetch(
      `http://52.151.17.51:8000/api/todo/${payload.id}/delete`,
      {
        method: "DELETE",
      }
    );
    if (response.ok) {
      const todo = await response.json();
      return { id: todo.id};
    } else {
      console.log("Response: ", response.status);
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
    [getTodoAsync.pending]: () => {
      console.log("[PENDING] getTodoAsync");
    },
    [getTodoAsync.fulfilled]: (state, action) => {
      console.log("[FULFILLED] getTodoAsync");
      return action.payload.todos;
    },
    [addTodoAsync.pending]: () => {
      console.log("[PENDING] addTodoAsync");
    },
    [addTodoAsync.rejected]: () => {
      console.log("[REJECTED] addTodoAsync");
    },
    [addTodoAsync.fulfilled]: (state, action) => {
      console.log("[FULFILLED] addTodoAsync");
      state.push(action.payload.todo);
    },
    [updateTodoAsync.pending]: () => {
      console.log("[PENDING] updateTodoAsync");
    },
    [updateTodoAsync.rejected]: () => {
      console.log("[REJECTED] updateTodoAsync");
    },
    [updateTodoAsync.fulfilled]: (state, action) => {
      try {
        const index = state.findIndex((todo) => todo._id === action.payload.id);
        state[index].isCompleted = action.payload.isCompleted;
        console.log("[FULFILLED] updateTodoAsync");
      } catch (e) {
        console.log("exception ", e);
      }
    },
    [deleteTodoAsync.pending]: () => {
      console.log("[PENDING] deleteTodoAsync");
    },
    [deleteTodoAsync.rejected]: () => {
      console.log("[REJECTED] deleteTodoAsync");
    },
    [deleteTodoAsync.fulfilled]: (state, action) => {
      console.log("[FULFILLED] deleteTodoAsync");
      return state.filter((todo) => todo._id !== action.payload.id);
    },
  },
});

export const { addTodo, completeTodo, deleteTodo } = todoSlice.actions;
export default todoSlice.reducer;
