import React, { useState, useEffect } from "react";
import { Button, makeStyles } from "@material-ui/core";
import { Loading, Header, CharacterCard, NoResults, ServerError, SearchBar } from "../components/common";
import CharacterDialog from "../components/CharacterDialog";
import FilterByDialog from "../components/FilterByDialog";
import { useDebounce } from "../hooks";
import { httpToHttps } from "../utils/utils";

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  results: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  loadMore: {
    fontWeight: "600",
    margin: "20px 0",
  },
}));

const FILTER_BY_DATA = {
  specie: {
    resource: "species",
    characterField: "people",
  },
  planet: {
    resource: "planets",
    characterField: "residents",
  },
  starship: {
    resource: "starships",
    characterField: "pilots",
  },
};

const Home = () => {
  const styles = useStyles();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [filterByValue, setFilterByValue] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [openCharacterDialog, setOpenCharacterDialog] = useState(false);
  const [openFilterDialog, setOpenFilterDialog] = useState(false);
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const getCharacters = (endpoint = "") => {
    setError(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/people/${endpoint}`)
      .then(res => res.json())
      .then(data => setData(data))
      .catch(err => {
        console.error(err);
        setError(true);
      })
      .finally(() => setLoading(false));
  };

  const getCharactersFrom = (resource, endpoint, characterField) => {
    setError(false);
    setLoading(true);
    fetch(`${process.env.REACT_APP_API_URL}/${resource}/${endpoint}`)
      .then(res => res.json())
      .then(data => {
        const characters = data.results.flatMap(specie => specie[characterField]);
        Promise.all(
          characters.map(item =>
            fetch(httpToHttps(item))
              .then(res => res.json())
              .catch(err => {
                setError(true);
                console.error(err);
              })
          )
        )
          .then(results => setData({ results }))
          .finally(() => setLoading(false));
      })
      .catch(err => {
        setError(true);
        console.error(err);
      });
  };

  const filter = () => {
    if (filterBy === "name") getCharacters(`?search=${filterByValue}`);
    else
      getCharactersFrom(
        FILTER_BY_DATA[filterBy].resource,
        `?search=${filterByValue}`,
        FILTER_BY_DATA[filterBy].characterField
      );
  };

  const searchDebounce = useDebounce(filter, 200);

  useEffect(() => {
    if (filterByValue) searchDebounce();
    else getCharacters();
  }, [filterByValue]);

  const getMore = () => {
    setLoadingMore(true);
    fetch(httpToHttps(data.next))
      .then(res => res.json())
      .then(data => setData(prevData => ({ ...data, results: [...prevData.results, ...data.results] })))
      .catch(err => {
        setError(true);
        console.error(err);
      })
      .finally(() => setLoadingMore(false));
  };

  useEffect(() => {
    if (selectedCharacter) setOpenCharacterDialog(true);
    else setOpenCharacterDialog(false);
  }, [selectedCharacter]);

  const handleChangeFilter = e => setFilterBy(e.target.value);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <h1>List of characters</h1>
        <SearchBar
          filterBy={filterBy}
          filterByValue={filterByValue}
          setFilterByValue={setFilterByValue}
          openFilterDialog={() => setOpenFilterDialog(true)}
        />
        <div className={styles.results}>
          {loading ? (
            <Loading size={60} message="Loading characters..." style={{ margin: "20px 0" }} />
          ) : data?.results.length === 0 ? (
            <NoResults title="No characters found" text="We cannot find the character you are searching for." />
          ) : (
            data?.results.map(character => (
              <CharacterCard
                character={character}
                onClick={() => setSelectedCharacter(character.url)}
                key={character.name}
              />
            ))
          )}
        </div>
        {loadingMore ? (
          <Loading style={{ margin: "20px 0" }} />
        ) : data?.next && !loading ? (
          <Button onClick={getMore} color="primary" className={styles.loadMore}>
            Load more characters
          </Button>
        ) : null}
      </div>
      <CharacterDialog open={openCharacterDialog} onClose={() => setSelectedCharacter(null)} url={selectedCharacter} />
      <FilterByDialog
        open={openFilterDialog}
        onClose={() => setOpenFilterDialog(false)}
        handleChangeFilter={handleChangeFilter}
        filterBy={filterBy}
      />
      {error && <ServerError open={error} onClose={() => setError(false)} />}
    </>
  );
};

export default Home;
