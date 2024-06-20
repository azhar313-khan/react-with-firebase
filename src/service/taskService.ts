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
import { db } from "../firebase/firebase";
import { removeTaskValue, RowStatus, RowTask } from "../interface";

export const addTaskService = async (data: RowTask) => {
  try {
    const querySnapshot = await getDocs(collection(db, "users"));
    for (const doc of querySnapshot.docs) {
      if (doc.data().authId === data.authId) {
        data.userId = doc.id;
        const docRef = await addDoc(collection(db, `tasks`), data);
        return { ...data, id: docRef?.id };
      }
    }
    throw new Error("User not found");
  } catch (e: any) {
    console.error("Error adding document: ", e);
    return e.message;
  }
};

export const fatchTaskByIdService = async (id: string) => {
  try {
    const docRef = doc(db, "task", id);
    const docSnap = await getDoc(docRef);
    return { id: docSnap.id, ...docSnap.data() };
  } catch (e) {
    console.error("Error fetching document: ", e);
    throw e;
  }
};

export const taskDeleteByIdService = async (id: string) => {
  try {
    const docRef = doc(db, "task", id);
    await deleteDoc(docRef);
    return id;
  } catch (e) {
    console.error("Error deleting document: ", e);
    throw e;
  }
};

export const updateTaskByIdService = async (data: RowTask) => {
  try {
    const { ...taskData } = data;
    let taskId = null;
    const getId = String(data.id);
    taskData.id = getId;
    const q = query(collection(db, "tasks"), where("id", "==", getId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      taskId = doc.id;
    });
    const docRef = doc(db, `tasks/${taskId}`);
    await updateDoc(docRef, taskData);
    return data;
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

export const changeTaskStatus = async (data: RowStatus) => {
  try {
    const { itemId } = data;
    let taskId = null;
    const q = query(collection(db, `tasks`), where("id", "==", itemId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      taskId = doc.id;
    });

    data.newStatus = data.newStatus === "active" ? "inactive" : "active";
    const docRef = doc(db, `tasks/${taskId}`);
    await updateDoc(docRef, {
      status: data.newStatus,
    });
    return data;
  } catch (e) {
    console.error("Error updating document: ", e);
    throw e;
  }
};

export const fetchTasksService = async (userId: string) => {
  try {
    const tasks: any = [];
    const q = query(collection(db, "tasks"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      tasks.push({ ...doc.data() });
    });
    return tasks;
  } catch (error: any) {
    console.error("Error fetching tasks: ", error);
    return error?.message;
  }
};

export const removeTaskByIdService = async (data: removeTaskValue) => {
  try {
    let taskId = null;
    const q = query(collection(db, `tasks`), where("id", "==", data?.id));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      taskId = doc.id;
    });

    await deleteDoc(doc(db, `tasks/${taskId}`));
    return data?.id;
  } catch (error: any) {
    return error?.message;
  }
};
