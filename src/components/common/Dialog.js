import React from "react";
import {
  Dialog as MuiDialog,
  DialogContent,
  DialogTitle as MuiDialogTitle,
  IconButton,
  makeStyles,
} from "@material-ui/core";
import { Close } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  titleContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontWeight: "600",
    margin: 0,
    fontSize: 22,
  },
}));

const DialogTitle = ({ children, classes, onClose, style, ...other }) => {
  const styles = useStyles();
  return (
    <MuiDialogTitle disableTypography {...other} style={{ paddingBottom: 0, ...style }}>
      <div className={styles.titleContainer}>
        <p className={styles.title}>{children}</p>
        <IconButton aria-label="close" onClick={onClose} style={{ padding: 4 }}>
          <Close />
        </IconButton>
      </div>
    </MuiDialogTitle>
  );
};

const Dialog = ({ title, open, onClose, children, titleStyle }) => {
  return (
    <MuiDialog onClose={onClose} open={open} maxWidth="xs" fullWidth>
      <DialogTitle onClose={onClose} style={titleStyle}>
        {title}
      </DialogTitle>
      <DialogContent style={{ padding: "0px 24px" }}>{children}</DialogContent>
    </MuiDialog>
  );
};

export default Dialog;
