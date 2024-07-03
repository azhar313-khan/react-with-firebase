import { IconButton, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { search } from "../../features/userSlice";

export default function SearchTab() {
  const [searchValue, setSearchValue] = useState("");
  const dispatch = useDispatch();

  const handleSearchChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event?.target?.value;
    setSearchValue(value);
    dispatch(search(value));
  };

  return (
    <div className="searchBox">
      <form>
        <TextField
          id="search-bar"
          className="text"
          label="Search Name"
          variant="outlined"
          size="small"
          value={searchValue}
          onChange={handleSearchChange}
          placeholder="Search..."
        />
        <IconButton type="button" aria-label="search">
          <SearchIcon style={{ fill: "blue" }} />
        </IconButton>
      </form>
    </div>
  );
}
