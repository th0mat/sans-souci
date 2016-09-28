/**
 * Created by thomasnatter on 9/2/16.
 */
/**
 * Created by thomasnatter on 8/13/16.
 */

import React from 'react';
import 'history';
import {connect} from 'react-redux';
import Config from '../config/config';
import '../css/iruka.css';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';


@connect((store) => {
    return {
        targets: store.targetsOnly
    };
})
export default class EditHeader extends React.Component {

    getInitialState(){

    }


    cancelChanges(event) {
        this.props.dispatch({
            type: "CANCEL_TARGET_CHANGES"
        })
    }


    removeTarget(){

    }

    target() {
        for (let i in this.props.targets) {
            if (this.props.targets[i].macHex === this.props.user) {
                return this.props.targets[i];
            }
        }
        return Config.incognito;
    }

    saveChanges(event) {
        this.props.dispatch(actions.postNotifyChanges(this.props.targets));
    }



    render(){
        this.cancelChanges = this.cancelChanges.bind(this);
        this.saveChanges = this.saveChanges.bind(this);
        this.removeTarget = this.removeTarget.bind(this);
        var found = this.target();
        return (
            <div>
                <br/>
                <Link to='/settings'> <img src={"../../" + found.avatar} class="user-pix"
                                                         height="120" width="120"/> </Link>
                <div id="user-info">
                    <h2>{found.dname}</h2>
                    <p>{this.props.user}</p>
                </div>
                <br/><br/>
                <Button bsStyle="default" bsSize="small" onClick={this.cancelChanges}>cancel</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="warning" bsSize="small" onClick={this.removeTarget}>remove</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="primary" bsSize="small" onClick={this.saveChanges}>save&nbsp;</Button>
            </div>
        )
    }

};


