/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import {browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';

import Navbar from '../components/navbar';

@connect((store)=> {
    return {
        // keep to get this.props.dispatch
    }
})
export default class Search extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchTarget: 'abcdef123456',
            macValid: true
        }
    }

    lookupMacHistory(event) {
        this.props.dispatch({type: "SET_RETURN_TO_LINK", payload: "/search"});
        browserHistory.push('/history/' + this.strip(this.state.searchTarget))
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
            return (<Button bsStyle="primary" bsSize="small" onClick={this.lookupMacHistory.bind(this)}>search</Button>)
        } else {
            return (
                <span>
                    {/*<Button bsStyle="default" bsSize="small">search</Button> &nbsp;&nbsp;*/}
                    <span style={{color: 'red'}}>invalid mac address</span>
                </span>
            )
        }

    }


    render() {
        //this.lookupMacHistory = this.lookupMacHistory.bind(this);


        return (
            <div>
                <Navbar />
                <div class="page-header">
                    <h1>Search history
                        <small> via manual input</small>
                    </h1>
                </div>

                <span>Mac to look-up: </span>&nbsp;&nbsp;
                <input name="targetMac" value={this.state.searchTarget} type="text"
                       onChange={this.handleChange.bind(this)}/>&nbsp;&nbsp;
                {this.getWarning()}
                <br/>
                <br/>
                <br/>

                <h4>The easier way</h4>

                <p>You can access the history of any device listed on the live monitor screen
                    by clicking on its image. On the scan screen there are links for all observed devices
                    which also directly bring you to the history of that device.</p>
                <p>To return to the previous screen from history, click on the image on the history page.</p>

                <br/>
                <Link to="/">Back to Live</Link>

            </div>
        )
    }
};



