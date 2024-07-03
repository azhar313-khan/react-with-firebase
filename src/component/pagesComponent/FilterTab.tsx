import {
  FormControl,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterStatus } from "../../features/userSlice";

export default function FilterTab() {
  const [status, setStatus] = useState("all");
  const dispatch = useDispatch();

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event?.target?.value);
    dispatch(filterStatus(event?.target?.value));
  };
  return (
    <div>
      <FormControl sx={{ m: 0, minWidth: 120, p: 0 }}>
        <Select
          value={status}
          onChange={handleChange}
          displayEmpty
          style={{ padding: "0px", margin: "-10px" }}
        >
          <MenuItem value={"all"}>All</MenuItem>
          <MenuItem value={"active"}>Active</MenuItem>
          <MenuItem value={"inactive"}>Inactive</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
