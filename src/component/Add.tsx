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
import { useNavigate, useParams } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "../features/userSlice";
import { AppDispatch } from "../store/store";

interface Row {
  authId: string;
  id: string | number;
  name: string;
  description: string;
  type: string;
  status: string;
  userId: string;
}

interface loginState {
  authStore: {
    user: {
      authId: string;
    };
  };
}

const Add = () => {
  const myRef = useRef(null);
  const dispatch = useDispatch<AppDispatch>();

  const loginUser = useSelector(
    (state: loginState) => state?.authStore?.user?.authId
  );

  const { id } = useParams();
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
    onSubmit: (values: Row) => {
      values.authId = loginUser;
      values.id = Math.floor(new Date().valueOf() * Math.random());
      dispatch(addTask(values));
      enqueueSnackbar("Create successfully", {
        variant: "success",
        anchorOrigin: { vertical: "top", horizontal: "center" },
        autoHideDuration: 1000,
      });
      navigate("/");
    },
  });

  const typeValue = [
    { value: "Task", label: "Task" },
    { value: "SubTask", label: "SubTask" },
  ];

  const statusType = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
  ];

  return (
    <>
      <div ref={myRef}>
        <h2 style={{ textAlign: "center" }}>{id ? "Update" : "Create"}</h2>
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
              <InputLabel id="demo-multiple-name-label">Type</InputLabel>
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
              <InputLabel id="demo-multiple-name-label">Status</InputLabel>
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
            <div
            // className={formState.errors.description ? "quill-editor-error" : ""}
            >
              <ReactQuill
                theme="snow"
                value={formik?.values?.description}
                onChange={(value) => {
                  formik.setFieldValue("description", value); // Update formik field value
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
              {id ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Add;
