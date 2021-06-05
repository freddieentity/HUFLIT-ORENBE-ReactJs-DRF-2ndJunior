import React, { useState } from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import ContactsIcon from "@material-ui/icons/Contacts";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import NavBar from "../../components/NavBar";
import Dropdown from "../../components/Dropdown";
import { Grid } from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import peak from "../../constants/peak";
import PacmanLoader from "react-spinners/PacmanLoader";
const baseURL = process.env.REACT_APP_BACKEND_API;

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: "flex",
    position: "relative",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function Contact() {
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => {
    setIsOpen(!isOpen);
  };
  const { handleSubmit, control } = useForm();

  const onSubmit = (data) => {
    setLoading(true);
    axios
      .post(`${baseURL}/api/contacts/`, data)
      .then(() => {
        setLoading(false);
        peak(
          "info",
          "Message has been sent. We will reply you as soon as posible!"
        );
      })
      .catch((err) => peak("error", "Message failed to send!"));
  };

  return (
    <>
      <div style={{ paddingBottom: "60px" }}>
        <NavBar toggle={toggle} />
        <Dropdown isOpen={isOpen} toggle={toggle} />
      </div>
      {loading ? (
        <div className="spinner">
          <PacmanLoader color="#8BA0BD" />
        </div>
      ) : (
        <Container component="main" maxWidth="sm">
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <ContactsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Contact
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.form}>
              <Grid container spacing={1}>
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Email Address"
                        autoFocus
                        {...field}
                      />
                    )}
                    name="email"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Name"
                        {...field}
                      />
                    )}
                    name="name"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Subject"
                        {...field}
                      />
                    )}
                    name="subject"
                    control={control}
                  />
                </Grid>
                <Grid item xs={12} sm={12}>
                  <Controller
                    render={({ field }) => (
                      <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        multiline
                        rows={4}
                        label="Message"
                        {...field}
                      />
                    )}
                    name="message"
                    control={control}
                  />
                </Grid>
              </Grid>
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Send Message
              </Button>
            </form>
          </div>
        </Container>
      )}
    </>
  );
}
