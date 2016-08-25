/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import '../css/hours.css';


import {incognito} from "../config/config.client.js";

import Hours from "../components/hours.js";

@connect((store) => {
    return {
        tsec: store.targets
    };
})
export default class Hisotry extends React.Component {
    target() {
        for (let i in this.props.tsec) {
            if (this.props.tsec[i].macHex === this.props.params.user) {
                return this.props.tsec[i];
            }
        }
        return incognito;
    }


    render() {
        var found = this.target();

        return (

            <div>
                <Link to="/"> <img src={"../../" + found.avatar} class="user-pix"
                                   height="120" width="120"/> </Link>
                <div id="user-info">
                    <h2>Traffic History for {found.dname}</h2>
                    <h3>Hourly Data</h3>
                </div>
                <Hours
                    day={this.props.params.day}
                    user={this.props.params.user}>
                </Hours>
                <Link to="/">Back to Live</Link>
            </div>
        )
    }
}




