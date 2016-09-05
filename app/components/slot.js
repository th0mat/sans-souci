/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import Bullets from './bullets.js';

import {Link} from 'react-router';
import moment from 'moment';

export default React.createClass({

    render() {

        return ( < div className="media">
                < div className="media-left">
                    < Link to={"history/0/" + this.props.macHex}>
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
                    } </h4> < Bullets traffic={
                    this.props.traffic
                }> </Bullets>
                    < p >
                        < small > last seen: {
                            moment(this.props.lastSeen).calendar()
                        } </small>
                    </p >
                </div>
            </div>
        );
    }
})

