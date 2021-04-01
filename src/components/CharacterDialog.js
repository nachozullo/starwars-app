import React, { useEffect } from "react";
import { CircularProgress, makeStyles } from "@material-ui/core";
import { useGetAll, useGetAPI } from "../hooks";
import { Loading, Dialog, Attribute, ServerError } from "./common";

const useStyles = makeStyles(theme => ({
  field: {
    color: "grey",
    fontWeight: "600",
  },
  fieldContainer: {
    margin: "20px 0",
  },
}));

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

const CharacterDialog = ({ url, open, onClose }) => {
  const { loading, data, error, setError, get } = useGetAPI(url, false);

  useEffect(() => {
    if (open && url) get();
  }, [open, url, get]);

  return (
    <>
      <Dialog
        onClose={onClose}
        open={open}
        title={data?.name}
        titleStyle={{ paddingBottom: 16, border: "1px solid #e3e3e3" }}
      >
        {loading ? (
          <Loading size={60} message="Loading character..." style={{ margin: "20px 0" }} />
        ) : (
          <div>
            <Attribute field="BIRTH YEAR" value={data?.birth_year} />
            <Attribute field="HEIGHT" value={`${data?.height}${data?.height !== "unknown" ? "m" : ""}`} />
            <Attribute field="MASS" value={`${data?.mass}${data?.mass !== "unknown" ? "kg" : ""}`} />
            <Attribute field="GENDER" value={data?.gender} />
            <Attribute field="EYE COLOR" value={data?.eye_color} />
            <Attribute field="HAIR COLOR" value={data?.hair_color} />
            <Attribute field="SKIN COLOR" value={data?.skin_color} />
            <ArrayData arrayName="vehicles" field="name" data={data} />
            <ArrayData arrayName="films" field="title" data={data} />
            <ArrayData arrayName="species" field="name" data={data} />
            <ArrayData arrayName="starships" field="name" data={data} />
          </div>
        )}
      </Dialog>
      {error && <ServerError open={error} onClose={() => setError(false)} />}
    </>
  );
};

export default CharacterDialog;
