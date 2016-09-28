import React from 'react';
import 'history';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Button} from 'react-bootstrap';
import * as actions from '../redux/actions'
import {Link} from 'react-router';


@connect((store) => {
    return {
        targetsOnly: store.targetsOnly,
        targetsOnlyBup: store.targetsOnlyBup,
    };
})
export default class SetTargetsList extends React.Component {


    render() {
        var targets = this.props.targetsOnly;
        console.log(targets);

        return (
            <div>
                < div>
                    <span>Currently monitored: {targets.length}</span>
                    <br/><br/>
                    <Button bsStyle="primary" bsSize="small">add device</Button>
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


