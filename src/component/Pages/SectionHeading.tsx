import { CardHeader, IconButton, Typography } from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import "./Forms.css";

function SectionHeading({
  section,
  handleClickSection,
  handleToggleVisibilitySection,
  pageIndex,
  sectionIndex,
}) {
  return (
    <CardHeader
      style={{
        background: "rgb(53, 45, 242)",
        color: "#fff",
        height: "50px",
      }}
      action={
        <IconButton aria-label="settings">
          <p
            style={{
              background: "rgb(53, 45, 242)",
              color: "#fff",
              marginBottom: "0px",
              marginRight: "5px",
              fontSize: "15px",
            }}
          >
            {section?.inputField?.length > 0 ? section?.inputField.length : ""}
          </p>
          <MoreHorizIcon
            aria-controls="section-menu"
            aria-haspopup="true"
            onClick={(event) => handleClickSection(event, sectionIndex)}
            style={{ color: "white" }}
          />
        </IconButton>
      }
      title={
        <Typography
          variant="h6"
          style={{
            fontSize: "12px",
            fontWeight: "bold",
          }}
        >
          {section?.sectionVisible ? (
            <KeyboardArrowDownIcon
              sx={{
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleToggleVisibilitySection(pageIndex, sectionIndex)
              }
            />
          ) : (
            <KeyboardArrowRightIcon
              sx={{
                margin: "10px",
                cursor: "pointer",
              }}
              onClick={() =>
                handleToggleVisibilitySection(pageIndex, sectionIndex)
              }
            />
          )}
          {`Section ${sectionIndex + 1}`}{" "}
          <ModeEditOutlineOutlinedIcon
            style={{
              cursor: "pointer",
              marginTop: "0",
              margin: "-5px 11px 0px",
              fontSize: "16px",
            }}
          />
        </Typography>
      }
    />
  );
}

export default SectionHeading;
