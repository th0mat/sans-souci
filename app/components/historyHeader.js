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
import '../css/iruka.css';
import {Link} from 'react-router';



@connect((store) => {
    return {
        tsec: store.targets,
        oui: store.oui,
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
        var sub = (this.props.user === '1000000000000')
            ? 'System uptime data'
            : 'Mac address: ' + this.props.user;
        return (
            <div>
                <br/>
                <Link to={this.props.returnToLink}> <img src={"../../" + found.avatar} class="user-pix"
                                                         height="160" width="160"/> </Link>
                <div id="user-info">
                    <h2>{found.dname}</h2><span class="label pull-right label-default">auto-updates</span>
                    <p>{sub}</p>
                    <p>Maker: {this.props.oui[this.props.user.substr(0,6)]}</p>
                    <p><Link to={"/profile/" + this.props.user}>edit</Link></p>
                </div>
            </div>
        )
    }

};


