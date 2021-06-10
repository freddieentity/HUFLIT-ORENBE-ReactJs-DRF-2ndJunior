import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import ForwardIcon from "@material-ui/icons/Forward";
import { Button, TextField, Grid } from "@material-ui/core";
import { Modal } from "antd";
import { useForm, Controller } from "react-hook-form";
import { StarBorder, Star } from "@material-ui/icons";
import { connect } from "react-redux";
import { postComment } from "../../redux/actions/comment";
import { toast } from "react-toastify";
import { PDFDownloadLink } from "@react-pdf/renderer";
import DocumentPDF from "./DocumentPDF";

const baseURL = process.env.REACT_APP_BACKEND_API;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    margin: "1% 1% 1% 1%",
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

function Invoice({ gb, postComment }) {
  const classes = useStyles();
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const showModal = () => {
    setVisible(true);
  };
  const { control, handleSubmit } = useForm();

  const handleOk = (data) => {
    const fullData = { ...data, booking_id: gb.id };
    if (Date.parse(gb.checkout) < Date.now()) {
      setConfirmLoading(true);
      setTimeout(() => {
        setVisible(false);
        setConfirmLoading(false);
      }, 1000);
      postComment(fullData);
    } else
      toast.error(
        "Unable to comment when you haven't finished staying at that hotel yet!"
      );
  };
  return (
    <>
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
            <IconButton aria-label="next">
              <Button
                fullWidth
                variant="contained"
                color="secondary"
                type="submit"
                onClick={showModal}
              >
                Feedback
              </Button>
              <Modal
                title="What is your thoughts?"
                visible={visible}
                onOk={handleSubmit(handleOk)}
                confirmLoading={confirmLoading}
                onCancel={() => setVisible(false)}
              >
                <Grid item xs={12} sm={12}>
                  <Controller
                    control={control}
                    name="content"
                    render={({ field }) => (
                      <TextField
                        id="content"
                        label="Comment"
                        variant="outlined"
                        placeholder="Tell us your experience when staying in our hotel..."
                        fullWidth
                        multiline
                        rows={4}
                        margin="normal"
                        {...field}
                      />
                    )}
                  />
                  <Controller
                    control={control}
                    name="rate"
                    render={({ field }) => <StarField {...field} />}
                  />
                </Grid>
              </Modal>
            </IconButton>
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
                      color="warning"
                      disabled={loading}
                    >
                      {loading ? "Loading..." : "E-Invoice"}
                    </Button>
                  </a>
                )}
              </PDFDownloadLink>
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

const StarField = ({ value, onChange }) => (
  <>
    <StarButton active={value >= 1} onClick={() => onChange(1)} />
    <StarButton active={value >= 2} onClick={() => onChange(2)} />
    <StarButton active={value >= 3} onClick={() => onChange(3)} />
    <StarButton active={value >= 4} onClick={() => onChange(4)} />
    <StarButton active={value >= 5} onClick={() => onChange(5)} />
    <StarButton active={value >= 6} onClick={() => onChange(6)} />
    <StarButton active={value >= 7} onClick={() => onChange(7)} />
    <StarButton active={value >= 8} onClick={() => onChange(8)} />
    <StarButton active={value >= 9} onClick={() => onChange(9)} />
    <StarButton active={value >= 10} onClick={() => onChange(10)} />
  </>
);

const StarButton = ({ active, onClick }) => (
  <button type="button" className="starButton" onClick={onClick}>
    {active ? <Star color="primary" /> : <StarBorder />}
  </button>
);
const mapStateToProps = (state) => ({
  userComments: state.comment.userComments,
});
export default connect(mapStateToProps, { postComment })(Invoice);
