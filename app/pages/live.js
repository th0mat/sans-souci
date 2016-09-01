/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import {connect} from 'react-redux'
import Navbar from '../components/navbar'
import Traffic from '../components/traffic';



@connect((store) => {
    return {
        tsec: store.targets
    };
})
export default class Live extends React.Component {


    render() {
        this.props.dispatch({type: "SET_RETURN_TO_LINK",
            payload: "/"});

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



