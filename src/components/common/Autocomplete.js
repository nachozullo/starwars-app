import React, { useState, useCallback } from "react";
import { Button, TextField } from "@material-ui/core";
import { Autocomplete } from "@material-ui/lab";
import { useDebounce } from "../../hooks";

const ApiAutocomplete = ({ label, field, path, handleSelect, disabled = false, style = {}, alreadySelectedItems }) => {
  const [options, setOptions] = useState([]);
  const [optionsLabels, setOptionsLabels] = useState([]);
  const [selected, setSelected] = useState(null);
  const [currentValue, setCurrentValue] = useState("");
  const [loading, setLoading] = useState(false);

  const fillAutocomplete = useCallback(
    newValue => {
      const regex = new RegExp(" ");
      const nameParam = newValue.replace(regex, "%20");
      setLoading(true);
      fetch(`${process.env.REACT_APP_API_URL}${path}${nameParam}`)
        .then(res => res.json())
        .then(parsed => {
          const filtered = parsed.results.filter(
            item => !alreadySelectedItems.map(selected => selected[field]).includes(item[field])
          );
          setOptions(filtered);
          setOptionsLabels(filtered.map(option => option[field]));
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    },
    [field, alreadySelectedItems, path]
  );

  const handleInputChange = (event, newValue) => {
    setCurrentValue(newValue);
    setLoading(true);
    setOptions([]);
    setOptions([]);
    fillAutocomplete(newValue);
  };

  const onInputChange = useDebounce(handleInputChange, 400);

  const handleSelectOption = newValue => setSelected(options.filter(option => option[field] === newValue)[0]);

  return (
    <div>
      <Autocomplete
        options={optionsLabels}
        autoHighlight
        disabled={disabled}
        value={currentValue || null}
        onInputChange={onInputChange}
        onChange={(event, newValue) => handleSelectOption(newValue)}
        loading={loading}
        loadingText="Loading..."
        style={{ ...style, flex: 1 }}
        renderInput={params => <TextField {...params} autoFocus label={label} margin="normal" />}
      />
      {selected && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: 30 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSelect(selected)}
            style={{ fontWeight: "600" }}
          >
            Add to my Galactic Team
          </Button>
        </div>
      )}
    </div>
  );
};

export default ApiAutocomplete;
