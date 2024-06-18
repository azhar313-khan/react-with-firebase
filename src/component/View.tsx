import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Row } from "../interface";
import { fetchTaskByid } from "../features/userSlice";
import { useEffect } from "react";
import { AppDispatch } from "../store/store";
import { Box } from "@mui/material";

interface rowData {
  taskStore: {
    rows: Row[];
    searchQuery: string;
    filterStatus: string;
  };
}

const View = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch<AppDispatch>();

  const task = useSelector((state: rowData) =>
    state?.taskStore.rows.find((row) => row.id === id)
  );
  const redirect = useNavigate();
  const htmlText = task?.description;

  const goBack = () => {
    redirect("/");
  };

  useEffect(() => {
    if (id) {
      dispatch(fetchTaskByid(id));
    } else {
      console.error("ID is undefined");
    }
  }, [dispatch, id]);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>View Page</h1>
      <Card style={{ margin: "auto", width: "60%" }}>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            Name: <b>{task?.name}</b>
          </Typography>

          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            Type:<b>{task?.type} </b>
          </Typography>
          <Box sx={{ mb: 1.5 }}>
            <Typography color="text.secondary">Description:</Typography>
            {htmlText && (
              <Typography
                component="div"
                color="text.secondary"
                dangerouslySetInnerHTML={{ __html: htmlText }}
              />
            )}
          </Box>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={goBack}>
            Back
          </Button>
        </CardActions>
      </Card>
    </>
  );
};

export default View;
