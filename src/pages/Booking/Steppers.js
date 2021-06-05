import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  Box,
  Grid,
  TextField,
  Typography,
  CircularProgress,
  InputAdornment,
  Checkbox,
  Select,
  MenuItem,
  InputLabel,
} from "@material-ui/core";
import StepperIcons from "./StepperIcons";
import StepConnector from "./StepConnector";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { addDays } from "date-fns";
import {
  FormProvider,
  useForm,
  Controller,
  useFormContext,
} from "react-hook-form";
import {
  CardCvcElement,
  CardNumberElement,
  CardExpiryElement,
} from "@stripe/react-stripe-js";
import { connect } from "react-redux";
import { postBooking } from "../../redux/actions/booking";
import StripeInput from "../../components/StripeInput";
import peak from "../../constants/peak";

const style = makeStyles((theme) => ({
  button: {
    marginRight: theme.spacing(1),
  },
  mainBox: {
    position: "relative",
    marginTop: "-8px",
    padding: "10px 20px",
    borderBottomRightRadius: "4px",
    borderBottomLeftRadius: "4px",
    background: theme.palette.background.default,
  },
  stepper: {
    height: "calc(10vh - 40px)",
    minHeight: "55px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    width: "100%",
  },
}));
function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}
const duration = () => {
  const date1 = new Date(sessionStorage.getItem("checkin"));
  const date2 = new Date(sessionStorage.getItem("checkout"));
  const diffTime = Math.abs(date2 - date1);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays;
};
const totalSteps = 3;
const ContactForm = () => {
  const { control } = useFormContext();
  return (
    <>
      <Grid item xs={12} sm={12}>
        <Controller
          control={control}
          name="guest_name"
          render={({ field }) => (
            <TextField
              id="guest_name"
              label="Contact's Name"
              variant="outlined"
              placeholder="Enter Your Contact's Name"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name="guest_phone"
          render={({ field }) => (
            <TextField
              id="guest_phone"
              label="Reachable mobile number"
              variant="outlined"
              placeholder="Enter Your Reachable mobile number"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </Grid>
      <Grid item xs={12} sm={6}>
        <Controller
          control={control}
          name="guest_email"
          render={({ field }) => (
            <TextField
              id="guest_email"
              label="Contact's email address"
              variant="outlined"
              placeholder="Enter Your Contact's email address"
              fullWidth
              margin="normal"
              {...field}
            />
          )}
        />
      </Grid>
    </>
  );
};
const PaymentForm = ({ singleRoom }) => {
  // const { control } = useFormContext();
  const [onlinePayment, setOnlinePayment] = useState(false);
  const cardsLogo = [
    "amex",
    "cirrus",
    "diners",
    "dankort",
    "discover",
    "jcb",
    "maestro",
    "mastercard",
    "visa",
    "visaelectron",
  ];
  onlinePayment
    ? sessionStorage.setItem(
        "payment",
        singleRoom.base_price_per_night * duration()
      )
    : sessionStorage.setItem(
        "payment",
        (singleRoom.base_price_per_night * duration() * 30) / 100
      );

  onlinePayment
    ? sessionStorage.setItem("is_paid", true)
    : sessionStorage.removeItem("is_paid");
  return (
    <>
      <Grid container item xs={12}>
        <Grid item xs={12} sm={3}>
          <Typography variant="h6">Payment Partnerships</Typography>
        </Grid>
        <Grid container item xs={12} sm={9} justify="space-between">
          {cardsLogo.map((e) => (
            <img
              key={e}
              src={`../cards/${e}.png`}
              alt={e}
              width="50px"
              align="bottom"
              style={{ padding: "0 5px" }}
            />
          ))}
        </Grid>
      </Grid>
      <Grid item xs={12} sm={4}>
        <TextField
          label="Credit Card Number"
          name="ccnumber"
          variant="outlined"
          required
          fullWidth
          InputProps={{
            inputComponent: StripeInput,
            inputProps: {
              component: CardNumberElement,
            },
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          label="Expiration Date"
          name="ccexp"
          variant="outlined"
          required
          fullWidth
          InputProps={{
            inputProps: {
              component: CardExpiryElement,
            },
            inputComponent: StripeInput,
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          label="CVC"
          name="cvc"
          variant="outlined"
          required
          fullWidth
          InputProps={{
            inputProps: {
              component: CardCvcElement,
            },
            inputComponent: StripeInput,
          }}
          InputLabelProps={{ shrink: true }}
        />
      </Grid>
      <Grid
        item
        xs={6}
        sm={3}
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          verticalAlign: "center",
          justifyContent: "center",
        }}
      >
        <Checkbox
          checked={onlinePayment}
          onChange={() => setOnlinePayment(!onlinePayment)}
        />
        <p style={{ textAlign: "center" }}>
          {onlinePayment ? "Online payment" : "Pay upon check in"}
        </p>
      </Grid>
      <Grid item xs={6} sm={3}>
        <TextField
          name="payment"
          label={onlinePayment ? "Total Amount" : "Deposit"}
          variant="filled"
          fullWidth
          value={
            onlinePayment
              ? singleRoom.base_price_per_night * duration()
              : (singleRoom.base_price_per_night * duration() * 30) / 100
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
          margin="normal"
          disabled
        />
      </Grid>
    </>
  );
};
const ReviewForm = ({ singleRoom, roomBookings }) => {
  const { control } = useFormContext();

  let dateArray = [];
  function getDates(startDate, stopDate) {
    var currentDate = Date.parse(startDate);
    while (currentDate <= Date.parse(stopDate)) {
      dateArray.push(formatDate(currentDate));
      currentDate = addDays(currentDate, 1);
    }
  }

  roomBookings.forEach((rb) => getDates(rb.checkin, rb.checkout));

  const renderDateFunction = (renderDate) => {
    if (dateArray?.includes(formatDate(renderDate))) {
      return true;
    } else {
      return false;
    }
  };

  const validateDateSelected = (date) => {
    let checkDates = [];
    var currentDate = Date.parse(sessionStorage.getItem("checkin"));
    if (currentDate >= Date.parse(date)) {
      peak("error", "Checkout day can't be before or the same as checkin day");
    } else {
      while (currentDate <= Date.parse(date)) {
        checkDates.push(formatDate(currentDate));
        currentDate = addDays(currentDate, 1);
      }
      const found = checkDates.some((r) => dateArray.includes(r));
      if (found) {
        peak(
          "error",
          "Looks like you choose the wrong day range. Choose the range that is available from start to end!"
        );
      } else {
        sessionStorage.setItem("checkout", date);
      }
    }
  };
  return (
    <>
      <Grid item xs={12}>
        <Typography variant="h6" style={{ textAlign: "center" }}>
          Review Booking Details
        </Typography>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Controller
            name="checkin"
            control={control}
            defaultValue={sessionStorage.getItem("checkin")}
            render={({ field: { ref, ...rest } }) => (
              <KeyboardDatePicker
                autoOk={true}
                margin="normal"
                id="date-picker-dialog"
                label="Check-in"
                initialFocusedDate={sessionStorage.getItem("checkin")}
                format="yyyy-MM-dd"
                fullWidth
                onAccept={sessionStorage.setItem(
                  "checkin",
                  formatDate(rest.value)
                )}
                shouldDisableDate={renderDateFunction}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                {...rest}
              />
            )}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={6}>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Controller
            name="checkout"
            control={control}
            defaultValue={sessionStorage.getItem("checkout")}
            render={({ field: { ref, ...rest } }) => (
              <KeyboardDatePicker
                autoOk={true}
                margin="normal"
                id="date-picker-dialog"
                label="Check-out"
                format="yyyy-MM-dd"
                shouldDisableDate={renderDateFunction}
                initialFocusedDate={sessionStorage.getItem("checkout")}
                onAccept={validateDateSelected(formatDate(rest.value))}
                fullWidth
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
                {...rest}
              />
            )}
          />
        </MuiPickersUtilsProvider>
      </Grid>
      <Grid item xs={12} sm={12}>
        <Controller
          render={({ field }) => (
            <>
              <InputLabel htmlFor="guest">Number of Guest(s)</InputLabel>
              <Select
                {...field}
                if="number_of_guest"
                fullWidth
                style={{ width: "25%" }}
                required
              >
                {[...Array(singleRoom.guest_quantity)].map((ele, index) => (
                  <MenuItem value={index + 1}>{index + 1}</MenuItem>
                ))}
              </Select>
            </>
          )}
          name="number_of_guest"
          control={control}
        />
      </Grid>
    </>
  );
};

const StepContent = ({ step, singleRoom, roomBookings }) => {
  switch (step) {
    case 0:
      return <ContactForm />;
    case 1:
      return <ReviewForm singleRoom={singleRoom} roomBookings={roomBookings} />;
    case 2:
      return <PaymentForm singleRoom={singleRoom} />;
    default:
      return <></>;
  }
};

const Steppers = ({ postBooking, singleRoom, hotelRoom, roomBookings }) => {
  const classes = style();
  const [loading, setLoading] = useState(false);
  const methods = useForm();
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = (data) => {
    console.log(data);

    if (activeStep === totalSteps - 1) {
      setLoading(true);
      const fullData = {
        ...data,
        hotel_id: hotelRoom.id,
        room_id: singleRoom.id,
        checkin: formatDate(data.checkin),
        checkout: formatDate(data.checkout),
        is_paid:
          sessionStorage.getItem("is_paid") &&
          sessionStorage.getItem("is_paid"),
        payment: sessionStorage.getItem("payment"),
      };
      if (sessionStorage.getItem("email"))
        fullData.user = sessionStorage.getItem("email");
      new Promise((resolve) =>
        setTimeout(() => {
          setLoading(false);
          resolve(setActiveStep(activeStep + 1));
          resolve(postBooking(fullData));
        }, 5000)
      );
    } else setActiveStep(activeStep + 1);
  };
  const handleBack = () =>
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  const handleReset = () => setActiveStep(0);

  return (
    <>
      <Stepper
        alternativeLabel
        className={classes.stepper}
        connector={<StepConnector />}
        activeStep={activeStep}
      >
        {/* Change the number of loops here based on StepContent */}
        {[1, 2, 3].map((e) => (
          <Step key={e}>
            <StepLabel StepIconComponent={StepperIcons} />
          </Step>
        ))}
      </Stepper>
      <Box className={classes.mainBox}>
        <Grid
          container
          spacing={3}
          direction="column"
          justify="space-around"
          alignItems="center"
          style={{ height: "400px" }}
        >
          {activeStep === totalSteps && !loading ? (
            <div>
              <img alt="thankyou" src={`../cards/thankyou.png`} />
              <Button onClick={handleReset} className={classes.button}>
                Re-Book?
              </Button>
            </div>
          ) : (
            <FormProvider {...methods}>
              <form
                className={classes.form}
                onSubmit={methods.handleSubmit(handleNext)}
              >
                <Grid container spacing={3}>
                  <StepContent
                    step={activeStep}
                    singleRoom={singleRoom}
                    roomBookings={roomBookings}
                  />
                  <Grid container item justify="flex-end">
                    <Button
                      disabled={activeStep === 0}
                      className={classes.button}
                      onClick={handleBack}
                    >
                      Back
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      className={classes.button}
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? (
                        <CircularProgress size={24} />
                      ) : activeStep === 2 ? (
                        "Pay"
                      ) : (
                        "Next"
                      )}
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </FormProvider>
          )}
        </Grid>
      </Box>
    </>
  );
};

const mapStateToProps = (state) => ({
  hotelRoom: state.hotel.hotelRoom,
  singleRoom: state.room.singleRoom,
  roomBookings: state.booking.roomBookings,
});

export default connect(mapStateToProps, { postBooking })(Steppers);
