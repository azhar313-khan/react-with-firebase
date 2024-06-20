export interface MyState {
  user: null;
  users: [];
  isLodding: boolean;
  isLoggedIn: boolean;
  error: string | null;
}

export interface SignUpUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface RejectValue {
  message: string;
}

export interface Row {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

export interface State {
  taskStore: {
    rows: Row[];
    searchQuery: string;
    filterStatus: string;
  };
}

export interface Row {
  authId: string;
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  userId: string;
}

export interface RowStatus {
  itemId: number | string | undefined;
  newStatus: string;
  userId: string;
}

export interface State {
  rows: Row[];
  searchQuery: string;
  filterStatus: string;
}

export interface removeTaskValue {
  id: string | number;
  userId: string;
}

export interface SignUpUserPayload {
  email: string;
  password: string;
  name: string;
}

export interface LoginUserPayload {
  id: string;
  email: string;
  password: string;
}

export interface RowTask {
  authId: string;
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  userId: string;
}

export interface isloginInterface {
  authStore: {
    isLoggedIn: boolean;
  };
}

export interface AuthStore {
  id: string;
  email: string;
  password: string;
}

export interface loginState {
  authStore: {
    user: {
      authId: string;
    };
  };
}

export interface rowsState {
  taskStore: {
    rows: [];
  };
}

export interface Data {
  id?: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

export interface authStorPayload {
  authStore: {
    isLoggedIn: boolean;
    user: {
      userId: string;
      name: string;
    };
  };
}

export interface ListRow {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  action: string;
}

export interface Column {
  id: keyof ListRow;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}

export interface rowData {
  taskStore: {
    rows: Row[];
    searchQuery: string;
    filterStatus: string;
  };
}

export interface Navigation {
  authStore: {
    isLoggedIn: boolean;
  };
}

export interface ExtendedUser {
  userId: string;
  accessToken?: string;
}
