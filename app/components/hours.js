/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import * as actions from '../redux/actions';
import Hour from "../components/hour";
import {connect} from 'react-redux';
import Config from '../config/config';
import '../css/hours.css';
import {Link} from 'react-router';



@connect((store) => {
    return {
        tsec: store.targets,
        mac: store.macHistory,
        returnToLink: store.returnToLink
    };
})
export default class hours extends React.Component {


    componentDidMount()
    {
        this.props.dispatch(actions.fetchHistory(this.props.user));
    }


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
                <div class="page-header">
                    <h1>Recent history <small>hour by hour</small></h1>
                </div>
                <Link to={this.props.returnToLink}> <img src={"../../" + found.avatar} class="user-pix"
                                                         height="120" width="120"/> </Link>
                <div id="user-info">
                    <h2>{found.dname}</h2>
                    <p>Device mac address: {this.props.user}</p>
                </div>


                <br/>
                <br/>
                <br/>

                {
                    this.props.mac.map((x) => {
                            return (
                                <Hour
                                    key={x[0]}
                                    hour={x[0]}
                                    traffic={x[1]}
                                ></Hour>
                            )
                        }
                    )
                }
            </div>
        )
    }

};


