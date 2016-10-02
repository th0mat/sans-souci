import React from 'react';
import 'history';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Button} from 'react-bootstrap';
import * as actions from '../redux/actions'
import {Link} from 'react-router';
import {browserHistory} from 'react-router'

@connect((store) => {
    return {
        targetsOnly: store.targetsOnly
    };
})
export default class SetTargetsList extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            searchTarget: 'abcdef123456'
        }
    }

    handleChange(e){
        this.setState({searchTarget: e.target.value});
    }

    addDevice(e){
        browserHistory.push('/edit/' + this.state.searchTarget)
    }

    render() {
        var targets = this.props.targetsOnly;

        return (
            <div>
                < div>
                    <input name="targetMac" value={this.state.searchTarget} type="text"
                           onChange={this.handleChange.bind(this)}/>&nbsp;&nbsp;
                    <Button bsStyle="primary" bsSize="small" onClick={this.addDevice.bind(this)}>add this device</Button>
                    <br/><br/>
                    <span>Currently monitored: {targets.length}</span>
                    <br/><br/>


                    <table class="table table-striped">
                        <thead>
                        <tr>
                            <th>Image</th>
                            <th>Name</th>
                            <th>Mac</th>
                            <th>Action</th>
                        </tr>
                        </thead>
                        <tbody>
                        {targets.map(x=>{
                            return (
                                <tr key={x.macHex}>

                                    <td>< img className="media-object"
                                              height="35"
                                              width="35"
                                              src={
                                                  "../" + x.avatar
                                              }
                                              alt={x.dname}/></td>
                                    <td>{x.dname}</td>
                                    <td style={{fontFamily: "monospace"}}>{x.macHex}</td>
                                    <td><Link to={"edit/" + x.macHex}>edit/remove</Link></td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }

};


