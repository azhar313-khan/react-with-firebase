import TextField from "@mui/material/TextField";

function TextInput({
  handleFocus,
  handleInputValue,
  pageIndex,
  sectionIndex,
  inputIndex,
  inputValue,
  handleBlur,
  inputType,
}) {
  // const inputTypeValue = inputType.split(" ")[0].toLowerCase();

  return (
    <>
      <TextField
        fullWidth
        id="fullWidth"
        variant="filled"
        style={{
          width: "100%",
          padding: "10px",
        }}
        sx={{
          "& .MuiFilledInput-root": {
            backgroundColor: "white", // Ensure the background is white
            "&:before": {
              borderBottom: "none", // Remove the bottom border before focus
            },
            "&:after": {
              borderBottom: "none", // Remove the bottom border after focus
            },
            "&:hover:not(.Mui-disabled):before": {
              borderBottom: "none", // Remove the bottom border on hover
            },
          },
        }}
        value={inputValue.value}
        inputRef={inputValue.ref}
        type={inputType}
        placeholder="Type Question"
        onBlur={handleBlur}
        onFocus={() => handleFocus(pageIndex, sectionIndex, inputIndex)}
        onChange={(e) =>
          handleInputValue(pageIndex, sectionIndex, inputIndex, e)
        }
      />
    </>
  );
}

export default TextInput;
