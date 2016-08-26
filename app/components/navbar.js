import React from 'react';
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import NavDropdown from "react-bootstrap/lib/NavDropdown";
import MenuItem from "react-bootstrap/lib/MenuItem";
import { browserHistory } from 'react-router';



function handleSelect(selectedKey) {
    switch (selectedKey){
        case 3.1: {
            console.log("match");
            browserHistory.push('/');
            break
        }case 3.6: {
            console.log("match");
            browserHistory.push('/about');
            break
        }
    }
    console.log(selectedKey);
}

function sayHello(){
    browserHistory.push('/');
}


const navbarInstance = (
    <Navbar inverse>
        <Navbar.Header>
            <Navbar.Brand>
                <a onClick={sayHello} href="#">Sans-Souci</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight onSelect={handleSelect}>
                {/*<NavItem eventKey={1} href="#"></NavItem>*/}
                {/*<NavItem eventKey={2} href="#"></NavItem>*/}
                <NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1}>Search</MenuItem>
                    <MenuItem eventKey={3.2}>Notifications</MenuItem>
                    <MenuItem eventKey={3.3}>All recent traffic</MenuItem>
                    <MenuItem divider/>
                    <MenuItem eventKey={3.4}>Settings</MenuItem>
                    <MenuItem eventKey={3.5}>Help</MenuItem>
                    <MenuItem eventKey={3.6}>About</MenuItem>
                </NavDropdown>
            </Nav>
            {/*<Nav pullRight>*/}
                {/*<NavItem eventKey={1} href="#">Link Right</NavItem>*/}
                {/*<NavItem eventKey={2} href="#">Link Right</NavItem>*/}
            {/*</Nav>*/}
        </Navbar.Collapse>
    </Navbar>
);

export default React.createClass({
        render() {
            return navbarInstance;
        }
    }
)