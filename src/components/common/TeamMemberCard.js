import { IconButton, makeStyles, Paper, Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { AddCircle, Autorenew, Delete } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    padding: "10px 20px",
    margin: 10,
    width: 150,
    height: 150,
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
  iconButton: {
    padding: 2,
  },
}));

const TeamMemberCard = ({ handleDelete, handleUpdate, member }) => {
  const styles = useStyles();
  const theme = useTheme();
  const [mouseOver, setMouseOver] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      <Paper elevation={mouseOver ? 6 : 2} className={styles.cardContainer}>
        <p className={styles.cardTitle}>{member.name}</p>
        {(mouseOver || smallScreen) && (
          <div>
            <Tooltip title="Delete" placement="right">
              <IconButton className={styles.iconButton} onClick={() => handleDelete(member)}>
                <Delete className={styles.button} />
              </IconButton>
            </Tooltip>
            <Tooltip title="Change" placement="right">
              <IconButton className={styles.iconButton} onClick={handleUpdate}>
                <Autorenew className={styles.button} />
              </IconButton>
            </Tooltip>
          </div>
        )}
      </Paper>
    </div>
  );
};

const AddItem = ({ handleAdd, disabled }) => {
  const styles = useStyles();
  return (
    <Tooltip title={disabled ? "You must first add an specie" : ""}>
      <Paper elevation={2} className={styles.cardContainer}>
        <IconButton className={styles.iconButton} onClick={handleAdd} disabled={disabled}>
          <AddCircle style={{ fontSize: 40, color: disabled && "#cbcbcb" }} color="primary" />
        </IconButton>
      </Paper>
    </Tooltip>
  );
};

export { TeamMemberCard, AddItem };
