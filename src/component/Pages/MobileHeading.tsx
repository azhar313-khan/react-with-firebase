import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery60OutlinedIcon from "@mui/icons-material/Battery60Outlined";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";

function MobileHeading({ time }) {
  return (
    <>
      <div style={{ marginTop: "-75px" }}>
        <span style={{ paddingLeft: "12px", fontSize: "12px" }}>{time}</span>
        <div
          style={{
            float: "right",
            marginRight: "12px",
          }}
        >
          <SignalCellularAltIcon sx={{ fontSize: "12px" }} />
          <WifiIcon sx={{ fontSize: "12px" }} />
          <Battery60OutlinedIcon sx={{ fontSize: "12px" }} />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <KeyboardArrowLeftOutlinedIcon sx={{ fontSize: "25px" }} />
          <p style={{ marginBottom: "0px" }}>Heading </p>
          <MoreHorizIcon sx={{ float: "right", margin: "10px" }} />
        </div>
      </div>
    </>
  );
}

export default MobileHeading;
