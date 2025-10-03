import {
  Dialog,
  DialogTitle,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

export interface SimpleDialogProps {
  open: boolean;
  selectedValue: string;
  onClose: (value: string) => void;
}
import "./Forms.css";

function Picklist(props: SimpleDialogProps) {
  const inputType = ["Text Type", "Number Type"];

  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value: string) => {
    onClose(value);
  };
  // const inputTypeValue = inputType.split(" ")[0].toLowerCase();

  return (
    <>
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>
          <h6 style={{ fontWeight: "bold" }}>Choose Response</h6>
        </DialogTitle>
        <List sx={{ pt: 0 }}>
          {inputType.map((value) => (
            <ListItem disableGutters key={value}>
              <ListItemButton onClick={() => handleListItemClick(value)}>
                <span
                  style={{
                    fontSize: "20px",
                    margin: "8px",
                    background: "#ff000036",
                    color: "#00000082",
                    fontWeight: "bold",
                    padding: "3px 5px 0px 4px",
                  }}
                >
                  {value.split("")[0]}
                </span>
                {/* <TitleIcon
                sx={{
                  background: "#ff000036",
                  color: "#00000082",
                  fontSize: "18px",
                  margin: "8px",
                }}
              /> */}
                <ListItemText primary={value} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Dialog>
    </>
  );
}
export default Picklist;
