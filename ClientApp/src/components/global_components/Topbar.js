import React, { Component } from 'react'

export default class Topbar extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='navbar' style={{
                    margin:"0px"
                    }}>
                    <div className=' navbar-title'>
                        {this.props.topTxt}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
