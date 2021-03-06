
import React from 'react';
import 'history';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Link} from 'react-router';
import {Button} from 'react-bootstrap';
import {browserHistory} from 'react-router';
import * as actions from '../redux/actions';


@connect((store) => {
    return {
        targets: store.targetsOnly,
        oui: store.oui,
        imageBank: store.imageBank
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
                sortOrder: this.props.targets.length + 1,
                traffic: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
            };
            this.state = {
                targetIndex: this.index, target: this.target, file: null, fileMsg: ''
            }
        } else {
            this.state = {
                targetIndex: this.props.targets.indexOf(this.props.targets.find(x=>x.macHex === this.props.user)),

                target: JSON.parse(JSON.stringify(this.props.targets.find(x=>x.macHex === this.props.user))),
                file: null, fileMsg: ''
            };
        }
    }


    cancelChanges(e) {
        browserHistory.push('/settings');
    }


    swapImg(e){
        let target = JSON.parse(JSON.stringify(this.state.target));
        target.avatar = 'img/' + e.target.name;
        this.setState({target: target});
        this.setState({file: null});
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
        this.setState({fileMsg: ''}); // remove msg from previous try
        const MAX_FILE_SIZE = 500000;
        var preview = document.querySelector('.user-pix');
        var file = document.querySelector('input[type=file]').files[0];
        if (!file.type.match('image.*')){
            let msg = file.name + ' is not an image file';
            this.setState({fileMsg: msg, file: null}); // ensure file is not saved
            return;
        }
        if (file.size > MAX_FILE_SIZE){
            let msg = file.name + ' is larger than 500kb';
            this.setState({fileMsg: msg, file: null}); // ensure fle is not saved
            return;
        }
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
                    <p>{this.props.oui[this.state.target.macHex.substr(0,6)]}</p>
                </div>
                <br/>

                <h3>Upload new picture</h3>

                <input type="file" onChange={this.previewFile}/>
                <br/>
                <span style={{color: 'red'}}>{this.state.fileMsg}</span>

                <br/><br/>
                <Button bsStyle="default" bsSize="small" onClick={this.cancelChanges}>cancel</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="warning" bsSize="small"
                                                 onClick={this.removeTarget.bind(this)}>remove</Button>
                <span>&nbsp;&nbsp;</span><Button bsStyle="primary" bsSize="small"
                                                 onClick={this.saveChanges}>save&nbsp;</Button>
                <br/><br/>
                <h3>Or select from below</h3>
                <div>
                    {this.props.imageBank.map(x=>{
                        return (
                            <img src={"/imgBank/" + x} key={x} class="bankPix" name={x}
                                 height="50" width="50" onClick={this.swapImg.bind(this)}/>
                        )
                    })}


                </div>
            </div>
        )
    }

};


