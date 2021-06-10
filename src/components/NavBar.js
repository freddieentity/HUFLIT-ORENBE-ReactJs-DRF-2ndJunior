import React, { useEffect } from "react";
import styled, { css } from "styled-components/macro";
import { menuData } from "../data/menuData";
import { Link } from "react-router-dom";
import DehazeIcon from "@material-ui/icons/Dehaze";
import { connect } from "react-redux";
import { logout, checkAuthenticated, load_user } from "../redux/actions/auth";
import PropTypes from "prop-types";

const Nav = styled.nav`
  height: 60px;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  z-index: 100;
  position: fixed;
  width: 100%;
`;

const NavLink = css`
  color: #fff;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;
  text-decoration: none;
`;
const Logo = styled(Link)`
  ${NavLink}
  font-style: italic;
`;
const MenuBars = styled.div`
  display: none;

  @media screen and (max-width: 768px) {
    display: block;
  }
`;
const NavMenu = styled.div`
  display: flex;
  align-items: center;
  margin-right: -48px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const NavMenuLinks = styled(Link)`
  ${NavLink}
`;
const NavBtn = styled.div`
  display: flex;
  align-items: center;
  margin-right: 24px;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;

function NavBar({
  auth: { isAuthenticated, loading, user },
  logout,
  toggle,
  load_user,
  checkAuthenticated,
}) {
  useEffect(() => {
    checkAuthenticated();
    load_user();
  }, [checkAuthenticated, load_user]);
  return (
    <div style={{ position: "relative" }}>
      <Nav style={{ backgroundColor: "black" }}>
        <Logo to="/">
          <img
            src={`https://www.theritzlondon.com/wp-content/themes/Ritz/img/logo.svg`}
            alt="logo"
            height="50px"
          />
        </Logo>
        <MenuBars onClick={toggle}>
          <DehazeIcon />
        </MenuBars>
        <NavMenu>
          {menuData.map((item, index) => (
            <NavMenuLinks to={item.link} key={index}>
              {item.title}
            </NavMenuLinks>
          ))}
        </NavMenu>
        <NavBtn>
          {!loading && isAuthenticated ? (
            <>
              <MenuBars onClick={toggle} />
              <NavMenu>
                <NavMenuLinks
                  to={`/personal/${sessionStorage.getItem("email")}`}
                  key={user.email}
                >
                  Hello, {sessionStorage.getItem("name")}!
                </NavMenuLinks>
                <NavMenuLinks>
                  <button onClick={logout} className="custom-button">
                    Logout
                  </button>
                </NavMenuLinks>
              </NavMenu>
            </>
          ) : (
            <Link to="/login">
              <button className="custom-button">Login</button>
            </Link>
          )}
        </NavBtn>
      </Nav>
    </div>
  );
}

NavBar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  logout,
  checkAuthenticated,
  load_user,
})(NavBar);
