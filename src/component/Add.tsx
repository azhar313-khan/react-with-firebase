import {
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  OutlinedInput,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/userSlice";
import { AppDispatch } from "../store/store";
import { loginState, RowTask } from "../interface";
import { statusTypesValue, taskValues } from "../constant";
import { AddComponent, SnackbarMessages } from "../assets/constantText";

const Add = () => {
  const myRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = useSelector(
    (state: loginState) => state?.authStore?.user?.authId
  );

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      description: "",
      type: "",
      status: "",
      userId: "",
      authId: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required("Name is required"),
      type: Yup.string().required("Type is required"),
      status: Yup.string().required("Status is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values: RowTask) => {
      values.authId = loginUser;
      values.id = String(Math.floor(new Date().valueOf() * Math.random()));
      dispatch(addTask(values));
      enqueueSnackbar(SnackbarMessages.CREATE_SUCCESS, {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: SnackbarMessages.AUTO_HIDE_DURATION,
      });
      navigate("/");
    },
  });

  const typeValue = taskValues;
  const statusType = statusTypesValue;

  return (
    <>
      <div ref={myRef} style={{ marginTop: "40px" }}>
        <h2 style={{ textAlign: "center" }}>{AddComponent.CREATE}</h2>
        <form
          onSubmit={formik.handleSubmit}
          style={{ margin: "auto", width: "60%" }}
        >
          <div>
            <TextField
              id="outlined-basic"
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
            />
          </div>
          <div>
            <FormControl sx={{ mt: 1, width: 1100 }}>
              <InputLabel id="demo-multiple-name-label">
                {AddComponent.TYPE}
              </InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                name="type"
                value={formik.values.type}
                onChange={formik.handleChange}
                error={formik.touched.type && Boolean(formik.errors.type)}
                onBlur={formik.handleBlur}
                input={<OutlinedInput label="Type" />}
              >
                {typeValue.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
              {formik.touched.type && formik.errors.type && (
                <FormHelperText className="textColor">
                  {formik.errors.type}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div>
            <FormControl sx={{ mt: 1, mb: 1, width: 1100 }}>
              <InputLabel id="demo-multiple-name-label">
                {AddComponent.STATUS}
              </InputLabel>
              <Select
                name="status"
                value={formik.values.status}
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                onChange={formik.handleChange}
                error={
                  formik?.touched?.status && Boolean(formik?.errors?.status)
                }
                onBlur={formik.handleBlur}
                input={<OutlinedInput label="Status" />}
              >
                {statusType.map((opt) => (
                  <MenuItem key={opt.value} value={opt.value}>
                    {opt.label}
                  </MenuItem>
                ))}
              </Select>
              {formik?.touched?.status && formik?.errors?.status && (
                <FormHelperText className="textColor">
                  {formik?.errors?.status}
                </FormHelperText>
              )}
            </FormControl>
          </div>
          <div>
            <div>
              <ReactQuill
                theme="snow"
                value={formik?.values?.description}
                onChange={(value) => {
                  formik.setFieldValue("description", value);
                }}
                className={
                  formik.errors.description ? "quill-editor-error" : ""
                }
              />
              {formik?.touched?.description && formik?.errors?.description && (
                <div className="error-message">
                  {formik?.errors?.description}
                </div>
              )}
            </div>
          </div>
          <div>
            <Button
              type="submit"
              variant="contained"
              style={{ marginTop: "20px" }}
            >
              {AddComponent.CREATE}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
