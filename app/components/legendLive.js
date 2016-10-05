/**
 * Created by thomasnatter on 8/25/16.
 */

import React from 'react';


// from http://tristen.ca/hcl-picker/#/hlc/14/1/242937/E1FB75
var palette = ["#242937", "#285864", "#256970", "#257A7A", "#298B81", "#369D85",
    "#48AE86", "#60BF85", "#7BCF82", "#9ADF7D", "#BCEE79", "#E1FB75"].reverse();


export default class LegendLive extends React.Component {


    render() {

        var borderColor = 'silver'; // '#E7E7E7'; // same as navbar
        var traffic = this.props.traffic;

        return (
            <div>
                <div id="legendLive" className="pull-right">
                    <span style={{float: 'left'}}><small>less&nbsp;&nbsp;</small></span>
                    <div class="trafficColor" style={{background: palette[0]}} ></div>
                    <div class="trafficColor" style={{background: palette[1]}} ></div>
                    <div class="trafficColor" style={{background: palette[2]}} ></div>
                    <div class="trafficColor" style={{background: palette[4]}} ></div>
                    <div class="trafficColor" style={{background: palette[5]}} ></div>
                    <span style={{float: 'left'}}><small>&nbsp;&nbsp;more&nbsp;</small></span>
                </div>
                {/*<br/>*/}
            </div>

        );
    }
};

