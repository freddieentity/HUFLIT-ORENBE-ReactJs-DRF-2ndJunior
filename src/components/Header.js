import React, { useState } from "react";
import { GiCubes } from "react-icons/gi";
import { Anchor, Drawer, Button } from "antd";
import { Link as RRDLink } from "react-router-dom";
import { IoLogoElectron } from "react-icons/io5";
import { Button as BT } from "./Button";
const { Link } = Anchor;

function Header({ show, setShow }) {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
    <div className="container-fluid">
      <div className="header">
        <div className="logo">
          <RRDLink exact to="/partners">
            <IoLogoElectron />
            ORENBE
          </RRDLink>
        </div>
        <div className="logo">
          <BT
            primary="true"
            css={`
              max-width: 80px;
            `}
            style={{ color: "#fff" }}
            onClick={() => setShow(!show)}
          >
            <GiCubes />
            Management
          </BT>
        </div>
        <div className="mobileHidden">
          <Anchor targetOffset="65">
            <Link href="#hero" title="Home" />
            <Link href="#about" title="About" />
            <Link href="#feature" title="Features" />
            <Link href="#works" title="How it works" />
            <Link href="#faq" title="FAQ" />
            <Link href="#pricing" title="Pricing" />
            <Link href="#contact" title="Contact" />
          </Anchor>
        </div>
        <div className="mobileVisible">
          <Button type="primary" onClick={showDrawer}>
            <i className="fas fa-bars"></i>
          </Button>
          <Drawer
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
          >
            <Anchor targetOffset="65">
              <Link href="#hero" title="Home" />
              <Link href="#about" title="About" />
              <Link href="#feature" title="Features" />
              <Link href="#works" title="How it works" />
              <Link href="#faq" title="FAQ" />
              <Link href="#pricing" title="Pricing" />
              <Link href="#contact" title="Contact" />
            </Anchor>
          </Drawer>
        </div>
      </div>
    </div>
  );
}

export default Header;
