import React from "react";
import { useDrag, useDrop } from "react-dnd";
import TextField from "@mui/material/TextField";

const ItemType = {
  INPUT: "input",
};

function DraggenDrop({
  inputValue,
  pageIndex,
  sectionIndex,
  inputIndex,
  moveInput,
  handleFocus,
  handleInputValue,
  handleBlur,
}) {
  const ref = React.useRef(null);

  const [, drop] = useDrop({
    accept: ItemType.INPUT,
    hover(item) {
      if (item.inputIndex === inputIndex && item.sectionIndex === sectionIndex)
        return;
      moveInput(
        item.pageIndex,
        item.sectionIndex,
        item.inputIndex,
        pageIndex,
        sectionIndex,
        inputIndex
      );
      item.pageIndex = pageIndex;
      item.sectionIndex = sectionIndex;
      item.inputIndex = inputIndex;
    },
  });

  const [{ isDragging }, drag] = useDrag({
    type: ItemType.INPUT,
    item: { type: ItemType.INPUT, pageIndex, sectionIndex, inputIndex },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      style={{
        opacity: isDragging ? 0.5 : 1,
        display: "flex",
        marginBottom: "10px",
        cursor: "grab", // Set cursor to grab
      }}
    >
      <TextField
        fullWidth
        variant="filled"
        style={{ width: "100%", padding: "10px", cursor: "grab" }}
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "white",
            "&:before": { borderBottom: "none" },
            "&:after": { borderBottom: "none" },
            "&:hover:not(.Mui-disabled):before": { borderBottom: "none" },
          },
        }}
        value={inputValue.value}
        inputRef={inputValue.ref}
        placeholder="Type Question"
        onBlur={handleBlur}
        onFocus={() => handleFocus(pageIndex, sectionIndex, inputIndex)}
        onChange={(e) =>
          handleInputValue(pageIndex, sectionIndex, inputIndex, e)
        }
      />
    </div>
  );
}

export default DraggenDrop;
