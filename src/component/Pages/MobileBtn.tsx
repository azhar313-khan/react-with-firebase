import { Button } from "@mui/material";
import "./Forms.css";

function MobileBtn({
  handlePreviousPage,
  handleNextPage,
  currentPage,
  totalPages,
}) {
  return (
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
  );
}

export default MobileBtn;
