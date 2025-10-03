import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";

import "./Forms.css";
import Switch from "@mui/material/Switch";

function CollpaseBtn({ handleSwitch }) {
  return (
    <>
      <div className="heading-css">
        <div className="heading2-css">
          <NoteAddOutlinedIcon
            fontSize="large"
            className="noteAddOutlinedIconCls"
          />
        </div>

        <div style={{ padding: "10px", marginTop: "-20px" }}>
          <h5 style={{ marginBottom: "0", marginTop: "18px" }}>
            Heading <ModeEditOutlineOutlinedIcon sx={{ margin: "10px" }} />
          </h5>
          <p style={{ padding: "0px", marginTop: "0", marginBottom: "0" }}>
            SubTitle
          </p>
        </div>
        <div className="collpase">
          <Switch
            style={{ float: "right" }}
            onChange={(e) => handleSwitch(e)}
          />
          <span style={{ marginTop: "5px" }}>Collapse All Sections</span>
        </div>
      </div>
    </>
  );
}

export default CollpaseBtn;
