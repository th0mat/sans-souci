/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import 'history';
import * as actions from '../redux/actions';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';

@connect((store) => {
    return {
        targets: store.targetsOnly
    };
})
export default class NotifyTargets extends React.Component {

    handleChangeGone(event) {
        this.props.dispatch({
            type: 'TOGGLE_NOTIFY_GONE',
            payload: event.target.name
        });
    }

    handleChangeBack(event) {
        this.props.dispatch({
            type: 'TOGGLE_NOTIFY_BACK',
            payload: event.target.name
        });
    }

    cancelChanges(event) {
        this.props.dispatch({
            type: "CANCEL_TARGET_CHANGES"
        })
    }


    saveChanges(event) {
        this.props.dispatch(actions.postNotifyChanges(this.props.targets));
    }

    render() {
        this.handleChangeBack = this.handleChangeBack.bind(this);
        this.handleChangeGone = this.handleChangeGone.bind(this);
        this.cancelChanges = this.cancelChanges.bind(this);
        this.saveChanges = this.saveChanges.bind(this);

        var unsaved = this.props.targets;
        return (
            <div>
                <h4>Notification targets</h4>
                <br/>
                <table class="table table-striped">
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Gone</th>
                        <th>Back</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        unsaved.map((x) => {
                                return (
                                    <tr key={x.macHex}>
                                        <td>{x.dname}</td>
                                        <td><input type="checkbox" checked={x.notifyGone} name={x.macHex}
                                                   onChange={this.handleChangeGone}/></td>
                                        <td><input type="checkbox" checked={x.notifyBack} name={x.macHex}
                                                   onChange={this.handleChangeBack}/></td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
                <Button bsStyle="default" bsSize="small" onClick={this.cancelChanges}>reset</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="primary" bsSize="small" onClick={this.saveChanges}>save&nbsp;</Button>
            </div>
        )
    }

};


