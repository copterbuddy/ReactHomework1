import React, { Component } from 'react'

export default class SortBar extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='form-control'>
                    <div className='d-flex'>
                        <div className='mr-auto p-2'>{this.props.textHeadSort}</div>
                        <div><button type="button" className="btn btn-light p-2"><img width='15px' height='10px' src={require('../assets/image/list_icon_unactive.png')} /></button></div>
                        <div><button type="button" className="btn btn-light p-2"><img width='15px' height='10px'  src={require('../assets/image/grid_icon_unactive.png')} /></button></div>
                        {/* <img className='button' src={require('../assets/image/list_icon_unactive.png')} /> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
