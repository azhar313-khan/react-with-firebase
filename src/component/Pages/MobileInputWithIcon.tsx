import { Card, CardContent, TextField } from "@mui/material";
import "./Forms.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCalendar,
  faTag,
  faEllipsis,
} from "@fortawesome/free-solid-svg-icons";

function MobileInputWithIcon({
  inputIndex,
  inputValue,
  handleInputValue,
  pageIndex,
  sectionIndex,
}) {
  return (
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
            {inputValue.value.length ? inputValue.value : "Type Question"}
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
              handleInputValue(pageIndex, sectionIndex, inputIndex, e)
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

                transform: "rotate(90deg)",
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
  );
}

export default MobileInputWithIcon;
