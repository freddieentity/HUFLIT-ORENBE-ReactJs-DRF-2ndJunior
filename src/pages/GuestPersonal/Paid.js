import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { BsFillForwardFill } from "react-icons/bs";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocumentPDF from "./DocumentPDF";
import { patchBooking } from "../../redux/actions/booking";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { connect } from "react-redux";

const baseURL = process.env.REACT_APP_BACKEND_API;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
  },
  content: {
    flex: "1 0 auto",
    width: "50%",
  },
  cover: {
    width: "50%",
  },
  controls: {
    display: "flex",
    alignItems: "center",
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1),
  },
  playIcon: {
    height: 38,
    width: 38,
  },
}));

function Paid({ gb, patchBooking }) {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  return (
    <>
      <h1 style={{ textAlign: "center" }}>Paid Booking List</h1>
      <Card className={classes.root}>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {gb.hotel_id.name}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {gb.room_id.name}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>{gb.checkin}</IconButton>
            <IconButton>
              <BsFillForwardFill className={classes.playIcon} />
            </IconButton>
            <IconButton>{gb.checkout}</IconButton>
          </div>
        </div>
        <div className={classes.details}>
          <CardContent className={classes.content}>
            <Typography component="h5" variant="h5">
              {gb.room_id.base_price_per_night}
            </Typography>
            <Typography variant="subtitle1" color="textSecondary">
              {gb.room_id.guest_quantity}
            </Typography>
          </CardContent>
          <div className={classes.controls}>
            <IconButton>
              <PDFDownloadLink
                document={<DocumentPDF gb={gb} />}
                fileName="movielist.pdf"
              >
                {({ blob, url, loading, error }) => (
                  <a href={url} target="_blank" rel="noreferrer noopener">
                    <Button
                      fullWidth
                      variant="contained"
                      color="secondary"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "E-Invoice"}
                    </Button>
                  </a>
                )}
              </PDFDownloadLink>
            </IconButton>
            <Link to="/contact">
              <IconButton aria-label="play/pause">
                <Button fullWidth variant="contained" color="warning">
                  Contact
                </Button>
              </IconButton>
            </Link>

            <IconButton aria-label="next">
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => setOpen(!open)}
              >
                Cancel
              </Button>
              <Dialog
                open={open}
                onClose={() => setOpen(!open)}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
              >
                <DialogTitle id="alert-dialog-title">
                  {"Are you sure to cancel the booking?"}
                </DialogTitle>
                <DialogContent>
                  <DialogContentText id="alert-dialog-description">
                    <strong>Hotel Cancelation Policy</strong>
                  </DialogContentText>
                  <DialogContentText id="alert-dialog-description">
                    You would rechare 30% if you cancel before 72 hours from the
                    check-in. Within the duration of 72 hours before the checkin
                    or after, if you don't contact, you would loose 100% payment
                    or total deposit with no refund.
                  </DialogContentText>
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setOpen(!open)} color="primary">
                    Disagree
                  </Button>
                  <Button
                    onClick={() => {
                      setOpen(!open);
                      patchBooking(gb.id, { is_cancel: true });
                    }}
                    color="primary"
                    autoFocus
                  >
                    Agree
                  </Button>
                </DialogActions>
              </Dialog>
            </IconButton>
          </div>
        </div>
        <CardMedia
          className={classes.cover}
          image={baseURL + gb.room_id.main_photo}
          title={gb.room_id.name}
        />
      </Card>
    </>
  );
}

export default connect(null, { patchBooking })(Paid);
