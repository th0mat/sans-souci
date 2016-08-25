/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {connect} from 'react-redux'

var url = "http://171.101.236.255:3000/";


import Traffic from '../components/traffic.js';

@connect((store) => {
    return {
        tsec: store.targets
    };
})
export default class Live extends React.Component {


    render() {
        return (
            <Traffic tsec={this.props.tsec}></Traffic>
        )
    }
};



