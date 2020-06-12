import React, { Component } from "react";
import { Container, Navbar, NavItem, NavLink } from "reactstrap";
import { NavLink as Link } from "react-router-dom";

import logo from "../../images/R1-logo.png";

export class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      active: false,
      isShowHeader: false
    };

    this.title = "R1 RCM Logo";

    this.navBar = [
      { id: "tab-1", title: "Prework", path: "/Prework" },
      { id: "tab-2", title: "Create Folder Structure", path: "/create-folder" },
      { id: "tab-3", title: "Create Job", path: "/create-job" },
      { id: "tab-4", title: "Run Historical Job", path: "/run-historical-job" },
      { id: "tab-5", title: "Configure Daily Job", path: "/configure-job" },
      { id: "tab-8", title: "Delete Job", path: "/delete-job" },
      { id: "tab-6", title: "Test Configuration", path: "/configuration" },
      { id: "tab-7", title: "View Logs", path: "/view-logs" }
    ];
  }

  componentDidMount() {
    this.checkHostUrl();
  }
  checkHostUrl = () => {
    let url = window.location.pathname;
    if (url === "/" || url === "/unauthorized") {
      this.setState({
        isShowHeader: true
      });
    } else {
      this.setState({
        isShowHeader: false
      });
    }
    console.log(url);
  };

  render() {
    return (
      <header id="global-header">
        <Navbar className="navbar navbar-secondary navbar-inverse">
          <Container fluid={true}>
            {!this.state.isShowHeader && (
              <ul className="nav navbar-nav navbar-right">
                <NavItem>
                  <NavLink>PEN - Sacred Heart</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink>Logout</NavLink>
                </NavItem>
              </ul>
            )}
          </Container>
        </Navbar>

        <Navbar className="navbar navbar-main navbar-default">
          <div className="navbar-header">
            <NavLink className="navbar-brand">
              <img src={logo} alt={this.title} />
              <h2 className="product-title" title="R1 Insight">
                <strong>R1 CLIENTONBOARD</strong>{" "}
              </h2>
            </NavLink>
          </div>
        </Navbar>

        {!this.state.isShowHeader && (
          <div className="multi-step-form">
            <Navbar className="navbar navbar-toolbar ">
              <ul className="nav nav-justified">
                {this.navBar.map(item => {
                  return (
                    <NavItem key={item.id}>
                      <NavLink
                        tag={Link}
                        activeClassName="active"
                        to={item.path}
                      >
                        {item.title}
                      </NavLink>
                    </NavItem>
                  );
                })}
              </ul>
            </Navbar>
          </div>
        )}
      </header>
    );
  }
}
