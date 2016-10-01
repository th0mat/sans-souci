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
import {browserHistory} from 'react-router';
import * as actions from '../redux/actions';

@connect((store) => {
    return {
        targets: store.targetsOnly
    };
})
export default class EditHeader extends React.Component {
    constructor(props) {
        super(props);
        if (this.props.targets.indexOf(this.props.targets.find(x=>x.macHex === this.props.user)) === -1) {
            this.index = this.props.targets.length; // one after the last current target
            this.target = {
                macHex: this.props.user,
                dname: 'Incognito',
                avatar: 'img/Incognito.jpg',
                lastSeen: null,
                notifyBack: false,
                notifyGone: false,
                traffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
            this.state = {
                targetIndex: this.index, target: this.target, file: null
            }
        } else {
            this.state = {
                targetIndex: this.props.targets.indexOf(this.props.targets.find(x=>x.macHex === this.props.user)),

                target: JSON.parse(JSON.stringify(this.props.targets.find(x=>x.macHex === this.props.user))),
                file: null,
            };
        }
    }


    cancelChanges(e) {
        browserHistory.push('/settings');
    }

    handleChange(e) {
        let updated = this.state.target;
        updated[e.target.name] = e.target.value;
        this.setState({target: updated});
    }

    removeTarget(e) {
        if (this.state.targetIndex === this.props.targets.length) {
            // not in the target list yet anyhow, so nothing to do
        } else {
            let targets = JSON.parse(JSON.stringify(this.props.targets));
            targets.splice(this.state.targetIndex, 1);
            this.props.dispatch(actions.postTargetChanges(targets))
        }
        browserHistory.push('/settings');
    }

    previewFile() {
        var preview = document.querySelector('img');
        var file = document.querySelector('input[type=file]').files[0];
        var reader = new FileReader();
        var that = this;
        reader.addEventListener("load", function () {
            preview.src = reader.result;
            that.setState({file: file});
        }, false);

        if (file) {
            reader.readAsDataURL(file);
        }
    }


    saveChanges(e) {
        let updated = JSON.parse(JSON.stringify(this.props.targets));
        updated[this.state.targetIndex] = this.state.target;
        // upload image and post target changes
        if (this.state.file !== null) {  // avatar has changed
            this.props.dispatch(actions.uploadImage(this.state.file, this.state.targetIndex, updated));
        } else {
            // target changes only
            this.props.dispatch(actions.postTargetChanges(updated));
        }
        browserHistory.push('/settings');
    }


    render() {
        this.saveChanges = this.saveChanges.bind(this);
        this.removeTarget = this.removeTarget.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.previewFile = this.previewFile.bind(this);
        // var found = this.target();
        return (
            <div>
                <br/>
                <Link to='/settings'> <img src={"../../" + this.state.target.avatar} class="user-pix"
                                           height="240" width="240"/> </Link>
                <div id="user-info">
                    <h2><input name="dname" value={this.state.target.dname} type="text"
                               onChange={this.handleChange}/></h2>
                    <p><input name="macHex" value={this.state.target.macHex} type="text"
                              onChange={this.handleChange}/></p>
                </div>
                <br/>

                <h3>To change picture</h3>

                <input type="file" onChange={this.previewFile}/>

                <br/><br/>
                <Button bsStyle="default" bsSize="small" onClick={this.cancelChanges}>cancel</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="warning" bsSize="small"
                                                 onClick={this.removeTarget.bind(this)}>remove</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="primary" bsSize="small"
                                                 onClick={this.saveChanges}>save&nbsp;</Button>
                <br/><br/>
            </div>
        )
    }

};


