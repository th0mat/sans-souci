/**
 * Created by thomasnatter on 9/2/16.
 */

import React from 'react';
import 'history';
import * as actions from '../redux/actions';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Link} from 'react-router';
import {browserHistory} from 'react-router';
import {Button} from 'react-bootstrap';

@connect((store) => {
    return {
        targets: store.targetsOnly
    };
})
export default class NotifyTargets extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            targets: JSON.parse(JSON.stringify(this.props.targets))
        }
    }

    handleChange(goneBack, event) {
        var t = this.state.targets.find((x)=>x.macHex === event.target.name);
        t[goneBack] = !t[goneBack];
        let targets = JSON.parse(JSON.stringify(this.state.targets));
        this.setState({targets: targets})
    }


    cancelChanges(event) {
        browserHistory.push('/');
    }


    saveChanges(event) {
        this.props.dispatch(actions.postTargetChanges(this.state.targets));
        browserHistory.push('/');
    }

    render() {

        var unsaved = this.state.targets;
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
                                                   onChange={this.handleChange.bind(this, 'notifyGone')}/></td>
                                        <td><input type="checkbox" checked={x.notifyBack} name={x.macHex}
                                                   onChange={this.handleChange.bind(this, 'notifyBack')}/></td>
                                    </tr>
                                )
                            }
                        )
                    }
                    </tbody>
                </table>
                <Button bsStyle="default" bsSize="small" onClick={this.cancelChanges}>reset</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="primary" bsSize="small"
                                                 onClick={this.saveChanges.bind(this)}>save&nbsp;</Button>
            </div>
        )
    }

};


