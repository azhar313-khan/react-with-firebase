interface Column {
  id: keyof Row;
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: number) => string;
}


interface Row {
  id: string;
  name: string;
  description: string;
  type: string;
  status: string;
  action: string;
}

export const fields = ["Id", "Name", "Description", "Type", "Status", "Action"];


 export const columns: readonly Column[] = [
  {
    id: "id",
    label: "#",
    minWidth: 0,
    align: "right",
  },
  { id: "name", label: "Name", minWidth: 170 },
  { id: "description", label: "Description", minWidth: 100 },
  { id: "type", label: "Type", minWidth: 100 },
  {
    id: "status",
    label: "Status",
  },
  {
    id: "action",
    label: "Action",
    minWidth: 170,
    align: "right",
    format: (value: number) => value.toLocaleString("en-US"),
  },
];
