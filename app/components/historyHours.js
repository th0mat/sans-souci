/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import * as actions from '../redux/actions';
import Hour from "./historyHour";
import {connect} from 'react-redux';
//import '../css/hours.css';
import {Link} from 'react-router';


@connect((store) => {
    return {
        tsec: store.targets,
        mac: store.macHistory,
        sysup: store.sysupHistory,
        returnToLink: store.returnToLink
    };
})
export default class hours extends React.Component {


    componentDidMount() {
        this.props.dispatch(actions.fetchHistory(this.props.user));
        this.fetch = setInterval(()=>this.props.dispatch(actions.fetchHistory(this.props.user)), 30000);
    }


    componentWillUnmount() {
        clearInterval(this.fetch);
    }

    getSysUpHour(hour) {
        let sysup = this.props.sysup.find((x)=> {
            return x[0] === hour[0]
        });
        return sysup;
    }

    render() {
        this.getSysUpHour = this.getSysUpHour.bind(this);

        return (
            <div>
                <h4>Hourly data</h4>
                <br/>
                {
                    this.props.mac.map((x) => {
                            return (
                                <Hour
                                    key={x[0]}
                                    hour={x[0]}
                                    traffic={x[1]}
                                    sysup={this.getSysUpHour(x)[1]}
                                ></Hour>
                            )
                        }
                    )
                }
            </div>
        )
    }

};


