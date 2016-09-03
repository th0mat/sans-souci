/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import 'history';
import * as actions from '../redux/actions';
import Hour from "../components/hour";
import {connect} from 'react-redux';
import '../css/hours.css';
import {Link} from 'react-router';


@connect((store) => {
    return {
        targets: store.targets
    };
})
export default class NotifyTargets extends React.Component {

    render() {
        var unsaved = this.props.targets;
        unsaved = unsaved.filter(x=>{
            return x.dname !== "Total traffic";
        });
        return (
            <div>
                <h4>Notification targets</h4>
                <br/>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Departed</th>
                        <th>Returned</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        unsaved.map((x) => {
                                return (
                                    <tr key={x.macHex}>
                                        <td>{x.dname}</td>
                                        <td><input type="checkbox" checked={x.notify.departed}/></td>
                                        <td><input type="checkbox" checked={x.notify.returned}/></td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
                <button class="btn btn-default">cancel</button><button class="btn btn-default">save changes</button>
            </div>
        )
    }

};


