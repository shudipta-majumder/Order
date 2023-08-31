import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function SimpleBackdrop() {
  return (
    <Backdrop open={true} className="z-[99999]">
      <CircularProgress color="inherit" />
    </Backdrop>
  );
}
