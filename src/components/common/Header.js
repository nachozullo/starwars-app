import React from "react";
import { AppBar, IconButton, makeStyles, Toolbar, Tooltip } from "@material-ui/core";
import { Brightness4, Star, GitHub } from "@material-ui/icons";
import { Link } from "react-router-dom";
import { useSmallScreen } from "../../hooks";

const useStyles = makeStyles(theme => ({
  header: {
    zIndex: 900,
    backgroundColor: "#2e2e2e",
    padding: "2px 0",
    [theme.breakpoints.up("sm")]: {
      marginBottom: 20,
    },
  },
  logo: {
    flexGrow: 1,
  },
  link: {
    textDecoration: "none",
    color: theme.palette.primary.main,
    textTransform: "uppercase",
    fontWeight: "600",
    fontSize: 15,
  },
  icon: {
    fontSize: 24,
  },
}));

const Header = ({ onToggleDarkMode }) => {
  const styles = useStyles();
  const [smallScreen] = useSmallScreen();
  return (
    <AppBar className={styles.header} elevation={1} position="static">
      <Toolbar>
        <Link to="/" className={styles.logo}>
          <img
            src="https://logodownload.org/wp-content/uploads/2015/12/star-wars-logo-3-1.png"
            width={smallScreen ? 90 : 100}
            alt="logo"
          />
        </Link>
        <Link to="/my_galactic_league" className={styles.link}>
          {smallScreen ? (
            <IconButton>
              <Star color="primary" className={styles.icon} />
            </IconButton>
          ) : (
            "My Galactic League"
          )}
        </Link>
        {!smallScreen && <div style={{ width: 20 }} />}
        <Tooltip title="Toggle light/dark mode">
          <IconButton onClick={onToggleDarkMode}>
            <Brightness4 color="primary" className={styles.icon} />
          </IconButton>
        </Tooltip>
        <Tooltip title="Github repository">
          <IconButton onClick={() => window.open("https://github.com/nachozullo/starwars-app", "_blank")}>
            <GitHub color="primary" className={styles.icon} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
