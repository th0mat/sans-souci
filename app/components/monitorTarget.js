/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import MonitorData from './monitorData';

import {Link} from 'react-router';
import moment from 'moment';

export default React.createClass({

    render() {

        return ( < div className="media">
                < div className="media-left">
                    < Link to={"history/" + this.props.macHex}>
                        < img className="media-object"
                              height="75"
                              width="75"
                              src={
                                  "../" + this.props.avatar
                              }
                              alt=""/>
                    </Link></div>
                < div className="media-body">
                    < h4 className="media-heading"> {
                        this.props.dname
                    } </h4> < MonitorData traffic={
                    this.props.traffic
                }> </MonitorData>
                    <p style={{clear: "left"}} >
                        < small > last seen: {
                            moment(this.props.lastSeen).calendar()
                        } </small>
                    </p >
                </div>
            </div>
        );
    }
})

