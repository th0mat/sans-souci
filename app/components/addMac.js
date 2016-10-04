/**
 * Created by thomasnatter on 10/03/16.
 */

import React from 'react';
import {browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';

// via props get destination, buttonName, invalidMsg
export default class AddMac extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTarget: 'abcdef123456'
        }
    }

    buttonAction(event) {
        browserHistory.push(this.props.destination + this.strip(this.state.searchTarget))
    }



    handleChange(event) {
        this.setState({searchTarget: event.target.value});
    }


    strip(mac){
        let small = mac.toLowerCase();
        let arr = small.split("");
        let filtered = arr.filter((x)=>{
            return (x >= 'a' && x <= 'f') || (x >= 0 && x <= 9 );
        })
        return filtered.join('');
    }


    validateMac(mac) {
        if (~mac.search(/[^a-f0-9A-F\.:-]/)) return false;
        if (this.strip(mac).length === 12) return true;
        return false;
    }


    getWarning() {
        if (this.validateMac(this.state.searchTarget)) {
            return (<Button bsStyle="primary" bsSize="small" onClick=
                {this.buttonAction.bind(this)}>
                {this.props.buttonName}</Button>)
        } else {
            return (
                <span>
                    {/*<Button bsStyle="default" bsSize="small">search</Button> &nbsp;&nbsp;*/}
                    <span style={{color: 'red'}}>{this.props.invalidMsg}</span>
                </span>
            )
        }

    }


    render() {

        return (
            <span>
                <input name="targetMac" value={this.state.searchTarget} type="text"
                       onChange={this.handleChange.bind(this)}/>&nbsp;&nbsp;
                {this.getWarning()}
            </span>
        )
    }
};



