import { Card, Tooltip, IconButton } from "@mui/material";
import { blue, pink } from "@mui/material/colors";
import "./Forms.css";

import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

function AddDeleteQuestiion({
  handleAddInput,
  handleRemoveQuestion,
  pageIndex,
  sectionIndex,
  inputIndex,
}) {
  return (
    <Card
      style={{
        display: "block",
      }}
    >
      <Tooltip title="Add Question">
        <div>
          <IconButton
            onMouseDown={(e) => e.preventDefault()}
            style={{
              left: "5px",
              marginBottom: "-11px",
            }}
            aria-label="Question"
            onClick={() => handleAddInput(pageIndex, sectionIndex)}
          >
            <ControlPointOutlinedIcon
              sx={{
                color: blue[500],
              }}
            />
          </IconButton>
        </div>
      </Tooltip>
      <Tooltip title="Delete">
        <div>
          <IconButton
            onMouseDown={(e) => e.preventDefault()}
            aria-label="Delete"
            style={{
              margin: "3px",
            }}
            onClick={() =>
              handleRemoveQuestion(pageIndex, sectionIndex, inputIndex)
            }
          >
            <DeleteForeverIcon
              sx={{
                color: pink[500],
              }}
            />
          </IconButton>
        </div>
      </Tooltip>
    </Card>
  );
}

export default AddDeleteQuestiion;
