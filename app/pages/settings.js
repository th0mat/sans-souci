/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';

var url = "http://171.101.236.255:3000/";

import Navbar from '../components/navbar'
import OnOff from '../components/settingsOnOff';




export default class Config extends React.Component {



    render() {
        return (
            <div>
            <Navbar/>
             <div class="page-header">
             <h1>Configuration <small></small></h1>
             </div>
                <OnOff></OnOff>
            </div>
        )
    }
};



