/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { db } from "../firebase/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";

interface Row {
  authId: string;
  id: string | number;
  name: string;
  description: string;
  type: string;
  status: string;
  userId: string;
}

interface RowStatus {
  itemId: number | string | undefined;
  newStatus: string;
  userId: string;
}

interface State {
  rows: Row[];
  searchQuery: string;
  filterStatus: string;
}

interface removeTaskValue {
  id: string | number;
  userId: string;
}

const initialState: State = {
  rows: [],
  searchQuery: "",
  filterStatus: "all",
};

export const addTask = createAsyncThunk(
  "task/addTask",
  async (data: Row, { rejectWithValue }) => {
    try {
      const querySnapshot = await getDocs(collection(db, "users"));
      for (const doc of querySnapshot.docs) {
        if (doc.data().authId === data.authId) {
          data.userId = doc.id;
          const docRef = await addDoc(
            collection(db, `users/${doc.id}/tasks`),
            data
          );

          return { ...data, id: docRef?.id };
        }
      }
      throw new Error("User not found");
    } catch (e: any) {
      console.error("Error adding document: ", e);
      return rejectWithValue(e.message);
    }
  }
);

export const fetchTaskByid = createAsyncThunk(
  "task/taskByid",
  async (id: string) => {
    try {
      const docRef = doc(db, "task", id);
      const docSnap = await getDoc(docRef);
      return { id: docSnap.id, ...docSnap.data() };
    } catch (e) {
      console.error("Error fetching document: ", e);
      throw e;
    }
  }
);

export const taskDeleteById = createAsyncThunk(
  "task/taskDeleteById",
  async (id: string) => {
    try {
      const docRef = doc(db, "task", id);
      await deleteDoc(docRef);
      return id; // Return the ID of the deleted document
    } catch (e) {
      console.error("Error deleting document: ", e);
      throw e;
    }
  }
);

export const updateById = createAsyncThunk(
  "task/updateById",
  async (data: Row) => {
    console.log(data, "data");
    try {
      const { ...taskData } = data;
      let taskId = null;
      console.log(typeof data.id, "dat");
      const getId = String(data.id);
      const q = query(
        collection(db, `users/${data?.userId}/tasks`),
        where("id", "==", getId)
      );
      console.log(q, "query");
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        taskId = doc.id;
      });
      const docRef = doc(db, `users/${data?.userId}/tasks/${taskId}`);
      await updateDoc(docRef, taskData);
      return data;
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

export const changeStatusData = createAsyncThunk<RowStatus, RowStatus>(
  "task/changeStatus",
  async (data: RowStatus) => {
    try {
      const { itemId, userId } = data;
      let taskId = null;
      const q = query(
        collection(db, `users/${userId}/tasks`),
        where("id", "==", itemId)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        taskId = doc.id;
      });

      data.newStatus = data.newStatus === "active" ? "inactive" : "active";
      const docRef = doc(db, `users/${userId}/tasks/${taskId}`);
      await updateDoc(docRef, {
        status: data.newStatus,
      });
      return data;
    } catch (e) {
      console.error("Error updating document: ", e);
      throw e;
    }
  }
);

// export const changeStatusData = createAsyncThunk(
//   "task/changeStatus",
//   async (data: RowStatus) => {
//     try {
//       const { itemId } = data;
//       let taskId = null;
//       const q = query(
//         collection(db, `users/${data?.userId}/tasks`),
//         where("id", "==", itemId)
//       );
//       const querySnapshot = await getDocs(q);
//       querySnapshot.forEach((doc) => {
//         taskId = doc.id;
//       });

//       data.newStatus = data.newStatus === "active" ? "inactive" : "active";
//       const docRef = doc(db, `users/${data?.userId}/tasks/${taskId}`);
//       await updateDoc(docRef, {
//         status: data.newStatus,
//       });
//       return data;
//     } catch (e) {
//       console.error("Error updating document: ", e);
//       throw e;
//     }
//   }
// );

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (userId: string, { rejectWithValue }) => {
    try {
      const taskRef = collection(db, `users/${userId}/tasks`);
      const querySnapshot = await getDocs(taskRef);
      const tasks: any = [];
      querySnapshot.forEach((doc) => {
        tasks.push({ ...doc.data() });
      });
      return tasks;
    } catch (error: any) {
      console.error("Error fetching tasks: ", error);
      return rejectWithValue(error?.message);
    }
  }
);

export const removeTask = createAsyncThunk(
  "task/removeTask",
  async (data: removeTaskValue, { rejectWithValue }) => {
    try {
      let taskId = null;
      const q = query(
        collection(db, `users/${data?.userId}/tasks`),
        where("id", "==", data?.id)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        console.log(doc.id, doc.data());
        taskId = doc.id;
      });

      await deleteDoc(doc(db, `users/${data.userId}/tasks/${taskId}`));
      return data?.id;
    } catch (error: any) {
      return rejectWithValue(error?.message);
    }
  }
);

const userSlice = createSlice({
  name: "taskStore",
  initialState: initialState,
  reducers: {
    // add: (state, action) => {
    //   state.rows.push(action?.payload);
    // },
    update: (state, action) => {
      state.rows = state.rows.map((list) => {
        if (list?.id === action?.payload?.id) {
          list = action?.payload;
        }
        return list;
      });
    },
    remove: (state, action) => {
      state.rows = state.rows.filter((list) => list.id !== action.payload);
    },
    changeStatus: (state, action) => {
      const { itemId } = action.payload;
      let { newStatus } = action.payload;
      newStatus = newStatus === "active" ? "inactive" : "active";
      state.rows = state.rows.map((item) =>
        item.id === itemId ? { ...item, status: newStatus } : item
      );
    },
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
    // builder.addCase(addTask.pending, (state) => {
    //   state.error = null;
    // });
    builder.addCase(addTask.fulfilled, (action) => {
      console.log(action, "action");
      // state.rows.push(action.payload);
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    builder.addCase(fetchTasks.rejected, (state, action: any) => {
      state.rows = action.payload;
    });
    builder.addCase(removeTask.fulfilled, (state, action) => {
      state.rows = state.rows.filter((task) => task?.id !== action?.payload);
    });
  },
});

export const {
  // add,
  update,
  remove,
  changeStatus,
  search,
  filterStatus,
  clearAll,
} = userSlice.actions;
export default userSlice.reducer;
