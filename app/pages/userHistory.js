/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';

import tsec from "../config/macMonitored.js";
import {incognito} from "../config/macMonitored.js";


// get person profile based on mac



// routed via address of type: history/:day/:user  user = macHex


export default React.createClass({
    target(){
        for (let i in tsec) {
            if (tsec[i].macHex === this.props.params.user) {
                return tsec[i];
            }
        }
        return incognito;
    },


    render() {
        var found = this.target();

        return (
            <div>
                <h2>User History for {found.dname}</h2>
                <br/>
                <img src={"../../" + found.avatar} className="media-object"
                     height="75" width="75"/>
                <br/>
                <p>The user covered here will be {this.props.params.user}</p>
                <p>The date covered will be {this.props.params.day} days before today</p>
                <Link to="/">Back to Live</Link>
            </div>
        )
    }
});



