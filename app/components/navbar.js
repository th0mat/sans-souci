import React from 'react';
import {connect} from 'react-redux';
import Navbar from "react-bootstrap/lib/Navbar";
import Nav from "react-bootstrap/lib/Nav";
import NavItem from "react-bootstrap/lib/NavItem";
import {browserHistory} from 'react-router';
import {Glyphicon} from 'react-bootstrap';

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
        case 6: {
            browserHistory.push('/settings');
            break
        }
        case 3.1: {
            browserHistory.push('/about');
            break
        }
    }
}

function goHome() {
    browserHistory.push('/');
}


var logSysIndicator;


@connect((store) => {
    return {
        logSysStatus: store.logSysStatus
    };
})
export default class NavBar extends React.Component {

    getLogSysIndicator() {
        var indicator = "";
        if (this.props.logSysStatus !== 'on') {
            indicator = <Glyphicon style={{color: 'red'}}
                                   glyph="flash"/>
        }
        return indicator;
    }


    render() {
        return (
            <Navbar default>
                <Navbar.Header>
                    <Navbar.Brand>
                        <a onClick={goHome} href="#">Sans-Souci</a>
                    </Navbar.Brand>
                    <Navbar.Toggle />
                </Navbar.Header>
                <Navbar.Collapse>
                    <Nav pullRight onSelect={handleSelect}>
                        <NavItem eventKey={1} href="#">live</NavItem>
                        <NavItem eventKey={2} href="#">scan</NavItem>
                        <NavItem eventKey={5} href="#">history</NavItem>
                        <NavItem eventKey={3} href="#">notify</NavItem>
                        <NavItem eventKey={3.1} href="#">about</NavItem>
                        {/*<NavItem divider/>*/}
                        <NavItem eventKey={6} href="#">settings {this.getLogSysIndicator()}&nbsp;&nbsp;
                        </NavItem>

                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        )
    }
}