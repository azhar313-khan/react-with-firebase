import { Menu, MenuItem } from "@mui/material";
import './Forms.css'

function SectionMenu({
  anchorElSection,
  currentSectionIndex,
  handleCloseSection,
  handleAddSection,
  pageIndex,
  sectionIndex,
  handleRemoveSection,
}) {
  return (
    <Menu
      id="section-menu"
      anchorEl={anchorElSection}
      keepMounted
      open={Boolean(anchorElSection) && currentSectionIndex === sectionIndex}
      onClose={handleCloseSection}
    >
      <MenuItem onClick={() => handleAddSection(pageIndex)}>
        Add Section{" "}
      </MenuItem>
      <MenuItem onClick={() => handleRemoveSection(pageIndex, sectionIndex)}>
        Delete Section
      </MenuItem>
    </Menu>
  );
}

export default SectionMenu;
