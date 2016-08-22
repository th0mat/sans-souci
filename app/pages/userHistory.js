/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {Link} from 'react-router';

///import tsec from "../config/macMonitored.js";
import {incognito} from "../config/config.client.js";

import Data from "../components/history.user.js";


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
                <h2>Traffic History for {found.dname}</h2>
                <br/>
                <Link to="/"> <img src={"../../" + found.avatar} className="media-object"
                     height="75" width="75"/> </Link>
                <br/>
                <Data
                    day={this.props.params.day}
                    user={this.props.params.user}  >
                </Data>
                <Link to="/">Back to Live</Link>
            </div>
        )
    }
});



