import React, { Component } from 'react'

export default class SortBar extends Component {

    render() {
        return (
            <React.Fragment>
                <div className='form-control'>
                    <div className='text-left'>
                        {this.props.textHeadSort}
                        <button type="button" className="btn btn-light"><img width='10px' height='10px' src={require('../assets/image/list_icon_unactive.png')} /></button>
                        <button type="button" className="btn btn-light"><img width='10px' height='10px'  src={require('../assets/image/grid_icon_unactive.png')} /></button>
                        {/* <img className='button' src={require('../assets/image/list_icon_unactive.png')} /> */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
