/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';


import Navbar from '../components/navbar'
import NotifyTargets from '../components/notifyTargets';




export default class Notify extends React.Component {

    render() {
        return (
            <div>
            <Navbar/>
             <div class="page-header">
             <h1>Get notified <small>by email</small></h1>
             </div>
                 <NotifyTargets/>
            </div>
        )
    }
};



