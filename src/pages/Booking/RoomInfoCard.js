import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Typography from "@material-ui/core/Typography";
import { Rate } from "antd";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  details: {
    display: "flex",
    width: "100%",
    minHeight: "250px",
  },
  content: {
    flex: "1 0 auto",
    width: "100%",
  },
  cover: {
    width: "70%",
  },
}));

export default function RoomInfoCard({ room }) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <div className={classes.details}>
        <CardContent className={classes.content}>
          <Typography component="h5" variant="h5">
            <strong>{room.name}</strong>
          </Typography>
          <Grid container>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                <Rate value={room.rating} disabled />
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Base price per night: ${room.base_price_per_night}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="subtitle1" color="textSecondary">
                Guest per room: {room.guest_quantity}
              </Typography>
              <Typography variant="subtitle1" color="textSecondary">
                Living area: {room.square}(sqft)
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </div>
      <CardMedia
        className={classes.cover}
        image={`${process.env.REACT_APP_BACKEND_API}${room.main_photo}`}
        title="Live from space album cover"
      />
    </Card>
  );
}
