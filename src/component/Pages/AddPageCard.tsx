import { Button, Card, Container } from "@mui/material";
import "./Forms.css";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";

function AddPageCard({ handleAddPage }) {
  return (
    <>
      <Container>
        <Card className="m-clear-add">
          <div className="m-card-icon">
            <NoteAddOutlinedIcon
              fontSize="large"
              sx={{
                marginTop: "12%",
                marginLeft: "9%",
                height: "34px", // Set the height of the background to 200px
                width: "auto", // Adjust width as needed
              }}
            />
            <div style={{ color: "black", fontSize: "8px" }}>
              To Add the Questions,add a Page first
            </div>
            <Button
              sx={{
                background: "white",
                left: "-11px",
                fontSize: "10px",
              }}
              onClick={() => handleAddPage()}
            >
              <NoteAddOutlinedIcon
                fontSize="large"
                sx={{
                  alignItems: "center",
                  justifyContent: "center",
                  height: "20px", // Set the height of the background to 200px
                  width: "auto", // Adjust width as needed
                }}
              />
              Add Page
            </Button>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default AddPageCard;
