import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, NavLink } from "react-router-dom";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  Nav,
  NavItem,
  Button,
} from "reactstrap";
import Logo from "../../assets/images/logo-light.png";
import "./styles.scss";

const Header = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  const onLogout = () => {
    document.location.reload();
  };

  return (
    <header>
      <Navbar expand="md">
        <Link to="/">
          <img className="navbar-brand logo" alt="Diskus logo" src={Logo} />
        </Link>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto" navbar>
            <NavItem>
              <NavLink to="/" activeClassName="nav-link-current" exact>
                <span className="nav-link">Home</span>
              </NavLink>
            </NavItem>
            {user ? (
              <NavItem>
                <Button onClick={onLogout} color="primary" className="nav-link">
                  Logout
                </Button>
              </NavItem>
            ) : (
              <NavItem>
                <NavLink to="/login" activeClassName="nav-link-current">
                  <span className="nav-link">Login</span>
                </NavLink>
              </NavItem>
            )}
          </Nav>
        </Collapse>
      </Navbar>
    </header>
  );
};

export default Header;
