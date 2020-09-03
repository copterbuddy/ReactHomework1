import React, { Component } from 'react'
// import TopbarComponents from '../global_components/Topbar'
import SearchTabComponent from '../global_components/SearchTab'
import SortBarComponent from '../global_components/SortBar'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topBarSrc: require('../assets/image/banner3.jpg'),
            typeSort: 'List'
        }
        // bind callback ที่ใช้
        this.getDataCallback = this.getDataCallback.bind(this)
    }

    getDataCallback(sort){
        if(this.state.typeSort != sort){
            sort == "List" ? 
            this.setState({topBarSrc: require('../assets/image/banner3.jpg')}) :
            this.setState({topBarSrc: require('../assets/image/banner.jpg')})
        }
        this.setState({ typeSort: sort });

        
    }

   

    render() {
        // const {post} = this.props
        return (
            <React.Fragment>
                <center>
                    {/* <TopbarComponents topbarText = {this.state.TopbarText} /> */}
                    <div className='main-banner'>
                        <img src={this.state.topBarSrc} style={{ width: '-webkit-fill-available' }} />
                        {/* <button onClick={() => this.loadData()}>Load More</button> */}
                    </div>
                    <SearchTabComponent
                        topbarText={this.state.TopbarText} />
                    <SortBarComponent
                        textHeadSort={'สินค้าทั้งหมด'}
                        sortCallback={this.getDataCallback}
                    />

                    <div>{this.state.typeSort}</div>

                </center>
            </React.Fragment>
        )
    }
}
