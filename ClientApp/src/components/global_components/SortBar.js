import React, { Component } from 'react'
import { ButtonGroup } from 'react-bootstrap';
import $ from 'jquery'

export default class SortBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            srcCenter: this.props.typeSort,
            srcList: require('../assets/image/list_icon_active.png'),
            srcGrid: require('../assets/image/grid_icon_unactive.png')
        }
        // bind callback ที่่ใช้
        this.reloadSortClicked = this.reloadSortClicked.bind(this)

    }

    reloadSortClicked(typeSort) {
        const { sortCallback } = this.props
        if (sortCallback !== undefined) {
            if (this.state.srcCenter != typeSort) {
                this.setState({ srcCenter: typeSort })
                if (typeSort == 'Grid') {
                    this.setState({ srcList: require('../assets/image/list_icon_unactive.png') })
                    this.setState({ srcGrid: require('../assets/image/grid_icon_active.png') })
                } else {
                    this.setState({ srcList: require('../assets/image/list_icon_active.png') })
                    this.setState({ srcGrid: require('../assets/image/grid_icon_unactive.png') })
                }
                sortCallback(typeSort);
            }

        }

    }

    render() {
        return (
            <React.Fragment>
                {/* <div className='form-control'> */}
                    <div className={'d-flex align-items-center myHeader'}>
                        <label className='mr-auto'>{this.props.textHeadSort}</label>

                        {/* <div className="p-2 block-example border border-0 border-dark"> */}
                        <div className="myBorderColor">
                            
                            <img className='' onClick={() => this.reloadSortClicked('List')} src={this.state.srcList} width='30px' height='30px' />

                            <img className='' onClick={() => this.reloadSortClicked('Grid')} src={this.state.srcGrid} width='30px' height='30px' />
                        </div>
                    </div>

                    {/* {this.props.typeSort} */}
                {/* </div> */}
            </React.Fragment>
        )
    }
}
