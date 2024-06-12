export interface Row {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

export interface State {
  data: any;
  rows: Row[];
  searchQuery: string;
  filterStatus: string;
}