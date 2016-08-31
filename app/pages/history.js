/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
import '../css/hours.css';


import {incognito} from "../config/config.client.js";

import Navbar from '../components/navbar';
import Hours from "../components/hours";

@connect((store) => {
    return {
        tsec: store.targets,
        returnToLink: store.returnToLink
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
                <Navbar/>
                <div class="page-header">
                    <h1>Recent history <small>hour by hour</small></h1>
                </div>
                <Link to={this.props.returnToLink}> <img src={"../../" + found.avatar} class="user-pix"
                                   height="120" width="120"/> </Link>
                <div id="user-info">
                    <h2>{found.dname}</h2>
                    <p>Device mac address: {this.props.params.user}</p>
                </div>
                <br/><br/>
                <Hours
                    day={this.props.params.day}
                    user={this.props.params.user}>
                </Hours>
                <br/>
                <Link to="/">Back to Live</Link>
            </div>
        )
    }
}




