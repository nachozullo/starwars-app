import React from "react";
import { AppBar, IconButton, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import { Brightness4 } from "@material-ui/icons";
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
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    fontWeight: "600",
  },
}));

const Header = ({ onToggleDarkMode }) => {
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
        <div style={{ width: 20 }} />
        <Tooltip title="Toggle light/dark mode">
          <IconButton onClick={onToggleDarkMode}>
            <Brightness4 color="primary" />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
