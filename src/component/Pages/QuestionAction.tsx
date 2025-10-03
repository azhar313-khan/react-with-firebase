import { CardActions, Tooltip } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Forms.css";

function QuestionAction({ selectedValue, handleClickOpen }) {
  return (
    <CardActions disableSpacing>
      <Tooltip title="Delete">
        <span
          onMouseDown={(e) => e.preventDefault()}
          style={{
            marginRight: "200px",
            fontSize: "15px",
            fontWeight: "bold",
            color: "black",
            width: "168px",
          }}
        >
          <span className="input-line">|</span>
          <span
            style={{
              fontSize: "17px",
              margin: "6px",
              background: "#ff000036",
              color: "#00000082",
              fontWeight: "bold",
              padding: "1px 4px 0px 4px",
            }}
          >
            {selectedValue.split("")[0]}
          </span>

          {selectedValue}
        </span>
      </Tooltip>
      <KeyboardArrowDownIcon
        onClick={handleClickOpen}
        style={{
          cursor: "pointer",
        }}
      />
    </CardActions>
  );
}

export default QuestionAction;
