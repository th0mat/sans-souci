/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {connect} from 'react-redux'

var url = "http://171.101.236.255:3000/";

import Navbar from '../components/navbar'
import Traffic from '../components/traffic';

@connect((store) => {
    return {
        tsec: store.targets
    };
})
export default class Live extends React.Component {


    render() {
        return (
            <div>
            <Navbar/>
             <div class="page-header">
             <h1>Live <small>realtime monitoring</small></h1>
             </div>

                <Traffic tsec={this.props.tsec}></Traffic>
            </div>
        )
    }
};



