/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';

var url = "http://171.101.236.255:3000/";

import Navbar from '../components/navbar'
import AllHogs from '../components/scanHogs';




export default class Hogs extends React.Component {

    render() {
        return (
            <div>
            <Navbar/>
             <div class="page-header">
             <h1>Active devices <small>munching data</small></h1>
             </div>

                <AllHogs></AllHogs>
            </div>
        )
    }
};



