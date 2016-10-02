/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';

import Navbar from '../components/navbar'
import ScanHogs from '../components/scanHogs';




export default class Hogs extends React.Component {

    render() {
        return (
            <div>
            <Navbar/>
             <div class="page-header">
             <h1>Active devices <small>munching data</small></h1>
             </div>

                <ScanHogs></ScanHogs>
            </div>
        )
    }
};



