import {
  AppBar,
  Box,
  Button,
  FormControl,
  Menu,
  MenuItem,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import Switch from "@mui/joy/Switch";
import "./Add.css";
import { useNavigate } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useEffect, useMemo, useState } from "react";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import TextField from "@mui/material/TextField";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import type { AppDispatch } from "../store/store";

import {
  search,
  changeStatusData,
  filterStatus,
  clearAll,
  fetchTasks,
  removeTask,
} from "../features/userSlice";
import { selectFilteredAndSearchedRows } from "../features/selectors";
import { logout, logoutUser } from "../features/authSlice";

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

type SortableKeys = "id" | "name" | "description" | "type" | "status";

type ColumnId = keyof Data;

interface Column {
  id: keyof Row;
  label: string;
}

interface SortConfig {
  key: SortableKeys | null;
  direction: "asc" | "desc";
}

const columns: readonly Column[] = [
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

interface Data {
  id?: string;
  name: string;
  description: string;
  type: string;
  status: string;
}

interface authStorPayload {
  authStore: {
    isLoggedIn: boolean;
    user: {
      userId: string;
      name: string;
    };
  };
}

const List = () => {
  const isLoggedIn = useSelector(
    (state: authStorPayload) => state?.authStore?.isLoggedIn
  );
  const userDetails = useSelector(
    (state: authStorPayload) => state?.authStore?.user
  );
  const userId = useSelector(
    (state: authStorPayload) => state?.authStore?.user?.userId
  );

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [searchValue, setSearchValue] = useState("");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const [status, setStatus] = useState("all");
  const [sortConfig, setSortConfig] = useState<SortConfig>({
    key: "id",
    direction: "asc",
  });

  const filteredRows = useSelector(selectFilteredAndSearchedRows);
  const dispatch = useDispatch<AppDispatch>();

  const rediect = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const handleChangePage = (
    _event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleStatusChange = (
    itemId: number | string | undefined,
    newStatus: string
  ) => {
    // dispatch(changeStatusData({ itemId: itemId, newStatus, userId }));
    dispatch(changeStatusData({ itemId, newStatus, userId }));

    enqueueSnackbar("Status Change successfully", {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "center",
      },
      autoHideDuration: 1000,
    });
  };

  const handleEditClick = (row: Data) => {
    rediect("/edit/" + row.id);
  };

  useEffect(() => {
    dispatch(fetchTasks(userId));
  }, [userId]);

  const handleDeleteClick = (row: Data) => {
    const { id } = row;
    if (id === undefined) {
      console.error("Task ID is undefined");
      return;
    }
    Swal.fire({
      title: "Are you sure?",
      showDenyButton: true,
      showCancelButton: false,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(removeTask({ id, userId }));
        enqueueSnackbar("delete successfully", {
          variant: "success",
          anchorOrigin: {
            vertical: "top",
            horizontal: "center",
          },
          autoHideDuration: 1000,
        });
      }
    });
  };

  const handleSort = (key: SortableKeys | null) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key, direction });
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const sortedItems = useMemo(() => {
    const sortableItems = [...filteredRows];
    if (sortConfig.key) {
      sortableItems.sort((a, b) => {
        if (sortConfig.key === null) {
          return 0;
        }
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredRows, sortConfig]);

  const handleSearchChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    const value = event?.target?.value;
    setSearchValue(value);
    dispatch(search(value));
  };

  const handleChange = (event: SelectChangeEvent) => {
    setStatus(event?.target?.value);
    dispatch(filterStatus(event?.target?.value));
  };

  const handleViewClick = (row: Data) => {
    rediect("/view/" + row?.id);
  };

  const fields = ["Id", "Name", "Description", "Type", "Status", "Action"];

  const goTOAddPage = () => {
    rediect("/add");
  };

  const handleClose = () => {
    setAnchorEl(null);
    dispatch(logout());
    dispatch(logoutUser());
    dispatch(clearAll());
    rediect("/login");
  };

  const goToLoginPage = () => {
    rediect("/login");
  };

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              myLogo
            </Typography>

            {isLoggedIn && (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  <h1 style={{ color: "white" }}>{userDetails?.name}</h1>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            ) ? (
              <div>
                <IconButton
                  size="large"
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                  <h5 style={{ color: "white", marginTop: "10px" }}>
                    {userDetails?.name}
                  </h5>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorEl)}
                  sx={{ mt: "45px" }}
                >
                  <MenuItem onClick={handleClose}>Logout</MenuItem>
                </Menu>
              </div>
            ) : (
              <div>
                <Button color="inherit" onClick={goToLoginPage}>
                  Login
                </Button>
              </div>
            )}
          </Toolbar>
        </AppBar>
      </Box>
      <div style={{ marginTop: "100px" }}>
        <p>{isLoggedIn}</p>

        {/* <h1 style={{ margin: "auto", textAlign: "center" }}>List Page</h1> */}
        <div style={{ marginRight: "30px", float: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => goTOAddPage()}
            style={{ marginRight: "30px", float: "right" }}
          >
            Add Data
          </Button>
          <div className="displayv">
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
                  autoComplete="off"
                />
                <IconButton type="button" aria-label="search">
                  <SearchIcon style={{ fill: "blue" }} />
                </IconButton>
              </form>
            </div>
            <div>
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
            </div>
          </div>
        </div>
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 440 }}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  {fields.map((field) => (
                    <TableCell
                      key={field}
                      align="left"
                      style={{ cursor: "pointer" }}
                      onClick={() => handleSort(field as SortableKeys | null)}
                    >
                      {field}
                      {sortConfig.key === field ? (
                        sortConfig.direction === "asc" ? (
                          <ArrowUpwardIcon
                            sx={{ fontSize: 20 }}
                            className="icon-design"
                          />
                        ) : (
                          <ArrowDownwardIcon
                            sx={{ fontSize: 20 }}
                            className="icon-design"
                          />
                        )
                      ) : (
                        <ArrowUpwardIcon
                          sx={{ fontSize: 20 }}
                          className="icon-design"
                        />
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody style={{ height: "10px" }}>
                {filteredRows.length > 0 ? (
                  sortedItems
                    ?.slice(
                      page * rowsPerPage,
                      page * rowsPerPage + rowsPerPage
                    )
                    ?.map((row: Data, index: number) => {
                      const key = row.id || `row_${index}`;
                      return (
                        <TableRow hover role="checkbox" tabIndex={-1} key={key}>
                          {columns.map((column) => {
                            const value = row[column.id as ColumnId];
                            if (column.id === "action") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => handleEditClick(row)}
                                    style={{ marginRight: "8px" }}
                                  >
                                    <EditIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    color="secondary"
                                    onClick={() => handleDeleteClick(row)}
                                    style={{ marginRight: "8px" }}
                                  >
                                    <DeleteIcon />
                                  </Button>
                                  <Button
                                    variant="contained"
                                    onClick={() => handleViewClick(row)}
                                  >
                                    <VisibilityIcon />
                                  </Button>
                                </TableCell>
                              );
                            }
                            if (column.id === "id") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <p style={{ textAlign: "start" }}>{value}</p>
                                </TableCell>
                              );
                            }
                            if (column.id === "status") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <Switch
                                    style={{
                                      marginRight: "8px",
                                      marginLeft: "-45px",
                                      position: "relative",
                                    }}
                                    checked={row.status === "active"}
                                    onChange={() => {
                                      handleStatusChange(row?.id, row.status);
                                    }}
                                  />
                                </TableCell>
                              );
                            }
                            if (column.id === "description") {
                              return (
                                <TableCell
                                  key={column.id}
                                  align={column.align}
                                  dangerouslySetInnerHTML={{
                                    __html: String(value),
                                  }}
                                ></TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === "number"
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} align="center">
                      <img
                        style={{ height: "100px", marginTop: "50px" }}
                        src={"../../public/image/7466140.png"}
                        alt=""
                      />
                      <h2 style={{ minHeight: "100px" }}>No Data Found</h2>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            component="div"
            count={filteredRows.length}
            page={page}
            onPageChange={handleChangePage}
            rowsPerPageOptions={[2, 5, 10, 25, 100]}
            rowsPerPage={rowsPerPage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </div>
    </>
  );
};

export default List;
