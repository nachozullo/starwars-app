import React from "react";
import Alert from "@material-ui/lab/Alert/Alert";
import Snackbar from "@material-ui/core/Snackbar/Snackbar";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = () => ({
  icon: {
    color: "#FFFFFF !important",
  },
});

const Toast = withStyles(styles)(props => {
  const {
    open,
    duration = 6000,
    onClose,
    anchor = { vertical: "bottom", horizontal: "right" },
    text,
    type,
    style,
    classes,
  } = props;

  return open ? (
    <Snackbar open={open} autoHideDuration={duration} onClose={onClose} anchorOrigin={anchor}>
      <Alert onClose={onClose} severity={type} style={style} classes={{ icon: classes.icon }}>
        {text}
      </Alert>
    </Snackbar>
  ) : null;
});

const SuccessToast = props => (
  <Toast type="success" style={{ backgroundColor: "#43a737", color: "#FFFFFF" }} {...props} />
);

const ErrorToast = props => <Toast type="error" style={{ backgroundColor: "#ff0404", color: "#FFFFFF" }} {...props} />;

const ServerError = ({ open, onClose }) => (
  <ErrorToast open={open} onClose={onClose} text="Something went wrong. Please try again later." />
);

export { SuccessToast, ErrorToast, ServerError };
