import React from 'react';
import 'history';
import {connect} from 'react-redux';
import '../css/iruka.css';
import {Link} from 'react-router';
import AddMac from './addMac'

@connect((store) => {
    return {
        targetsOnly: store.targetsOnly
    };
})
export default class SetTargetsList extends React.Component {

    render() {
        var targets = this.props.targetsOnly;

        return (
            <div>
                < div>
                    <AddMac buttonName='add this device' destination="/edit/" invalidMsg="invalid mac address"/>
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
                                    <td><Link to={"profile/" + x.macHex}>edit/remove</Link></td>
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


