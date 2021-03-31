import React from "react";
import { Button, FormControl, FormControlLabel, Radio, RadioGroup } from "@material-ui/core";
import { Dialog } from "./common";

const FilterByDialog = ({ open, onClose, handleChangeFilter, filterBy }) => {
  return (
    <Dialog open={open} onClose={onClose} title="Filter characters by">
      <FormControl component="fieldset">
        <RadioGroup name="filterBy" value={filterBy} onChange={handleChangeFilter} style={{ marginTop: 10 }}>
          <FormControlLabel value="name" control={<Radio color="primary" />} label="Character name" />
          <FormControlLabel value="specie" control={<Radio color="primary" />} label="Specie" />
          <FormControlLabel value="planet" control={<Radio color="primary" />} label="Planet" />
          <FormControlLabel value="starship" control={<Radio color="primary" />} label="Starship" />
        </RadioGroup>
      </FormControl>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
        <Button color="primary" style={{ fontWeight: "600" }} onClick={onClose}>
          Confirm
        </Button>
      </div>
    </Dialog>
  );
};

export default FilterByDialog;
