import React, { useEffect, useState } from "react";
import { Container, Paper, Box } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Steppers from "./Steppers";
import RoomInfo from "./RoomInfo";
import AdditionalInfo from "./AdditionalInfo";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const useStyles = makeStyles((theme) => ({
  boxWrapper: {
    marginBottom: "55px",
    minHeight: "calc(26vh + 260px)",
    // backgroundColor: "#619196",
  },
  container: {
    position: "relative",
    zIndex: "1100",
    marginTop: "-95px",
    marginBottom: "45px",
  },
}));
function publishableKeyGet() {
  return "asdasd";
}
const Main = () => {
  const classes = useStyles();

  const [stripePromise, setStripePromise] = useState(null);

  useEffect(() => {
    const retrievePublishableKey = async () => {
      const publishableKey = await publishableKeyGet();
      const stripe = loadStripe(publishableKey);
      setStripePromise(stripe);
    };
    retrievePublishableKey();
  }, []);

  return (
    <Box component="main" className={classes.boxWrapper}>
      <Container maxWidth="md" className={classes.container}>
        <Paper elevation={5}>
          <RoomInfo />
          <AdditionalInfo />
          {stripePromise ? (
            <Elements stripe={stripePromise}>
              <Steppers />
            </Elements>
          ) : null}
        </Paper>
      </Container>
    </Box>
  );
};

export default Main;
