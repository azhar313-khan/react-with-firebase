import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  changeTaskStatus,
  fetchTasksService,
  removeTaskByIdService,
  updateTaskByIdService,
} from "../service/taskService";

import {
  addTaskService,
  fatchTaskByIdService,
  taskDeleteByIdService,
} from "../service/taskService";
import { removeTaskValue, Row, RowStatus, State } from "../interface";

const initialState: State = {
  rows: [],
  searchQuery: "",
  filterStatus: "all",
  taskStore: {
    rows: [],
    searchQuery: "",
    filterStatus: "",
  },
};

export const addTask = createAsyncThunk("task/addTask", async (data: Row) => {
  const result = await addTaskService(data);
  return result;
});

export const fetchTaskByid = createAsyncThunk(
  "task/taskByid",
  async (id: string) => {
    const result = await fatchTaskByIdService(id);
    return result;
  }
);

export const taskDeleteById = createAsyncThunk(
  "task/taskDeleteById",
  async (id: string) => {
    const result = await taskDeleteByIdService(id);
    return result;
  }
);

export const updateById = createAsyncThunk(
  "task/updateById",
  async (data: Row) => {
    const result = await updateTaskByIdService(data);
    return result;
  }
);

export const changeStatusData = createAsyncThunk<RowStatus, RowStatus>(
  "task/changeStatus",
  async (data: RowStatus) => {
    const result = await changeTaskStatus(data);
    return result;
  }
);
export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (data: removeTaskValue) => {
    const result = await removeTaskByIdService(data);
    return result;
  }
);

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (userId: string) => {
    const result = await fetchTasksService(userId);
    return result;
  }
);

const userSlice = createSlice({
  name: "taskStore",
  initialState: initialState,
  reducers: {
    search: (state, action) => {
      state.searchQuery = action.payload;
    },
    clearAll: (state) => {
      state.rows = [];
      state.searchQuery = "";
      state.filterStatus = "all";
    },
    filterStatus: (state, action) => {
      state.filterStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addTask.fulfilled, (action) => {
      console.log(action, "action");
    });

    builder.addCase(fetchTaskByid.fulfilled, (state) => {
      state.rows;
    });
    builder.addCase(taskDeleteById.fulfilled, (state, action) => {
      state.rows = state.rows.filter((task) => task?.id !== action?.payload);
    });
    builder.addCase(updateById.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      state.rows = state.rows.map((task) =>
        task.id === updatedTask.id ? updatedTask : task
      );
    });
    builder.addCase(changeStatusData.fulfilled, (state, action) => {
      const updatedTask = action.payload;
      state.rows = state.rows.map((item) =>
        item?.id === updatedTask?.itemId
          ? { ...item, status: updatedTask?.newStatus }
          : item
      );
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.rows = [];
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.rows = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action: any) => {
      state.rows = action.payload;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.rows = state.rows.filter((task) => task?.id !== action?.payload);
    });
  },
});

export const { search, filterStatus, clearAll } = userSlice.actions;
export default userSlice.reducer;
