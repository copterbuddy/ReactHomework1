import React, { Component } from 'react'
import { ButtonGroup } from 'react-bootstrap';

export default class SortBar extends Component {
    
    constructor(props) {
        super(props);
        this.state = {
            typeSort: this.props.typeSort
        }
        
    }

    SortReload(typeSort) {
        
        this.setState({ typeSort: typeSort });
    }

    render() {
        { var srcList = require('../assets/image/list_icon_active.png') };
        { var srcGrid = require('../assets/image/grid_icon_unactive.png') };

        return (
            <React.Fragment>
                <div className='form-control'>
                    <div className='d-flex'>
                        <div className='mr-auto p-2'>{this.props.textHeadSort}</div>

                        <div className="p-2 block-example border border-0 border-dark">
                            <img className='' onClick={() => this.SortReload('List')} src={srcList} width='30px' height='30px' />

                            <img className='' onClick={() => this.SortReload('Grid')} src={srcGrid} width='30px' height='30px' />
                        </div>
                    </div>

                    {this.state.typeSort}
                </div>
            </React.Fragment>
        )
    }
}
