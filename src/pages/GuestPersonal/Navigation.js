import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import FavoriteIcon from "@material-ui/icons/Favorite";
import PersonPinIcon from "@material-ui/icons/PersonPin";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import PersonalInformation from "./PersonalInformation";
import GuestBookingItem from "./GuestBookingItem";
import SavedHotelItem from "./SavedHotelItem";
import Invoice from "./Invoice";
import Paid from "./Paid";
import CanceledList from "./CanceledList";
import { GrDocumentMissing } from "react-icons/gr";
import { GiBanknote } from "react-icons/gi";
import { RiHistoryLine } from "react-icons/ri";
import { ImCancelCircle } from "react-icons/im";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-prevent-tabpanel-${index}`}
      aria-labelledby={`scrollable-prevent-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-prevent-tab-${index}`,
    "aria-controls": `scrollable-prevent-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function Navigation({ user, guestBookings, savedHotels }) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ textAlign: "center" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="off"
          aria-label="scrollable prevent tabs example"
        >
          <Tab icon={<PersonPinIcon />} aria-label="person" {...a11yProps(0)} />

          <Tab
            icon={<FavoriteIcon />}
            aria-label="favorite"
            {...a11yProps(1)}
          />
          <Tab
            icon={<GrDocumentMissing fontSize="24px" />}
            aria-label="phone"
            {...a11yProps(2)}
          />
          <Tab
            icon={<GiBanknote fontSize="24px" />}
            aria-label="help"
            {...a11yProps(3)}
          />
          <Tab
            icon={<RiHistoryLine fontSize="24px" />}
            aria-label="shopping"
            {...a11yProps(4)}
          />
          <Tab
            icon={<ImCancelCircle fontSize="24px" />}
            aria-label="cancel"
            {...a11yProps(5)}
          />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        <PersonalInformation user={user} />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <SavedHotelItem savedHotels={savedHotels} />
      </TabPanel>
      <TabPanel value={value} index={2}>
        {guestBookings &&
          guestBookings.map(
            (gb) => !gb.is_paid && !gb.is_cancel && <GuestBookingItem gb={gb} />
          )}
      </TabPanel>
      <TabPanel value={value} index={3}>
        {guestBookings &&
          guestBookings.map(
            (gb) =>
              gb.is_paid &&
              !gb.is_cancel &&
              Date.parse(gb.checkout) > Date.now() && <Paid gb={gb} />
          )}
      </TabPanel>
      <TabPanel value={value} index={4}>
        {guestBookings &&
          guestBookings.map(
            (gb) =>
              gb.is_paid &&
              Date.parse(gb.checkout) < Date.now() && <Invoice gb={gb} />
          )}
      </TabPanel>
      <TabPanel value={value} index={5}>
        {guestBookings &&
          guestBookings.map(
            (gb) =>
              gb.is_cancel &&
              Date.parse(gb.checkout) > Date.now() && <CanceledList gb={gb} />
          )}
      </TabPanel>
    </div>
  );
}
