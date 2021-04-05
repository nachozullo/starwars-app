import React from "react";
import { CircularProgress, makeStyles, Tooltip } from "@material-ui/core";
import { useGetAll } from "../../hooks";
import { isValidCSSColor } from "../../utils/utils";

const useStyles = makeStyles(theme => ({
  field: {
    color: theme.palette.text.secondary,
    fontWeight: "600",
    marginRight: 5,
  },
  fieldContainer: {
    margin: "20px 0",
  },
}));

const ColorValue = ({ value }) => {
  return value.split(", ").map(color => (
    <div key={color} style={{ display: "flex", alignItems: "center" }}>
      <Tooltip title={isValidCSSColor(color) ? "" : "Color can't be displayed."}>
        <div
          style={{
            width: 16,
            height: 16,
            borderRadius: 8,
            backgroundColor: isValidCSSColor(color) ? color : "transparent",
            margin: "0 5px",
            border: `.5px ${isValidCSSColor(color) ? "solid" : "dashed"} grey`,
          }}
        />
      </Tooltip>
      <span>{color}</span>
    </div>
  ));
};

const Attribute = ({ field, value }) => {
  const styles = useStyles();
  return (
    <div className={styles.fieldContainer} style={{ display: "flex" }}>
      <span className={styles.field}>{field}: </span>
      {field.includes("COLOR") ? <ColorValue value={value} /> : <span>{value}</span>}
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
