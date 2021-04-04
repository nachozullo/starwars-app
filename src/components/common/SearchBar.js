import React from "react";
import { IconButton, InputBase, makeStyles, Paper } from "@material-ui/core";
import { Close, Search } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    alignItems: "center",
    width: "65%",
    padding: 10,
    justifyContent: "space-between",
    minWidth: 300,
    marginBottom: 20,
  },
  inputContainer: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 5,
    flex: 1,
  },
  searchIcon: {
    color: theme.palette.text.secondary,
    paddingBottom: 2,
  },
  input: {
    paddingLeft: 10,
    width: "100%",
  },
  filterBy: {
    color: theme.palette.primary.main,
    fontWeight: "600",
    cursor: "pointer",
    marginRight: 10,
  },
}));

const SearchBar = ({ filterBy, filterByValue, setFilterByValue, openFilterDialog }) => {
  const styles = useStyles();
  return (
    <Paper className={styles.container}>
      <div className={styles.inputContainer}>
        <Search className={styles.searchIcon} />
        <InputBase
          placeholder={`Search character by ${filterBy}...`}
          inputProps={{ "aria-label": "search" }}
          className={styles.input}
          value={filterByValue}
          onChange={e => setFilterByValue(e.target.value)}
        />
      </div>
      {filterByValue !== "" && (
        <IconButton size="small" onClick={() => setFilterByValue("")} style={{ marginRight: 10 }}>
          <Close style={{ fontSize: 18 }} />
        </IconButton>
      )}
      <span className={styles.filterBy} onClick={openFilterDialog}>
        FILTER BY
      </span>
    </Paper>
  );
};

export default SearchBar;
