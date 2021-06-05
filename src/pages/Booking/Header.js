import React from "react";
import { AppBar, Toolbar, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  topAppBar: {
    height: "10vh",
    minHeight: "190px",
  },
  toolbar: {
    alignItems: "flex-start",
    justifyContent: "space-between",
    paddingTop: theme.spacing(2),
    paddingBottom: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    verticalAlign: "middle",
    display: "inline-flex",
    marginLeft: "50%",
  },
}));

const AppBars = () => {
  const classes = useStyles();

  return (
    <AppBar
      position="static"
      elevation={0}
      color="default"
      className={classes.topAppBar}
    >
      <Toolbar className={classes.toolbar}>
        <Grid container item direction="row" alignItems="center" xs={12} sm={6}>
          <Grid item>
            <Link to="/">
              <img
                src={`https://www.theritzlondon.com/wp-content/themes/Ritz/img/logo.svg`}
                alt="logo"
                height="60px"
              />
            </Link>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppBars;
