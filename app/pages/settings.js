/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';

var url = "http://171.101.236.255:3000/";

import Navbar from '../components/navbar';
import OnOff from '../components/setOnOff';
import SetTargetsList from '../components/setTargetsList';

export default class Config extends React.Component {


    render() {
        return (
        <div>
            <Navbar/>
            <div class="page-header">
                <h1>Settings
                    <small></small>
                </h1>
            </div>
            <h3>Logging System</h3>
            <br/>
            <OnOff></OnOff>
            <br/><br/>
            <h3>Monitored Devices</h3>
            <br/>
            <SetTargetsList></SetTargetsList>
        </div>
    )
    }
};



