import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Fade from "@mui/material/Fade";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

type Props = {
  isSuccess: boolean;
  open: boolean;
  onClose: () => void;
};
const style = {
  display: "flex",
  flexFlow: "column",
  gap: "1rem",
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  borderRadius: "10px",
  boxShadow: 24,
  p: 4,
};
const NotificatioModal = ({ open, isSuccess, onClose }: Props) => {
  const textSuccess = "Thêm chiến dịch thành công";
  const textEror = "Vui lòng điền đúng và đầy đủ thông tin";
  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={open}
      onClose={onClose}
      closeAfterTransition
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={open}>
        <Box sx={style}>
          <Typography
            id="transition-modal-title"
            variant="h4"
            component="h2"
            style={{
              textAlign: "center",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "8px",
              color: isSuccess ? "#2e7d32" : "#ed6c02",
            }}
          >
            {isSuccess ? "Thành công" : "Thất bại"}
            {isSuccess ? (
              <CheckCircleRoundedIcon fontSize="large" color={"success"} />
            ) : (
              <ErrorOutlineIcon fontSize="large" color={"warning"} />
            )}
          </Typography>
          <Typography
            id="transition-modal-description"
            sx={{ mt: 2 }}
            style={{
              textAlign: "center",
              color: isSuccess ? "inherit" : "#ed6c02",
            }}
          >
            {isSuccess ? textSuccess : textEror}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
};

export default NotificatioModal;
