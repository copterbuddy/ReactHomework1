import React, { Component } from 'react'
// import TopbarComponents from '../global_components/Topbar'
import SearchTabComponent from '../global_components/SearchTab'
import SortBarComponent from '../global_components/SortBar'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            TopbarText: 'H.I.S Service',
            typeSort: 'List'
        }
    }

    loadData() {
        this.setState({ TopbarText: 'อิ้อิ้' });
    }

    render() {
        return (
            <React.Fragment>
                <center>
                    {/* <TopbarComponents topbarText = {this.state.TopbarText} /> */}
                    <div className='main-banner'>
                        <img src={require('../assets/image/banner3.jpg')} style={{ width: '-webkit-fill-available' }} />
                        {/* <button onClick={() => this.loadData()}>Load More</button> */}
                    </div>
                    <SearchTabComponent
                        topbarText={this.state.TopbarText} />
                    <SortBarComponent
                        textHeadSort={'สินค้าทั้งหมด'}
                        typeSort={this.state.typeSort}

                    />

                    <div>{this.state.typeSort}</div>

                </center>
            </React.Fragment>
        )
    }
}
