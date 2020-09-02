import React, { Component } from 'react'
// import TopbarComponents from '../global_components/Topbar'
import SearchTabComponent from '../global_components/SearchTab'
import SortBarComponent from '../global_components/SortBar'

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            TopbarText: 'H.I.S Service',
            textHeadSort: 'สินค้าทั้งหมด'
        }
    }

    loadData(){
        this.setState({TopbarText: 'อิ้อิ้'});
    }

    textSortHeadReload(){
        this.setState({textHeadSort: 'สินค้าทั้งหมด'});
    }

    render() {
        return (
            <React.Fragment>
                <center>
                    {/* <TopbarComponents topbarText = {this.state.TopbarText} /> */}
                    <div className='main-banner'>
                        <img src={require('../assets/image/banner.jpg')} style={{ width: '-webkit-fill-available' }}/>
                        {/* <button onClick={() => this.loadData()}>Load More</button> */}
                    </div>
                    <SearchTabComponent topbarText = {this.state.TopbarText} />
                    <SortBarComponent textHeadSort = {this.state.textHeadSort} />
                </center>
            </React.Fragment>
        )
    }
}
