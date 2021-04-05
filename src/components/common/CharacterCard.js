import React, { useState } from "react";
import { makeStyles, Paper, useTheme } from "@material-ui/core";
import { Attribute } from "./Attribute";
import { Skeleton } from "@material-ui/lab";

const useStyles = makeStyles(theme => ({
  container: {
    padding: "10px 20px",
    margin: 10,
    width: 300,
    cursor: "pointer",
    color: theme.palette.text.primary,
  },
  title: {
    margin: "5px 0",
    fontSize: 20,
    fontWeight: "600",
  },
}));

const CharacterLoadingCard = ({ amount = 1 }) => {
  return [...Array(amount)].map((value, i) => (
    <Skeleton style={{ margin: 10, borderRadius: 4 }} key={i} variant="rect" height={193} width={300} />
  ));
};

const CharacterCard = ({ character, onClick }) => {
  const [mouseOver, setMouseOver] = useState(false);
  const styles = useStyles();

  return (
    <div onMouseOver={() => setMouseOver(true)} onMouseLeave={() => setMouseOver(false)}>
      <Paper elevation={mouseOver ? 6 : 2} className={styles.container} onClick={onClick}>
        <p className={styles.title}>{character.name}</p>
        <Attribute field="BIRTH YEAR" value={character.birth_year} />
        <Attribute field="HEIGHT" value={`${character.height}${character.height !== "unknown" ? "m" : ""}`} />
        <Attribute field="MASS" value={`${character.mass}${character.mass !== "unknown" ? "kg" : ""}`} />
      </Paper>
    </div>
  );
};

export { CharacterLoadingCard, CharacterCard };
