import { Button, Typography } from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import "./Forms.css";

function AddPageButton({ handleAddPage }) {
  return (
    <div
      style={{
        height: "100px",
        color: "#00c8ff",
        justifyContent: "space-between",
        alignItems: "center",
        borderRadius: "10px",
        cursor: "pointer",
      }}
    >
      <Button
        sx={{ background: "white", left: "10px" }}
        onClick={() => handleAddPage()}
      >
        <NoteAddOutlinedIcon
          fontSize="large"
          sx={{
            alignItems: "center",
            justifyContent: "center",
            height: "15px",
            width: "auto",
          }}
        />
        <Typography variant="h6" style={{ fontSize: "10px", color: "#212121" }}>
          Add Page
        </Typography>
      </Button>
    </div>
  );
}

export default AddPageButton;
