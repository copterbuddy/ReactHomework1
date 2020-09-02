import React, { Component } from 'react'

export default class Topbar extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='navbar'>
                    <div className='navbar-title'>
                        {this.props.topbarText}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
