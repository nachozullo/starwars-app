import React from "react";
import { AppBar, makeStyles, Toolbar } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme => ({
  header: {
    zIndex: 900,
    marginBottom: 20,
    backgroundColor: "#2e2e2e",
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: "#DBA90C",
    textTransform: "uppercase",
    fontWeight: "600",
  },
}));

const Header = () => {
  const styles = useStyles();
  return (
    <AppBar className={styles.header} elevation={1} position="static">
      <Toolbar>
        <Link to="/" className={styles.logo}>
          <img
            src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
            width={100}
            alt="logo"
          />
        </Link>
        <Link to="/my_galactic_league" className={styles.link}>
          My Galactic League
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
