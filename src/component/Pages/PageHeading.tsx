import { CardHeader, IconButton, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import "./Forms.css";

function PageHeading({
  handleClickPage,
  handleToggleVisibility,
  pageIndex,
  page,
}) {
  return (
    <CardHeader
      className="d-card-header"
      action={
        <>
          <IconButton aria-label="settings">
            <MoreHorizIcon
              aria-controls="page-menu"
              aria-haspopup="true"
              onClick={(event) => handleClickPage(event, pageIndex)}
              style={{ color: "block" }}
            />
          </IconButton>
        </>
      }
      title={
        <Typography
          variant="h6"
          style={{ fontSize: "12px", fontWeight: "bold" }}
        >
          {page.visible ? (
            <KeyboardArrowDownIcon
              style={{ cursor: "pointer" }}
              onClick={() => handleToggleVisibility(pageIndex)}
            />
          ) : (
            <KeyboardArrowRightIcon
              style={{ cursor: "pointer", margin: "10px" }}
              onClick={() => handleToggleVisibility(pageIndex)}
            />
          )}

          {`Page ${pageIndex + 1}`}
          <ModeEditOutlineOutlinedIcon
            style={{
              // margin: "10px",
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

export default PageHeading;
