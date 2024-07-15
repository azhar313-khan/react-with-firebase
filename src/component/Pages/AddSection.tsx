import { Button, Typography } from "@mui/material";
import PostAddIcon from "@mui/icons-material/PostAdd";

import "./Forms.css";
function AddSection({ handleAddSection, pageIndex }) {
  return (
    <div
      style={{
        color: "#00c8ff",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
      }}
    >
      <Button
        sx={{ background: "white", left: "81px" }}
        onClick={() => handleAddSection(pageIndex)}
      >
        <PostAddIcon fontSize="large" className="d-PostAddIcon" />

        <Typography variant="h6" style={{ fontSize: "10px", color: "#212121" }}>
          Add Section
        </Typography>
      </Button>
    </div>
  );
}

export default AddSection;
