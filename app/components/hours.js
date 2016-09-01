/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import * as actions from '../redux/actions';
import Hour from "../components/hour";
import {connect} from 'react-redux';
import Config from '../config/config';
var url = Config.url;


@connect((store) => {
    return {
        tsec: store.targets,
        mac: store.macHistory
    };
})
export default class hours extends React.Component {
    
    componentDidMount()
    {
        this.props.dispatch(actions.fetchHistory(this.props.user));
    }


    render(){
        return (
            <div>

                <br/>

                {
                    this.props.mac.map((x) => {
                            return (
                                <Hour
                                    key={x[0]}
                                    hour={x[0]}
                                    traffic={x[1]}
                                ></Hour>
                            )
                        }
                    )
                }
            </div>
        )
    }

};


