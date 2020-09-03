import React, { Component } from 'react'
// import TopbarComponents from '../global_components/Topbar'
import SearchTabComponent from '../global_components/SearchTab'
import SortBarComponent from '../global_components/SortBar'
import axios from 'axios';
import $ from 'jquery'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topBarSrc: require('../assets/image/banner3.jpg'),
            typeSort: 'List',
            txtSearch : 'test',

            JsonResponse: [],
            index: 1,
            screenWidth: 0
        }
        window.addEventListener("resize",this.updateScreenWidth);

        // bind callback ที่ใช้
        this.getTypeSortCallback = this.getTypeSortCallback.bind(this)
        this.getTxtCallback = this.getTxtCallback.bind(this)
    }

    updateScreenWidth = () =>{
        this.setState({screenWidth: window.innerWidth})
    }

    getTypeSortCallback(sort){
        if(this.state.typeSort != sort){
            sort == "List" ? 
            this.setState({topBarSrc: require('../assets/image/banner3.jpg')}) :
            this.setState({topBarSrc: require('../assets/image/banner.jpg')})
        }
        this.setState({ typeSort: sort });

        
    }

    getTxtCallback(txtSearch){
        this.setState({txtSearch: txtSearch})
    }

    componentDidMount() {
        //ใช้งานjquery
        $(document).ready(function(){
            $('body').css('background','wheat');
        });
        this.loadData();
    }
   
    async loadData() {
        const url = window.WebServiceEndpoint + 'GetAllProduct';

        const body = JSON.stringify({
            PartnerID: "M004"
            , Page_Index: this.state.index
            , Page_Size: window.PageSize
        });

        console.log('dsuhcv',body)

       await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
                if (response.data !== null) {
                    console.log('response :',response)
                    if (this.state.round === 0) {
                        console.log('response :0 item')
                        this.setState({ JsonResponse: response.data.products, index: 1, round: 1 });
                    }
                    else {
                        console.log('response :3')
                        let data = this.state.JsonResponse;
                        for (let i = 0; i < response.data.products.length; i++)
                            data.push({
                                "ProductID": response.data.products[i].ProductID,
                                "ProductCatEN": response.data.products[i].ProductCatEN,
                                "ProductCatTH": response.data.products[i].ProductCatTH,
                                "ProductNameEN": response.data.products[i].ProductNameEN,
                                "FullPrice": response.data.products[i].FullPrice,
                                "Price": response.data.products[i].Price,
                                "ProductImgURL_EN": response.data.products[i].ProductImgURL_EN,
                                "ProductImgURL_TH": response.data.products[i].ProductImgURL_TH,
                                "SKU_ID": response.data.products[i].SKU_ID
                            });
                        this.setState({ JsonResponse: data, index: this.state.index + 1 });
                    }
                }
            })
            .catch(function (error) {
                console.log("loadData Error", error);
            });
            console.log('Response Obj :',this.state.JsonResponse)
    }

    render() {

        
        const products = this.state.JsonResponse;
        const screenWidth = this.state.screenWidth;
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
                        topbarText={this.state.TopbarText}
                        txtSearch={this.getTxtCallback}
                         />

                    <SortBarComponent
                        textHeadSort={'สินค้าทั้งหมด'}
                        sortCallback={this.getTypeSortCallback}
                    />

                    {/* <div>{this.state.typeSort}</div> */}
                    {/* product */}
                    <div className=""
                            style = {{ gridTemplateColumns: screenWidth <= 500 ?  'repeat(2, 1fr)' : 'repeat(3, 1fr)'}}>
                                {products.map(({
                                    ProductId,
                                    ProductCatEN,
                                    Price,
                                    ProductImgURL_TH
                                }) =>
                                    <div key={ProductId}>
                                        <div className="productlist-product">
                                            <div className="productlist-product-image">
                                                <img src={ProductImgURL_TH} />
                                            </div>
                                            <div className="productlist-product-data">
                                                <div className="productlist-product-data-title">
                                                    {ProductCatEN}
                                                </div>
                                                <div className="productlist-product-data-price">{Price} บาท</div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <button onClick={() => this.loadData()}>Load More</button>

                </center>
            </React.Fragment>
        )
    }
}
