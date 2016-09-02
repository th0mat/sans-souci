/**
 * Created by thomasnatter on 9/2/16.
 */
/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import {connect} from 'react-redux';
import Config from '../config/config';
import '../css/hours.css';
import {Link} from 'react-router';



@connect((store) => {
    return {
        tsec: store.targets,
        returnToLink: store.returnToLink
    };
})
export default class HistoryHeader extends React.Component {


    target() {
        for (let i in this.props.tsec) {
            if (this.props.tsec[i].macHex === this.props.user) {
                return this.props.tsec[i];
            }
        }
        return Config.incognito;
    }


    render(){
        var found = this.target();
        return (
            <div>
                <br/>
                <Link to={this.props.returnToLink}> <img src={"../../" + found.avatar} class="user-pix"
                                                         height="120" width="120"/> </Link>
                <div id="user-info">
                    <h2>{found.dname}</h2>
                    <p>Device mac address: {this.props.user}</p>
                </div>
            </div>
        )
    }

};


