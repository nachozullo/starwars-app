import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { ErrorToast, Autocomplete, Dialog, Header, TeamMemberCard, AddItem } from "../../components/common";
import { toCamelCase } from "../../utils/utils";
import { useLocalStorage } from "../../hooks";

const ENDPOINTS = {
  species: "/species",
  characters: "/people",
  planets: "/planets",
  starships: "/starships",
};

const useStyles = makeStyles(theme => ({
  button: {
    fontSize: 26,
  },
  flexWrap: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  teamContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 20,
  },
  teamMembersTitle: {
    fontWeight: "600",
    fontSize: 20,
    color: theme.palette.text.primary,
  },
}));

const TeamMembers = ({ type, members, handleDelete, handleAdd, disabled }) => {
  const styles = useStyles();
  return (
    <>
      <p className={styles.teamMembersTitle}>{toCamelCase(type)}</p>
      <div className={styles.flexWrap}>
        {members.map((member, index) =>
          member ? (
            <TeamMemberCard
              key={index}
              handleDelete={handleDelete(type)}
              handleUpdate={handleAdd(type, index)}
              member={member}
            />
          ) : (
            <AddItem key={index} handleAdd={handleAdd(type, index)} disabled={disabled} />
          )
        )}
      </div>
    </>
  );
};

const GalacticLeague = () => {
  const styles = useStyles();

  const [openDialog, setOpenDialog] = useState(false);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [invalidTeam, setInvalidTeam] = useState(false);

  const [galacticTeam, setGalacticTeam] = useLocalStorage("galacticTeam", {
    species: Array(3).fill(""),
    characters: Array(6).fill(""),
    planets: Array(2).fill(""),
    starships: Array(3).fill(""),
  });

  const handleOpenDialog = (type, index) => () => {
    setOpenDialog(true);
    setSelectedType(type);
    setSelectedIndex(index);
  };

  const { species, characters, planets, starships } = galacticTeam;

  const invalidCharactersSpecies = (newCharactersState = characters) => {
    return species.some(specie => !newCharactersState.flatMap(char => char.species).includes(specie.url));
  };

  const handleDeleteMember = type => deletedItem => {
    if (selectedType === "characters") {
      const newCharactersState = characters.filter(character => character.name !== deletedItem.name);
      if (invalidCharactersSpecies(newCharactersState)) {
        setInvalidTeam("Invalid. At least one character of each specie should be selected.");
        return;
      }
    }
    setGalacticTeam(prevTeam => ({
      ...prevTeam,
      [type]: prevTeam[type].map(item => (item.name === deletedItem.name ? "" : item)),
    }));
  };

  const handleAddMember = newItem => {
    if (selectedType === "characters") {
      if (!newItem.species.find(charSpecie => galacticTeam.species.map(specie => specie.url).includes(charSpecie))) {
        setInvalidTeam("Invalid. You can add only characters from selected species.");
        return;
      }
      const emptyCharacters = characters.filter(c => !c).length;
      if (emptyCharacters <= 2 && invalidCharactersSpecies()) {
        setInvalidTeam("Invalid. At least one character of each specie should be selected.");
        return;
      }
    }
    setGalacticTeam(prevTeam => ({
      ...prevTeam,
      [selectedType]: prevTeam[selectedType].map((item, idx) => (idx === selectedIndex ? newItem : item)),
    }));
    setOpenDialog(false);
    setSelectedType(null);
    setSelectedIndex(null);
  };

  return (
    <>
      <Header />
      <div className={styles.teamContainer}>
        <h1>My Galactic League</h1>
        <TeamMembers type="species" handleDelete={handleDeleteMember} members={species} handleAdd={handleOpenDialog} />
        <TeamMembers
          type="characters"
          handleDelete={handleDeleteMember}
          members={characters}
          handleAdd={handleOpenDialog}
          disabled={!species.some(specie => specie)}
        />
        <TeamMembers type="planets" handleDelete={handleDeleteMember} members={planets} handleAdd={handleOpenDialog} />
        <TeamMembers
          type="starships"
          handleDelete={handleDeleteMember}
          members={starships}
          handleAdd={handleOpenDialog}
        />
      </div>
      {selectedType && (
        <Dialog open={openDialog} onClose={() => setOpenDialog(false)} title="Add member">
          <div style={{ minHeight: "30vh" }}>
            <Autocomplete
              path={`${ENDPOINTS[selectedType]}/?search=`}
              field="name"
              label={toCamelCase(selectedType)}
              handleSelect={value => handleAddMember(value)}
              alreadySelectedItems={galacticTeam[selectedType]}
            />
          </div>
        </Dialog>
      )}
      <ErrorToast open={!!invalidTeam} onClose={() => setInvalidTeam(false)} text={invalidTeam} />
    </>
  );
};

export default GalacticLeague;
