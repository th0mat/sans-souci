/**
 * Created by thomasnatter on 8/25/16.
 */

import React from 'react';


var gone = '#F8F8F8';
var sysDown = '#fcd276';
var notYet = 'skyBlue'


export default class LegendHistory extends React.Component {


    render() {

        var borderColor = 'silver'; // '#E7E7E7'; // same as navbar
        var traffic = this.props.traffic;

        return (
            <div>
                <div id="legendHistory" className="pull-right">
                    <div class="trafficColor" style={{background: sysDown}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;system down&nbsp;&nbsp;</small></span>
                    <div class="trafficColor" style={{background: gone}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;device gone&nbsp;&nbsp;</small></span>
                    <div class="trafficColor" style={{background: notYet}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;not yet&nbsp;</small></span>
                </div>
                <br/>
            </div>

        );
    }
};

