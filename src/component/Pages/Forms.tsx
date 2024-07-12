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
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import PostAddIcon from "@mui/icons-material/PostAdd";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import TitleIcon from "@mui/icons-material/Title";
import AppsIcon from "@mui/icons-material/Apps";
import { useEffect, useRef, useState } from "react";
import "./Forms.css";
import React from "react";
import AddPageCard from "./AddPageCard";
import TextInput from "./TextInput";
import CollpaseBtn from "./CollpaseBtn";
import MobileHeading from "./MobileHeading";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCalendar,
  faTag,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons"; // Adjust the imports according to your needs
import Picklist from "./Picklist";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

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
  const [time, setItme] = useState(new Date().toLocaleTimeString());
  const [open, setOpen] = useState(false);
  const [anchorElPage, setAnchorElPage] = useState<HTMLElement | null>(null);
  const [anchorElSection, setAnchorElSection] = useState<HTMLElement | null>(
    null
  );
  const [currentPageIndex, setCurrentPageIndex] = useState<number | null>(null);
  const [currentSectionIndex, setCurrentSectionIndex] = useState<number | null>(
    null
  );
  const [currentPage, setCurrentPage] = useState(1);
  const inputType = ["Text Type", "Number Type"];

  const [selectedValue, setSelectedValue] = React.useState(inputType[0]);

  const itemsPerPage = 1;
  const [pages, setPages] = useState([
    {
      visible: true,
      sections: [
        {
          sectionVisible: true,
          inputField: [
            {
              value: "",
              ref: React.createRef<HTMLInputElement>(),
              type: "text",
            },
          ],
        },
      ],
    },
  ]);

  const [focusedInput, setFocusedInput] = useState({
    pageIndex: null,
    sectionIndex: null,
    inputIndex: null,
  });

  const focusInputField = (
    pageIndex: number,
    sectionIndex: number,
    inputIndex: number
  ) => {
    const inputFieldRef =
      pages?.[pageIndex]?.sections?.[sectionIndex]?.inputField?.[inputIndex]
        ?.ref;
    inputFieldRef?.current?.focus();
  };

  const indexOfLastPage = currentPage * itemsPerPage;
  const indexOfFirstPage = indexOfLastPage - itemsPerPage;
  const currentPages = pages.slice(indexOfFirstPage, indexOfLastPage);

  const totalPages = Math.ceil(pages.length / itemsPerPage);
  const label = {
    inputProps: { "aria-label": "Switch demo" },
    style: {
      float: "right",
    },
  };

  const handleNextPage = () => {
    setCurrentPage((prev) => (prev < totalPages ? prev + 1 : prev));
  };

  const handlePreviousPage = () => {
    setCurrentPage((prev) => (prev > 1 ? prev - 1 : prev));
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setItme(new Date().toLocaleTimeString());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (currentPageIndex !== null && currentSectionIndex !== null) {
      const lastInputIndex =
        pages[currentPageIndex]?.sections[currentSectionIndex]?.inputField
          .length - 1;
      if (lastInputIndex !== undefined && lastInputIndex >= 0) {
        focusInputField(currentPageIndex, currentSectionIndex, lastInputIndex);
      }
    }
  }, [pages]);

  const handleToggleVisibility = (pageIndex) => {
    setPages((prevPages) =>
      prevPages.map((page, index) =>
        index === pageIndex
          ? {
              ...page,
              visible: !page.visible,
              sections: page.sections.map((section) => ({
                ...section,
                sectionVisible: !page.visible,
              })),
            }
          : page
      )
    );
  };

  const handleToggleVisibilitySection = (pageIndex, sectionIndex) => {
    setPages((prevPages) =>
      prevPages.map((page, index) =>
        index === pageIndex
          ? {
              ...page,
              sections: page.sections.map((section, index) =>
                index === sectionIndex
                  ? { ...section, sectionVisible: !section.sectionVisible }
                  : section
              ),
            }
          : page
      )
    );
  };

  const handleClickPage = (event, index) => {
    setAnchorElPage(event.currentTarget);
    setCurrentPageIndex(index);
  };

  const handleClosePage = () => {
    setAnchorElPage(null);
    setCurrentPageIndex(null);
  };

  const handleAddPage = () => {
    const newInputField = {
      value: "",
      ref: React.createRef<HTMLInputElement>(),
    };
    const newPage = {
      visible: true,
      sections: [{ sectionVisible: true, inputField: [newInputField] }],
    };

    setPages((prevPages) => {
      const updatedPages = [...prevPages, newPage];
      setTimeout(() => {
        newInputField.ref.current?.focus();
      }, 0);

      return updatedPages;
    });

    handleClosePage();
  };

  const handleRemovePage = (pageIndex) => {
    const newPages = pages.filter((_, i) => i !== pageIndex);
    setPages(newPages);
    handleClosePage();
  };

  const handleAddSection = (pageIndex) => {
    const newInputField = {
      value: "",
      ref: React.createRef<HTMLInputElement>(),
    };
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        return {
          ...page,
          sections: [
            ...page.sections,
            {
              sectionVisible: true,
              inputField: [newInputField],
            },
          ],
        };
      }
      return page;
    });
    setPages(newPages);
    setTimeout(() => {
      newInputField.ref.current?.focus();
    }, 0);
    handleCloseSection();
  };

  // const handleSwitch = (e) => console.log(e.target.checked);
  const handleSwitch = (e) => {
    setPages((prevPages) =>
      prevPages.map((page) => ({
        ...page,
        visible: e.target.checked,
        sections: page.sections.map((section) => ({
          ...section,
          sectionVisible: e.target.checked,
        })),
      }))
    );
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
    const newInputField = {
      value: "",
      ref: React.createRef<HTMLInputElement>(),
    };
    const newPages = pages.map((page, i) => {
      if (i === pageIndex) {
        const newSections = page.sections.map((section, j) => {
          if (j === sectionIndex) {
            return {
              ...section,
              inputField: [...section.inputField, newInputField],
            };
          }
          return section;
        });
        return { ...page, sections: newSections };
      }
      return page;
    });
    setTimeout(() => {
      newInputField.ref.current?.focus();
    }, 0);
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
  const handleFocus = (pageIndex, sectionIndex, inputIndex) => {
    setFocusedInput({ pageIndex, sectionIndex, inputIndex });
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value: string) => {
    setOpen(false);
    setSelectedValue(value);
  };

  const updateInputType = (pageIndex, sectionIndex, inputIndex, newType) => {
    const newPages = [...pages];
    newPages[pageIndex].sections[sectionIndex].inputField[inputIndex].type =
      newType;
    setPages(newPages);
  };

  const handlePicklistClose = (value) => {
    setOpenPicklist(false);
    setSelectedValue(value);
    const newType = value.split(" ")[0].toLowerCase(); // Convert "Text Type" to "text"
    updateInputType(0, 0, 0, newType); // Update the type of the first input field for demonstration
  };

  const handleBlur = () => {
    setFocusedInput({ pageIndex: null, sectionIndex: null, inputIndex: null });
  };
  const onDragEnd = (result) => {
    if (!result.destination) return;

    const newPages = [...pages];
    const [removed] = newPages[
      result.source.droppableId
    ].sections[0].inputField.splice(result.source.index, 1);
    newPages[result.destination.droppableId].sections[0].inputField.splice(
      result.destination.index,
      0,
      removed
    );

    setPages(newPages);
  };

  return (
    <>
      {/* Desktop View */}
      <CollpaseBtn handleSwitch={handleSwitch} />
      <div className="box-css">
        {pages.length > 0 ? (
          <div className="inner-box">
            <DragDropContext onDragEnd={onDragEnd}>
              {pages.map((page, pageIndex) => (
                <>
                  <Card className="d-card" key={pageIndex}>
                    <CardHeader
                      className="d-card-header"
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

                    {page.visible && (
                      <Droppable key={pageIndex} droppableId={`${pageIndex}`}>
                        <CardContent>
                          <div
                            style={{
                              margin: "0px 37px 0 94px",
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
                                          {section?.inputField?.length > 0
                                            ? section?.inputField.length
                                            : ""}
                                        </p>
                                        <MoreHorizIcon
                                          aria-controls="section-menu"
                                          aria-haspopup="true"
                                          onClick={(event) =>
                                            handleClickSection(
                                              event,
                                              sectionIndex
                                            )
                                          }
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
                                              handleToggleVisibilitySection(
                                                pageIndex,
                                                sectionIndex
                                              )
                                            }
                                          />
                                        ) : (
                                          <KeyboardArrowRightIcon
                                            sx={{
                                              margin: "10px",
                                              cursor: "pointer",
                                            }}
                                            onClick={() =>
                                              handleToggleVisibilitySection(
                                                pageIndex,
                                                sectionIndex
                                              )
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
                                      onClick={() =>
                                        handleAddSection(pageIndex)
                                      }
                                    >
                                      Add Section{" "}
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

                                  {section.sectionVisible && (
                                    <CardContent
                                      style={{
                                        padding: "16px",
                                        marginTop: "-14px",
                                      }}
                                    >
                                      <div
                                        style={{
                                          padding: "0px",
                                          marginTop: "10px",
                                        }}
                                      >
                                        {section.inputField.map(
                                          (inputValue, inputIndex) => (
                                            <>
                                              <div style={{ display: "flex" }}>
                                                <div
                                                  style={
                                                    {
                                                      // width: "2%",
                                                      // marginTop: "-11px",
                                                    }
                                                  }
                                                >
                                                  {focusedInput.pageIndex ===
                                                    pageIndex &&
                                                    focusedInput.sectionIndex ===
                                                      sectionIndex &&
                                                    focusedInput.inputIndex ===
                                                      inputIndex && (
                                                      <Card
                                                        style={{
                                                          display: "block",
                                                        }}
                                                      >
                                                        <Tooltip title="Add Question">
                                                          <div>
                                                            <IconButton
                                                              onMouseDown={(
                                                                e
                                                              ) =>
                                                                e.preventDefault()
                                                              }
                                                              style={{
                                                                left: "5px",
                                                                marginBottom:
                                                                  "-11px",
                                                              }}
                                                              aria-label="Question"
                                                              onClick={() =>
                                                                handleAddInput(
                                                                  pageIndex,
                                                                  sectionIndex
                                                                )
                                                              }
                                                            >
                                                              <ControlPointOutlinedIcon
                                                                sx={{
                                                                  color:
                                                                    blue[500],
                                                                }}
                                                              />
                                                            </IconButton>
                                                          </div>
                                                        </Tooltip>
                                                        <Tooltip title="Delete">
                                                          <div>
                                                            <IconButton
                                                              onMouseDown={(
                                                                e
                                                              ) =>
                                                                e.preventDefault()
                                                              }
                                                              aria-label="Delete"
                                                              style={{
                                                                margin: "3px",
                                                              }}
                                                              onClick={() =>
                                                                handleRemoveQuestion(
                                                                  pageIndex,
                                                                  sectionIndex,
                                                                  inputIndex
                                                                )
                                                              }
                                                            >
                                                              <DeleteForeverIcon
                                                                sx={{
                                                                  color:
                                                                    pink[500],
                                                                }}
                                                              />
                                                            </IconButton>
                                                          </div>
                                                        </Tooltip>
                                                      </Card>
                                                    )}
                                                </div>
                                                <div
                                                  className="input-container"
                                                  style={{
                                                    width: "100%",
                                                  }}
                                                  key={inputIndex}
                                                >
                                                  <AppsIcon
                                                    sx={{
                                                      height: "40px",
                                                      margin: "6px",
                                                      color: "#ccc",
                                                    }}
                                                  />
                                                  <TextInput
                                                    handleFocus={handleFocus}
                                                    handleInputValue={
                                                      handleInputValue
                                                    }
                                                    pageIndex={pageIndex}
                                                    sectionIndex={sectionIndex}
                                                    inputIndex={inputIndex}
                                                    inputValue={inputValue}
                                                    handleBlur={handleBlur}
                                                    // inputType={selectedValue}
                                                    inputType={inputValue.type}
                                                  />

                                                  <>
                                                    <CardActions disableSpacing>
                                                      <Tooltip title="Delete">
                                                        <span
                                                          onMouseDown={(e) =>
                                                            e.preventDefault()
                                                          }
                                                          style={{
                                                            marginRight:
                                                              "200px",
                                                            fontSize: "15px",
                                                            fontWeight: "bold",
                                                            color: "black",
                                                            width: "168px",
                                                          }}
                                                        >
                                                          <span className="input-line">
                                                            |
                                                          </span>
                                                          <span
                                                            style={{
                                                              fontSize: "17px",
                                                              margin: "6px",
                                                              background:
                                                                "#ff000036",
                                                              color:
                                                                "#00000082",
                                                              fontWeight:
                                                                "bold",
                                                              padding:
                                                                "1px 4px 0px 4px",
                                                            }}
                                                          >
                                                            {
                                                              selectedValue.split(
                                                                ""
                                                              )[0]
                                                            }
                                                          </span>

                                                          {selectedValue}
                                                        </span>
                                                      </Tooltip>
                                                      <KeyboardArrowDownIcon
                                                        onClick={
                                                          handleClickOpen
                                                        }
                                                        style={{
                                                          cursor: "pointer",
                                                        }}
                                                      />
                                                    </CardActions>
                                                  </>
                                                </div>
                                              </div>

                                              <Picklist
                                                selectedValue={selectedValue}
                                                open={open}
                                                onClose={handleClose}
                                              />
                                            </>
                                          )
                                        )}
                                      </div>
                                    </CardContent>
                                  )}
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
                                  height: "15px",
                                  width: "auto",
                                }}
                              />

                              <Typography
                                variant="h6"
                                style={{ fontSize: "10px", color: "#212121" }}
                              >
                                Add Section
                              </Typography>
                            </Button>
                          </div>
                        </CardContent>
                      </Droppable>
                    )}
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
                          height: "15px",
                          width: "auto",
                        }}
                      />
                      <Typography
                        variant="h6"
                        style={{ fontSize: "10px", color: "#212121" }}
                      >
                        Add Page
                      </Typography>
                    </Button>
                  </div>
                </>
              ))}
            </DragDropContext>
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
                width: "61%",
              }}
            >
              <NoteAddOutlinedIcon
                fontSize="large"
                sx={{
                  marginTop: "12%",
                  marginLeft: "9%",
                  height: "85px", // Set the height of the background to 200px
                  width: "auto", // Adjust width as needed
                }}
              />
              <div style={{ color: "black" }}>
                To Add the Questions,add a Page first
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
        {/* Mobile View */}
        <div>
          {pages.length > 0 ? (
            <div>
              <div
                style={{
                  width: "268px",
                  height: "532px",
                  /* background: red; */
                  border: "11px solid rgb(158 158 158 / 23%)",
                  borderRadius: "39px",
                }}
              >
                <div className="smartphone" style={{ width: "13.5%" }}>
                  <MobileHeading time={time} />
                  {pages.length > 0 ? (
                    <>
                      <Container className="card-container">
                        {currentPages.map((page, pageIndex) => (
                          <Card
                            sx={{
                              width: "100%",
                              borderRadius: "10px",
                              marginBottom: "20px",
                              background: "aliceblue",
                              height: "fit-content",
                              minHeight: "350px",
                            }}
                            key={indexOfFirstPage + pageIndex}
                          >
                            <p
                              style={{
                                textAlign: "center",
                                background: "#9e9e9e3d",
                                height: "50px",
                                marginBottom: "-37px",
                                fontSize: "12px",
                              }}
                            >{`Page ${indexOfFirstPage + pageIndex + 1}`}</p>
                            <hr
                              style={{
                                marginTop: -"28px",
                                border: "2px solid rgb(132 158 158)",
                                marginRight: "9px",
                                marginLeft: "9px",
                              }}
                            />
                            <CardHeader
                              sx={{
                                background: "rgb(158 158 158 / 4%)",
                                color: "block",
                                textAlign: "center",
                                padding: "0px",
                                borderBottom: "2px ridge",
                              }}
                            />
                            <CardContent style={{ height: "fit-content" }}>
                              <div style={{ margin: "-10px" }}>
                                {page.sections.map((section, sectionIndex) => (
                                  <div
                                    style={{
                                      marginBottom: "10px",
                                    }}
                                    key={sectionIndex}
                                  >
                                    <CardHeader
                                      style={{
                                        background: "rgb(53, 45, 242)",
                                        color: "#fff",
                                        height: "40px",
                                        borderRadius: "9px",
                                      }}
                                      title={
                                        <Typography
                                          variant="h6"
                                          style={{
                                            fontSize: "12px",
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
                                        onClick={() =>
                                          handleAddSection(pageIndex)
                                        }
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

                                    {section.sectionVisible && (
                                      <CardContent>
                                        <div>
                                          {section.inputField.map(
                                            (inputValue, inputIndex) => (
                                              <>
                                                <Card
                                                  className="input-container-mobile"
                                                  style={{
                                                    marginBottom: "10px",
                                                    background: "white",
                                                  }}
                                                  key={inputIndex}
                                                >
                                                  <CardContent>
                                                    <h6
                                                      style={{
                                                        fontSize: "12px",
                                                      }}
                                                    >
                                                      {inputValue.value.length
                                                        ? inputValue.value
                                                        : "Type Question"}
                                                    </h6>
                                                    <TextField
                                                      style={{
                                                        background: "#fff",
                                                      }}
                                                      fullWidth
                                                      id="fullWidth"
                                                      value={inputValue.value}
                                                      type="text"
                                                      placeholder="Enter"
                                                      onChange={(e) =>
                                                        handleInputValue(
                                                          pageIndex,
                                                          sectionIndex,
                                                          inputIndex,
                                                          e
                                                        )
                                                      }
                                                    />

                                                    <span
                                                      style={{
                                                        marginLeft: "3px",
                                                        fontSize: "10px",
                                                        display: "inline-grid",
                                                        marginRight: "8px",
                                                        marginTop: "10px",
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faImage}
                                                        style={{
                                                          marginTop: "10px",
                                                          height: "14px",
                                                          marginLeft: "6px",
                                                        }}
                                                      />
                                                      Photo
                                                    </span>
                                                    <span
                                                      style={{
                                                        marginLeft: "3px",
                                                        fontSize: "10px",
                                                        display: "inline-grid",
                                                        marginRight: "8px",
                                                        marginTop: "10px",
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faCalendar}
                                                        style={{
                                                          marginTop: "10px",
                                                          height: "14px",
                                                          marginLeft: "6px",
                                                        }}
                                                      />
                                                      Note
                                                    </span>
                                                    <span
                                                      style={{
                                                        marginLeft: "3px",
                                                        fontSize: "10px",
                                                        display: "inline-grid",
                                                        marginRight: "8px",
                                                        marginTop: "10px",
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faTag}
                                                        style={{
                                                          marginTop: "10px",
                                                          height: "14px",
                                                          marginLeft: "6px",

                                                          transform:
                                                            "rotate(90deg)",
                                                        }}
                                                      />
                                                      Action
                                                    </span>
                                                    <span
                                                      style={{
                                                        marginLeft: "5px",
                                                        fontSize: "10px",
                                                        display: "inline-grid",
                                                        marginRight: "8px",
                                                        marginTop: "10px",
                                                      }}
                                                    >
                                                      <FontAwesomeIcon
                                                        icon={faEllipsis}
                                                        style={{
                                                          marginTop: "10px",
                                                          height: "14px",
                                                          marginLeft: "6px",
                                                        }}
                                                      />
                                                      More
                                                    </span>
                                                  </CardContent>
                                                </Card>
                                              </>
                                            )
                                          )}
                                        </div>
                                      </CardContent>
                                    )}
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
                              <MenuItem onClick={handleAddPage}>
                                Add Page
                              </MenuItem>
                              <MenuItem
                                onClick={() => handleRemovePage(pageIndex)}
                              >
                                Delete Page
                              </MenuItem>
                            </Menu>
                          </Card>
                        ))}
                      </Container>
                      <div>
                        <Button
                          className="prev-btn"
                          onClick={handlePreviousPage}
                          disabled={currentPage <= 1}
                        >
                          Prev
                        </Button>
                        <Button className="save-btn">Save</Button>

                        <Button
                          className="next-btn"
                          onClick={handleNextPage}
                          disabled={currentPage >= totalPages}
                        >
                          Next
                        </Button>
                      </div>
                    </>
                  ) : (
                    <Container>
                      <Card className="m-card-bottom"></Card>
                    </Container>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div>
                <div
                  style={{
                    width: "268px",
                    height: "532px",
                    border: "11px solid rgb(158 158 158 / 23%)",
                    borderRadius: "39px",
                  }}
                >
                  <div className="smartphone" style={{ width: "13.5%" }}>
                    <MobileHeading time={time} />
                    {pages.length > 0 ? (
                      <>
                        <Container className="card-container"></Container>
                      </>
                    ) : (
                      <AddPageCard handleAddPage={handleAddPage} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Forms;
