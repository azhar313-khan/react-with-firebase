import { Button } from "@mui/material";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import "./Forms.css";

function NoPageAddPage({ handleAddPage }) {
  return (
    <>
      <div className="d-no-page-addPage">
        <NoteAddOutlinedIcon
          fontSize="large"
          className="d-NoteAddOutlinedIcon-content"
        />
        <div style={{ color: "black" }}>
          To Add the Questions,add a Page first
        </div>
        <Button
          sx={{ background: "white", left: "70px" }}
          onClick={() => handleAddPage()}
        >
          <NoteAddOutlinedIcon
            fontSize="large"
            className="d-NoteAddOutlinedIcon-addPage"
          />
          Add Page
        </Button>
      </div>
    </>
  );
}

export default NoPageAddPage;
