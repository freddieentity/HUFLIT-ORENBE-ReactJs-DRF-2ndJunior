import React from "react";
import { AppBar, Toolbar, Typography, Grid } from "@material-ui/core";
import { Security, Info } from "@material-ui/icons";

const Footer = () => (
  <>
    <Grid container justify="center" style={{ minHeight: "212px" }}>
      <Grid container item sm={6} xs={11} justify="space-between">
        <Grid item sm={5} xs={12}>
          <Security color="action" />
          <Typography paragraph>
            The payment made on this site are sent through a secured connection
            and processed by Stripe. This site is compliant with the Payment
            Card Industry and Data Security Standard. Read more about Stripe
            security{" "}
          </Typography>
        </Grid>
        <Grid item sm={5} xs={11}>
          <Info color="action" />
          <Typography paragraph>
            During the payment process, you should always check all information
            you type in so that it could be processed properly. Be aware of any
            fake websites that are pretending to be legal.
          </Typography>
        </Grid>
      </Grid>
    </Grid>
    <AppBar position="static" elevation={0} component="footer" color="default">
      <Toolbar style={{ justifyContent: "center" }}>
        <Typography variant="caption">© ORENBE</Typography>
      </Toolbar>
    </AppBar>
  </>
);

export default Footer;
