import { Menu, MenuItem } from "@mui/material";
import "./Forms.css";

function AddDeletePage({
  anchorElPage,
  currentPageIndex,
  pageIndex,
  handleClosePage,
  handleAddPage,
  handleRemovePage,
}) {
  return (
    <Menu
      id="page-menu"
      anchorEl={anchorElPage}
      keepMounted
      open={Boolean(anchorElPage) && currentPageIndex === pageIndex}
      onClose={handleClosePage}
    >
      <MenuItem onClick={handleAddPage}>Add Page</MenuItem>
      <MenuItem onClick={() => handleRemovePage(pageIndex)}>
        Delete Page
      </MenuItem>
    </Menu>
  );
}

export default AddDeletePage;
