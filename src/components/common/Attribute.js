import React from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useGetAll } from "../../hooks";

const useStyles = makeStyles(theme => ({
  field: {
    color: theme.palette.text.secondary,
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

const ArrayData = ({ data, arrayName, field }) => {
  const styles = useStyles();
  const [results, loading] = useGetAll(data, arrayName);

  return (
    <div className={styles.fieldContainer}>
      <span className={styles.field}>{arrayName.toUpperCase()}: </span>
      <span>
        {loading ? (
          <>
            <CircularProgress size={16} style={{ marginLeft: 10 }} />
            <span style={{ marginLeft: 10 }}>Loading {arrayName}...</span>
          </>
        ) : results ? (
          results.map(item => item[field]).join(", ")
        ) : (
          "-"
        )}
      </span>
    </div>
  );
};

export { Attribute, ArrayData };
