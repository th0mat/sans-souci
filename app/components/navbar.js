import React from 'react';
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import {browserHistory} from 'react-router';


function handleSelect(selectedKey) {
    switch (selectedKey) {
        case 1: {
            browserHistory.push('/');
            break
        }
        case 2: {
            browserHistory.push('/scan');
            break
        }
        case 3: {
            browserHistory.push('/notify');
            break
        }
        case 5: {
            browserHistory.push('/search');
            break
        }
        case 3.1: {
            browserHistory.push('/about');
            break
        }
    }
}

function sayHello() {
    browserHistory.push('/');
}


const navbarInstance = (
    <Navbar default>
        <Navbar.Header>
            <Navbar.Brand>
                <a onClick={sayHello} href="#">Sans-Souci</a>
            </Navbar.Brand>
            <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            <Nav pullRight onSelect={handleSelect}>
                <NavItem eventKey={1} href="#">live</NavItem>
                <NavItem eventKey={5} href="#">history</NavItem>
                <NavItem eventKey={2} href="#">scan</NavItem>
                <NavItem eventKey={3} href="#">notify</NavItem>
                <NavItem eventKey={3.1} href="#">about</NavItem>
                {/*<NavItem divider/>*/}
                <NavItem eventKey={4} href="#">settings</NavItem>
                {/*<NavDropdown eventKey={3} title="Menu" id="basic-nav-dropdown">*/}
                {/*<MenuItem eventKey={3.1}>Search</MenuItem>*/}
                {/*<MenuItem eventKey={3.2}>Notifications</MenuItem>*/}
                {/*<MenuItem eventKey={3.3}>All recent traffic</MenuItem>*/}
                {/*<MenuItem eventKey={3.4}>Settings</MenuItem>*/}
                {/*<MenuItem eventKey={3.5}>Help</MenuItem>*/}
                {/*<MenuItem eventKey={3.6}>About</MenuItem>*/}
                {/*</NavDropdown>*/}
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