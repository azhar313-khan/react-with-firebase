import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import styled from "styled-components";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import AppsIcon from "@mui/icons-material/Apps";
import { useEffect, useRef, useState } from "react";
import "./Forms.css";
import React from "react";
import AddPageCard from "./AddPageCard";
import TextInput from "./TextInput";
import CollpaseBtn from "./CollpaseBtn";
import MobileHeading from "./MobileHeading";
import Picklist from "./Picklist";
import MobileBtn from "./MobileBtn";
import MobileInputWithIcon from "./MobileInputWithIcon";
import NoPageAddPage from "./NoPageAddPage";
import AddPageButton from "./AddPageButton";
import PageHeading from "./PageHeading";
import SectionHeading from "./SectionHeading";
import SectionMenu from "./SectionMenu";
import AddDeleteQuestiion from "./AddDeleteQuestiion";
import QuestionAction from "./QuestionAction";
import AddDeletePage from "./AddDeletePage";
import AddSection from "./AddSection";
import DraggenDrop from "./DraggenDrop";

const Container = styled.div``;

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

  const handleSwitch = (e) => {
    setPages((prevPages) =>
      prevPages.map((page) => ({
        ...page,

        visible: !page?.visible,
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

  const handleBlur = () => {
    setFocusedInput({ pageIndex: null, sectionIndex: null, inputIndex: null });
  };
  const moveInput = (
    fromPageIndex,
    fromSectionIndex,
    fromInputIndex,
    toPageIndex,
    toSectionIndex,
    toInputIndex
  ) => {
    const updatedPages = [...pages];
    const [movedItem] = updatedPages[fromPageIndex].sections[
      fromSectionIndex
    ].inputField.splice(fromInputIndex, 1);
    updatedPages[toPageIndex].sections[toSectionIndex].inputField.splice(
      toInputIndex,
      0,
      movedItem
    );
    setPages(updatedPages);
  };

  return (
    <>
      {/* Desktop View */}
      <CollpaseBtn handleSwitch={handleSwitch} />
      <div className="box-css">
        {pages.length > 0 ? (
          <div className="inner-box">
            {pages.map((page, pageIndex) => (
              <>
                <Card className="d-card" key={pageIndex}>
                  <PageHeading
                    handleClickPage={handleClickPage}
                    handleToggleVisibility={handleToggleVisibility}
                    pageIndex={pageIndex}
                    page={page}
                  />

                  {page.visible && (
                    <CardContent>
                      <div style={{ margin: "0px 37px 0 94px" }}>
                        {page.sections.map((section, sectionIndex) => (
                          <div
                            style={{ marginBottom: "10px" }}
                            key={sectionIndex}
                          >
                            <Card sx={{ width: "100%", borderRadius: "10px" }}>
                              <SectionHeading
                                section={section}
                                handleClickSection={handleClickSection}
                                handleToggleVisibilitySection={
                                  handleToggleVisibilitySection
                                }
                                pageIndex={pageIndex}
                                sectionIndex={sectionIndex}
                              />
                              <SectionMenu
                                anchorElSection={anchorElSection}
                                currentSectionIndex={currentSectionIndex}
                                handleCloseSection={handleCloseSection}
                                handleAddSection={handleAddSection}
                                pageIndex={pageIndex}
                                sectionIndex={sectionIndex}
                                handleRemoveSection={handleRemoveSection}
                              />
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
                                            <div>
                                              {focusedInput.pageIndex ===
                                                pageIndex &&
                                                focusedInput.sectionIndex ===
                                                  sectionIndex &&
                                                focusedInput.inputIndex ===
                                                  inputIndex && (
                                                  <AddDeleteQuestiion
                                                    handleAddInput={
                                                      handleAddInput
                                                    }
                                                    handleRemoveQuestion={
                                                      handleRemoveQuestion
                                                    }
                                                    pageIndex={pageIndex}
                                                    sectionIndex={sectionIndex}
                                                    inputIndex={inputIndex}
                                                  />
                                                )}
                                            </div>
                                            <div
                                              className="input-container"
                                              style={{
                                                width: "100%",
                                              }}
                                              key={inputIndex}
                                            >
                                              <AppsIcon className="d-AppsIcon" />
                                              {/* <TextInput
                                                handleFocus={handleFocus}
                                                handleInputValue={
                                                  handleInputValue
                                                }
                                                pageIndex={pageIndex}
                                                sectionIndex={sectionIndex}
                                                inputIndex={inputIndex}
                                                inputValue={inputValue}
                                                handleBlur={handleBlur}
                                                inputType={inputValue.type}
                                              /> */}
                                              <DraggenDrop
                                                key={inputIndex}
                                                inputValue={inputValue}
                                                pageIndex={pageIndex}
                                                sectionIndex={sectionIndex}
                                                inputIndex={inputIndex}
                                                moveInput={moveInput}
                                                handleFocus={handleFocus}
                                                handleInputValue={
                                                  handleInputValue
                                                }
                                                handleBlur={handleBlur}
                                                index={undefined}
                                              />
                                              <QuestionAction
                                                selectedValue={selectedValue}
                                                handleClickOpen={
                                                  handleClickOpen
                                                }
                                              />
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
                      <AddSection
                        handleAddSection={handleAddSection}
                        pageIndex={pageIndex}
                      />
                    </CardContent>
                  )}
                  <AddDeletePage
                    anchorElPage={anchorElPage}
                    currentPageIndex={currentPageIndex}
                    pageIndex={pageIndex}
                    handleClosePage={handleClosePage}
                    handleAddPage={handleAddPage}
                    handleRemovePage={handleRemovePage}
                  />
                </Card>
                <AddPageButton handleAddPage={handleAddPage} />
              </>
            ))}
          </div>
        ) : (
          <NoPageAddPage handleAddPage={handleAddPage} />
        )}
        {/* Mobile View */}
        <div>
          {pages.length > 0 ? (
            <div>
              <div className="m-div">
                <div className="smartphone" style={{ width: "13.5%" }}>
                  <MobileHeading time={time} />
                  {pages.length > 0 ? (
                    <>
                      <Container className="card-container">
                        {currentPages.map((page, pageIndex) => (
                          <Card
                            className="m-container-card"
                            key={indexOfFirstPage + pageIndex}
                          >
                            <p className="m-p-heading ">
                              {`Page ${indexOfFirstPage + pageIndex + 1}`}
                            </p>
                            <hr className="m-hr" />
                            <CardHeader className="m-cardHeading" />
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
                                      className="m-cardHeader-title"
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

                                    {section.sectionVisible && (
                                      <CardContent>
                                        <div>
                                          {section.inputField.map(
                                            (inputValue, inputIndex) => (
                                              <MobileInputWithIcon
                                                inputIndex={inputIndex}
                                                inputValue={inputValue}
                                                handleInputValue={
                                                  handleInputValue
                                                }
                                                pageIndex={pageIndex}
                                                sectionIndex={sectionIndex}
                                              />
                                            )
                                          )}
                                        </div>
                                      </CardContent>
                                    )}
                                  </div>
                                ))}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </Container>
                      <MobileBtn
                        handlePreviousPage={handlePreviousPage}
                        handleNextPage={handleNextPage}
                        currentPage={currentPage}
                        totalPages={totalPages}
                      />
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
              <div className="m-clearIconCss">
                <div className="smartphone" style={{ width: "13.5%" }}>
                  <MobileHeading time={time} />
                  {pages.length > 0 ? (
                    <Container className="card-container"></Container>
                  ) : (
                    <AddPageCard handleAddPage={handleAddPage} />
                  )}
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
