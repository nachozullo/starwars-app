import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    alignItems: "center",
    flexDirection: "column",
  },
  message: {
    fontSize: 16,
    color: "grey",
    fontWeight: "500",
  },
}));

const Loading = ({ size = 40, message, style }) => {
  const styles = useStyles();
  return (
    <div className={styles.container} style={style}>
      <CircularProgress size={size} color="primary" />
      {message && <p className={styles.message}>{message}</p>}
    </div>
  );
};

export default Loading;
