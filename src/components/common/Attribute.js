import React from "react";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  field: {
    color: "grey",
    fontWeight: "600",
  },
  fieldContainer: {
    margin: "20px 0",
  },
}));

const Attribute = ({ field, value }) => {
  const styles = useStyles();
  return (
    <div className={styles.fieldContainer}>
      <span className={styles.field}>{field}: </span>
      <span>{value}</span>
    </div>
  );
};

export default Attribute;
