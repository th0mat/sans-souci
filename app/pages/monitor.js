/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {connect} from 'react-redux'
import Navbar from '../components/navbar'
import MonitorConnect from '../components/monitorConnect';



@connect((store) => {
    return {
    };
})
export default class Monitor extends React.Component {


    render() {
        this.props.dispatch({type: "SET_RETURN_TO_LINK",
            payload: "/"});

        return (
            <div>
            <Navbar/>
             <div class="page-header">
             <h1>Live <small>realtime monitoring</small></h1>
             </div>
                <MonitorConnect />
            </div>
        )
    }
};




