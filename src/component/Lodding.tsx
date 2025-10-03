import Box from "@mui/material/Box";
import CircularProgress from "@mui/material/CircularProgress";

function Lodding() {
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
          textAlign: "center",
        }}
      >
        <CircularProgress variant="indeterminate" size={100} />
      </Box>
    </div>
  );
}

export default Lodding;
