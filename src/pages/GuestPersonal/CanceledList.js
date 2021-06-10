import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ForwardIcon from "@material-ui/icons/Forward";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocumentPDF from "./DocumentPDF";

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

function GuestBookingItem({ gb }) {
  const classes = useStyles();
  return (
    <>
      {!gb ? (
        <div style={{ textAlign: "center" }}>Nothing to show</div>
      ) : (
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
                <ForwardIcon className={classes.playIcon} />
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
                        {loading ? "Loading..." : "E-Cancelation Invoice"}
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
            </div>
          </div>
          <CardMedia
            className={classes.cover}
            image={baseURL + gb.room_id.main_photo}
            title={gb.room_id.name}
          />
        </Card>
      )}
    </>
  );
}

export default GuestBookingItem;
