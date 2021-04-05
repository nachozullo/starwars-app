import { IconButton, makeStyles, Paper, Tooltip, useMediaQuery, useTheme } from "@material-ui/core";
import React, { useState } from "react";
import { AddCircle, Autorenew, Delete } from "@material-ui/icons";

const useStyles = makeStyles(theme => ({
  cardContainer: {
    padding: 10,
    margin: 10,
    width: 200,
    height: 110,
    color: theme.palette.text.primary,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  cardTitle: {
    margin: 0,
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
    maxHeight: 48,
    overflowY: "hidden",
  },
  iconButton: {
    padding: 2,
  },
}));

const TeamMemberCard = ({ handleDelete, handleUpdate, member, type }) => {
  const styles = useStyles();
  const theme = useTheme();
  const [mouseOver, setMouseOver] = useState(false);
  const smallScreen = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <div onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      <Paper elevation={mouseOver ? 6 : 2} className={styles.cardContainer}>
        <p className={styles.cardTitle}>{member.name}</p>
        {(mouseOver || smallScreen) && (
          <div style={{ marginTop: 5 }}>
            <Tooltip title="Delete" placement="right">
              <IconButton
                aria-label={`delete-${type}`}
                className={styles.iconButton}
                onClick={() => handleDelete(member)}
              >
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

const AddItem = ({ type, handleAdd, disabled }) => {
  const styles = useStyles();
  return (
    <Tooltip title={disabled ? "You must first add an specie" : ""}>
      <Paper elevation={2} className={styles.cardContainer}>
        <IconButton aria-label={type} className={styles.iconButton} onClick={handleAdd} disabled={disabled}>
          <AddCircle style={{ fontSize: 40, color: disabled && "#cbcbcb" }} color="primary" />
        </IconButton>
      </Paper>
    </Tooltip>
  );
};

export { TeamMemberCard, AddItem };
