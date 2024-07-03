import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Menu,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { pink, blue } from "@mui/material/colors";
import styled from "styled-components";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SignalCellularAltIcon from "@mui/icons-material/SignalCellularAlt";
import WifiIcon from "@mui/icons-material/Wifi";
import Battery60OutlinedIcon from "@mui/icons-material/Battery60Outlined";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import ModeIcon from "@mui/icons-material/Mode";
import PostAddIcon from "@mui/icons-material/PostAdd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import AppsIcon from "@mui/icons-material/Apps";
import { useEffect, useState } from "react";
import "./Forms.css";

const Container = styled.div`
  // height: 400px;
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // padding: 50px;

  // @media (min-width: 368px) {
  //   flex-direction: row;
  //   justify-content: space-around;
  // }
`;

function Forms() {
  const [anchorElPage, setAnchorElPage] = useState(null);
  const [anchorElSection, setAnchorElSection] = useState(null);
  const [currentPageIndex, setCurrentPageIndex] = useState(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(null);
  const [focusedInputIndex, setFocusedInputIndex] = useState(null);
  const [time, setItme] = useState(new Date().toLocaleTimeString());

  const [pages, setPages] = useState([
    {
      sections: [
        {
          inputField: [
            {
              value: "",
            },
          ],
        },
      ],
    },
  ]);

  const [visibleSections, setVisibleSections] = useState(
    pages.map((page) => page.sections.map(() => true))
  );

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItme(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const handleToggleSection = (pageIndex) => {
    // setVisibleSections((prevState) =>
    //   prevState.map((visible, index) =>
    //     index === pageIndex ? !visible : visible
    //   )
    // );
  };

  console.log(visibleSections, "visibleSections");

  const handleClickPage = (event, index) => {
    setAnchorElPage(event.currentTarget);
    setCurrentPageIndex(index);
  };

  const handleClosePage = () => {
    setAnchorElPage(null);
    setCurrentPageIndex(null);
  };

  const handleAddPage = () => {
    setPages([...pages, { sections: [{ inputField: [{ value: "" }] }] }]);
    handleClosePage();
  };

  const handleRemovePage = (pageIndex) => {
    const newPages = pages.filter((_, i) => i !== pageIndex);
    setPages(newPages);
    handleClosePage();
  };

  const handleAddSection = (pageIndex) => {
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        return {
          ...page,
          sections: [
            ...page.sections,
            {
              inputField: [
                {
                  value: "",
                },
              ],
            },
          ],
        };
      }
      return page;
    });
    setPages(newPages);
    handleCloseSection();
  };

  const handleRemoveSection = (pageIndex, sectionIndex) => {
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        const newSections = page.sections.filter((_, j) => j !== sectionIndex);
        return { ...page, sections: newSections };
      }
      return page;
    });
    setPages(newPages);
    handleCloseSection();
  };

  const handleClickSection = (event, index) => {
    setAnchorElSection(event.currentTarget);
    setCurrentSectionIndex(index);
  };

  const handleCloseSection = () => {
    setAnchorElSection(null);
    setCurrentSectionIndex(null);
  };

  const handleAddInput = (pageIndex, sectionIndex) => {
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        const newSections = page.sections.map((section, j) => {
          if (j === sectionIndex) {
            return {
              ...section,
              inputField: [...section.inputField, { value: "" }],
            };
          }
          return section;
        });
        return { ...page, sections: newSections };
      }
      return page;
    });
    setPages(newPages);
  };

  const handleRemoveQuestion = (pageIndex, sectionIndex, questionIndex) => {
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        const newSections = page.sections.map((section, j) => {
          if (j === sectionIndex) {
            const newInputField = section.inputField.filter(
              (_, k) => k !== questionIndex
            );
            return { ...section, inputField: newInputField };
          }
          return section;
        });
        return { ...page, sections: newSections };
      }
      return page;
    });
    setPages(newPages);
  };

  const handleInputValue = (pageIndex, sectionIndex, questionIndex, event) => {
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        const newSections = page.sections.map((section, j) => {
          if (j === sectionIndex) {
            const newInputField = section.inputField.map((input, k) => {
              if (k === questionIndex) {
                return { ...input, value: event.target.value };
              }
              return input;
            });
            return { ...section, inputField: newInputField };
          }
          return section;
        });
        return { ...page, sections: newSections };
      }
      return page;
    });
    setPages(newPages);
  };
  return (
    <>
      <div
        style={{
          background: "ghostwhite",
          display: "flex",
          marginBottom: "-50px",
        }}
      >
        <div
          style={{
            marginTop: "12px",
            marginLeft: "70px",
            background: "#d7faf7",
            paddingRight: "17px",
            paddingLeft: "20px",
            paddingTop: "0px",
            color: "#00c8ff",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            borderRadius: "10px",
          }}
        >
          <NoteAddOutlinedIcon
            fontSize="large"
            sx={{
              alignItems: "center",
              justifyContent: "center",
              height: "50px", // Set the height of the background to 200px
              width: "auto", // Adjust width as needed
            }}
          />
        </div>

        <div style={{ padding: "10px", marginTop: "10px" }}>
          <h5>
            Heading <ModeIcon />
          </h5>
          <p>SubTitle</p>
        </div>
      </div>
      <div
        style={{
          // background: "#e8f0fe",
          background: "ghostwhite",

          display: "flex",
          padding: "60px",
          height: "860px",
        }}
      >
        {pages.length > 0 ? (
          <div
            style={{
              width: "77%",
              display: "ruby-text",
              justifyContent: "center",
              alignItems: "center",
              paddingTop: "8px",
              minWidth: "100px",
              height: "700px",
              overflowY: "auto",
              marginRight: "30px",
            }}
          >
            {pages.map((page, pageIndex) => (
              <>
                <Card
                  sx={{
                    width: "95%",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "ghostwhite",
                    border: "1px ridge",
                  }}
                  key={pageIndex}
                >
                  <CardHeader
                    style={{
                      background: "white",
                      color: "block",
                      padding: "7px",
                    }}
                    action={
                      <>
                        <IconButton aria-label="settings">
                          <MoreHorizIcon
                            aria-controls="page-menu"
                            aria-haspopup="true"
                            onClick={(event) =>
                              handleClickPage(event, pageIndex)
                            }
                            style={{ color: "block" }}
                          />
                        </IconButton>
                      </>
                    }
                    title={
                      <Typography
                        variant="h6"
                        style={{ fontSize: "18px", fontWeight: "bold" }}
                      >
                        {/* <KeyboardArrowRightIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleToggleSection(pageIndex)}
                        /> */}
                        {visibleSections[pageIndex] && (
                          <KeyboardArrowDownIcon
                            style={{ cursor: "pointer" }}
                            onClick={() => handleToggleSection(pageIndex)}
                          />
                        )}

                        {/* {visibleSections[!pageIndex] && ( */}
                        {/* <KeyboardArrowRightIcon
                          style={{ cursor: "pointer" }}
                          onClick={() => handleToggleSection(pageIndex)}
                        /> */}
                        {/* )} */}

                        {`Page ${pageIndex + 1}`}
                        <ModeIcon
                          style={{ margin: "10px", cursor: "pointer" }}
                        />
                      </Typography>
                    }
                  />

                  {/* {visibleSections[pageIndex] && ( */}
                  <CardContent>
                    <div
                      style={{
                        margin: "10px",
                        marginLeft: "90px",
                        marginRight: "90px",
                      }}
                    >
                      {page.sections.map((section, sectionIndex) => (
                        <div
                          style={{ marginBottom: "10px" }}
                          key={sectionIndex}
                        >
                          <Card
                            sx={{
                              width: "100%",
                              borderRadius: "10px",
                            }}
                          >
                            <CardHeader
                              style={{ background: "blue", color: "#fff" }}
                              action={
                                <IconButton aria-label="settings">
                                  <p
                                    style={{
                                      background: "blue",
                                      color: "#fff",
                                      marginBottom: "0px",
                                      marginRight: "5px",
                                      fontSize: "15px",
                                    }}
                                  >
                                    {section?.inputField?.length > 0
                                      ? section?.inputField.length
                                      : ""}
                                  </p>
                                  <MoreHorizIcon
                                    aria-controls="section-menu"
                                    aria-haspopup="true"
                                    onClick={(event) =>
                                      handleClickSection(event, sectionIndex)
                                    }
                                    style={{ color: "white" }}
                                  />
                                </IconButton>
                              }
                              title={
                                <Typography
                                  variant="h6"
                                  style={{
                                    fontSize: "16px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  <KeyboardArrowDownIcon />
                                  {`Section ${sectionIndex + 1}`}{" "}
                                  <ModeIcon
                                    style={{
                                      margin: "10px",
                                      cursor: "pointer",
                                    }}
                                  />
                                </Typography>
                              }
                            />
                            <Menu
                              id="section-menu"
                              anchorEl={anchorElSection}
                              keepMounted
                              open={
                                Boolean(anchorElSection) &&
                                currentSectionIndex === sectionIndex
                              }
                              onClose={handleCloseSection}
                            >
                              <MenuItem
                                onClick={() => handleAddSection(pageIndex)}
                              >
                                Add Section
                              </MenuItem>
                              <MenuItem
                                onClick={() =>
                                  handleRemoveSection(pageIndex, sectionIndex)
                                }
                              >
                                Delete Section
                              </MenuItem>
                            </Menu>
                            <CardContent>
                              <div>
                                {section.inputField.map(
                                  (inputValue, inputIndex) => (
                                    <div
                                      className="input-container"
                                      style={{ marginBottom: "10px" }}
                                      key={inputIndex}
                                    >
                                      <AppsIcon
                                        sx={{
                                          height: "40px",
                                          margin: "6px",
                                          color: "#ccc",
                                        }}
                                      />
                                      <TextField
                                        fullWidth
                                        id="fullWidth"
                                        style={{ width: "100%" }}
                                        sx={{
                                          "& .MuiOutlinedInput-root": {
                                            "& fieldset": {
                                              borderColor: "#ccc", // Default border color
                                            },
                                            "&:hover fieldset": {
                                              borderColor: "#ccc", // Border color when hovering
                                            },
                                            "&.Mui-focused fieldset": {
                                              borderColor: "#0d6efd", // Border color when focused
                                              borderWidth: "3px", // Border width when focused
                                            },
                                          },
                                        }}
                                        value={inputValue.value}
                                        type="text"
                                        placeholder="Enter the question"
                                        onChange={(e) =>
                                          handleInputValue(
                                            pageIndex,
                                            sectionIndex,
                                            inputIndex,
                                            e
                                          )
                                        }
                                        onFocus={() =>
                                          setFocusedInputIndex(inputIndex)
                                        }
                                        onBlur={() =>
                                          setFocusedInputIndex(null)
                                        }
                                      />
                                      <>
                                        <CardActions disableSpacing>
                                          <Tooltip title="Delete">
                                            <IconButton
                                              aria-label="Delete"
                                              style={{ margin: "6px" }}
                                              onClick={() =>
                                                handleRemoveQuestion(
                                                  pageIndex,
                                                  sectionIndex,
                                                  inputIndex
                                                )
                                              }
                                            >
                                              <DeleteForeverIcon
                                                sx={{ color: pink[500] }}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                          <Tooltip title="Add Question">
                                            <IconButton
                                              aria-label="Question"
                                              onClick={() =>
                                                handleAddInput(
                                                  pageIndex,
                                                  sectionIndex
                                                )
                                              }
                                            >
                                              <ControlPointOutlinedIcon
                                                sx={{ color: blue[500] }}
                                              />
                                            </IconButton>
                                          </Tooltip>
                                        </CardActions>
                                      </>
                                    </div>
                                  )
                                )}
                              </div>
                            </CardContent>
                            <CardActions disableSpacing>
                              <Tooltip title="Add Question">
                                <IconButton
                                  aria-label="Question"
                                  onClick={() =>
                                    handleAddInput(pageIndex, sectionIndex)
                                  }
                                >
                                  <ControlPointOutlinedIcon
                                    sx={{ color: blue[500] }}
                                  />
                                </IconButton>
                              </Tooltip>
                            </CardActions>
                          </Card>
                        </div>
                      ))}
                    </div>
                    <div
                      style={{
                        color: "#00c8ff",
                        justifyContent: "space-between",
                        alignItems: "center",
                        borderRadius: "10px",
                      }}
                    >
                      <Button
                        sx={{ background: "white", left: "81px" }}
                        onClick={() => handleAddSection(pageIndex)}
                      >
                        <PostAddIcon
                          fontSize="large"
                          sx={{
                            alignItems: "center",
                            justifyContent: "center",
                            height: "20px",
                            width: "auto",
                          }}
                        />

                        <Typography variant="h6" style={{ fontSize: "10px" }}>
                          Add Section
                        </Typography>
                      </Button>
                    </div>
                  </CardContent>
                  {/* )} */}
                  <Menu
                    id="page-menu"
                    anchorEl={anchorElPage}
                    keepMounted
                    open={
                      Boolean(anchorElPage) && currentPageIndex === pageIndex
                    }
                    onClose={handleClosePage}
                  >
                    <MenuItem onClick={handleAddPage}>Add Page</MenuItem>
                    <MenuItem onClick={() => handleRemovePage(pageIndex)}>
                      Delete Page
                    </MenuItem>
                  </Menu>
                </Card>
                {/* Add Page button */}
                <div
                  style={{
                    height: "100px",
                    color: "#00c8ff",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  <Button
                    sx={{ background: "white", left: "10px" }}
                    onClick={() => handleAddPage()}
                  >
                    <NoteAddOutlinedIcon
                      fontSize="large"
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        height: "20px",
                        width: "auto",
                      }}
                    />
                    <Typography variant="h6" style={{ fontSize: "10px" }}>
                      Add Page
                    </Typography>
                  </Button>
                </div>
              </>
            ))}
          </div>
        ) : (
          <>
            <div
              style={{
                height: "100px",
                marginTop: "12%",
                marginLeft: "25%",
                paddingRight: "17px",
                paddingLeft: "20px",
                paddingTop: "0px",
                color: "#00c8ff",
                justifyContent: "space-between",
                alignItems: "center",
                borderRadius: "10px",
                cursor: "pointer",
              }}
            >
              <NoteAddOutlinedIcon
                fontSize="large"
                sx={{
                  marginTop: "12%",
                  marginLeft: "30%",
                  height: "85px", // Set the height of the background to 200px
                  width: "auto", // Adjust width as needed
                }}
              />
              <div style={{ color: "black" }}>
                To Add the Question ,add a Page first
              </div>
              <Button
                sx={{ background: "white", left: "70px" }}
                onClick={() => handleAddPage()}
              >
                <NoteAddOutlinedIcon
                  fontSize="large"
                  sx={{
                    alignItems: "center",
                    justifyContent: "center",
                    height: "20px", // Set the height of the background to 200px
                    width: "auto", // Adjust width as needed
                  }}
                />
                Add Page
              </Button>
            </div>
          </>
        )}

        <div>
          <div className="smartphone" style={{ width: "20%" }}>
            <span style={{ paddingLeft: "21px" }}>{time}</span>
            <div style={{ float: "right", marginRight: "20px" }}>
              <SignalCellularAltIcon />
              <WifiIcon />
              <Battery60OutlinedIcon />
            </div>

            {pages.length > 0 ? (
              <>
                <Container className="card-container">
                  {pages.map((page, pageIndex) => (
                    <Card
                      sx={{
                        width: "100%",
                        borderRadius: "10px",
                        marginBottom: "20px",
                        background: "aliceblue",
                        height: "fit-content",
                        minHeight: "510px",
                      }}
                      key={pageIndex}
                    >
                      <CardHeader
                        sx={{
                          background: "#f8f8ff00",
                          color: "block",
                          textAlign: "center",
                        }}
                      />
                      <p
                        style={{ marginBottom: "8px", textAlign: "center" }}
                      >{`Page ${pageIndex + 1}`}</p>
                      <CardContent style={{ height: "fit-content" }}>
                        <div style={{ margin: "-10px" }}>
                          {page.sections.map((section, sectionIndex) => (
                            <div
                              style={{ marginBottom: "10px" }}
                              key={sectionIndex}
                            >
                              <Card
                                sx={{
                                  width: "100%",
                                  borderRadius: "10px",
                                }}
                              >
                                <CardHeader
                                  style={{ background: "blue", color: "#fff" }}
                                  title={
                                    <Typography
                                      variant="h6"
                                      style={{
                                        fontSize: "16px",
                                        fontWeight: "bold",
                                      }}
                                    >
                                      <KeyboardArrowDownIcon />
                                      {`Section ${sectionIndex + 1}`}
                                    </Typography>
                                  }
                                />
                                <Menu
                                  id="section-menu"
                                  anchorEl={anchorElSection}
                                  keepMounted
                                  open={
                                    Boolean(anchorElSection) &&
                                    currentSectionIndex === sectionIndex
                                  }
                                  onClose={handleCloseSection}
                                >
                                  <MenuItem
                                    onClick={() => handleAddSection(pageIndex)}
                                  >
                                    Add Section
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() =>
                                      handleRemoveSection(
                                        pageIndex,
                                        sectionIndex
                                      )
                                    }
                                  >
                                    Delete Section
                                  </MenuItem>
                                </Menu>
                                <CardContent>
                                  <div>
                                    {section.inputField.map(
                                      (inputValue, inputIndex) => (
                                        <div
                                          className="input-container"
                                          style={{ marginBottom: "10px" }}
                                          key={inputIndex}
                                        >
                                          <TextField
                                            fullWidth
                                            id="fullWidth"
                                            // style={{ width: "80%" }}
                                            value={inputValue.value}
                                            type="text"
                                            placeholder="Enter the question"
                                            onChange={(e) =>
                                              handleInputValue(
                                                pageIndex,
                                                sectionIndex,
                                                inputIndex,
                                                e
                                              )
                                            }
                                          />
                                        </div>
                                      )
                                    )}
                                  </div>
                                </CardContent>
                              </Card>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                      <Menu
                        id="page-menu"
                        anchorEl={anchorElPage}
                        keepMounted
                        open={
                          Boolean(anchorElPage) &&
                          currentPageIndex === pageIndex
                        }
                        onClose={handleClosePage}
                      >
                        <MenuItem onClick={handleAddPage}>Add Page</MenuItem>
                        <MenuItem onClick={() => handleRemovePage(pageIndex)}>
                          Delete Page
                        </MenuItem>
                      </Menu>
                    </Card>
                  ))}
                </Container>
                <div>
                  <Button
                    sx={{
                      background: "white",
                      marginTop: "10px",
                      left: "154px",
                    }}
                  >
                    Save
                  </Button>
                </div>
              </>
            ) : (
              <Container>
                <Card
                  sx={{
                    width: "100%",
                    borderRadius: "10px",
                    marginBottom: "20px",
                    background: "ghostwhite",
                    height: "fit-content",
                    minHeight: "510px",
                  }}
                ></Card>
              </Container>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Forms;
