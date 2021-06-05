import React from "react";
import PersonalInformation from "../GuestPersonal/PersonalInformation";
import { connect } from "react-redux";

function PartnerUserInfo({ user }) {
  return (
    <>
      <PersonalInformation user={user} />
    </>
  );
}
const mapStateToProps = (state) => ({
  user: state.auth.user,
});
export default connect(mapStateToProps)(PartnerUserInfo);
