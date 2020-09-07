import React, { Component } from 'react'
import TopbarComponents from '../global_components/Topbar'
import SearchTabComponent from '../global_components/SearchTab'
import SortBarComponent from '../global_components/SortBar'
import axios from 'axios';
import $ from 'jquery'

export default class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {
            topTxt : 'H.I.S. Service',
            topBarSrc: require('../assets/image/banner3.jpg'),
            typeSort: 'List',
            txtSearch: '',
            timeouts: [],
            txtNoData: 'Loading...',
            JsonResponse: [],
            index: 1,
            screenWidth: 0,
            langData: 0
        }
        window.addEventListener("resize", this.updateScreenWidth);

        // bind callback ที่ใช้
        this.getTypeSortCallback = this.getTypeSortCallback.bind(this)
        this.getTxtCallback = this.getTxtCallback.bind(this)
    }

    updateScreenWidth = () => {
        this.setState({ screenWidth: window.innerWidth })
    }

    getTypeSortCallback(sort) {
        if (this.state.typeSort != sort) {
            sort == "List" ?
                this.setState({ topBarSrc: require('../assets/image/banner3.jpg') }) :
                this.setState({ topBarSrc: require('../assets/image/banner.jpg') })
        }
        this.setState({ typeSort: sort });


    }

    getTxtCallback(txtSearch) {

        if (txtSearch !== undefined) {
            this.setState({ 
                txtSearch: txtSearch ,
                txtNoData: 'Loading...'
            })

            clearTimeout(this.state.timeouts);

            this.setState({
                timeouts: setTimeout(() => {
                    this.loadData(txtSearch)
                }, 1500)
            })
        }

    }

    componentDidMount() {
        //ใช้งานjquery
        $(document).ready(function () {
            $('body').css('background', 'white');
        });
        this.loadData('');
    }

    async loadData(txtSearch) {

        this.setState({ JsonResponse: [] });

        const url = window.WebServiceEndpoint + this.getURL(txtSearch != null ? txtSearch : '')

        const body = this.getBody(txtSearch != null ? txtSearch : '')

        // console.log('body: ', body)

        await axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                console.log('response :', response)
                if (this.state.round === 0) {
                    this.setState({ JsonResponse: response.data.products, index: 1, round: 1 });
                }
                else {
                    let data = this.state.JsonResponse;
                    if (response.data.products.length !== 0) {
                        {this.setState({
                            txtNoData: 'Loading...'
                        })}

                        for (let i = 0; i < response.data.products.length; i++)
                            data.push({
                                "ProductID": response.data.products[i].ProductID,
                                "ProductCatEN": response.data.products[i].ProductCatEN,
                                "ProductCatTH": response.data.products[i].ProductCatTH,
                                "ProductNameEN": response.data.products[i].ProductNameEN,
                                "ProductNameTH": response.data.products[i].ProductNameTH,
                                "FullPrice": response.data.products[i].FullPrice,
                                "Price": response.data.products[i].Price,
                                "ProductImgURL_EN": response.data.products[i].ProductImgURL_EN,
                                "ProductImgURL_TH": response.data.products[i].ProductImgURL_TH,
                                "SKU_ID": response.data.products[i].SKU_ID
                            });
                        // this.setState({ JsonResponse: data, index: this.state.index + 1 });
                        this.setState({ JsonResponse: data, index: this.state.index });
                    } else {
                        console.log('response null :', response)
                        {this.setState({
                            txtNoData: 'ไม่พบสินค้า'
                        })}
                    }
                }
            } else {
                console.log('response is null')
            }
        })
            .catch(function (error) {
                console.log("loadData Error", error);
            });
        console.log('Response Obj :', this.state.JsonResponse)
    }

    getURL = (txtSearch) => {

        let getAll = 'GetAllProduct'

        let serach = 'GetProductByName'

        txtSearch == '' | null ? txtSearch = getAll : txtSearch = serach
        return txtSearch
    }

    getBody = (txtSearch) => {

        let getAll = JSON.stringify({
            PartnerID: "M004"
            , Page_Index: this.state.index
            , Page_Size: window.PageSize
        });

        let serach = JSON.stringify({
            PartnerID: "M004"
            , SearchText: txtSearch
            , Lang: 'TH'
        });

        txtSearch == '' | null ? txtSearch = getAll : txtSearch = serach
        return txtSearch
    }


    render() {


        const products = this.state.JsonResponse;
        const screenWidth = this.state.screenWidth;
        const defPic = "https://dev.trovefin.com/MKP.Service.Product/images/product/01%20-%20All%20Area/01---All-Area_01.jpg";
        const defName = "Japan Rail Pass (All Area) Ordinary Car (7 Days)";
        const defPrice = "7999";

        const allProductSort = this.state.typeSort == 'List' ? 'mylist-products' : 'productlist-products';
        const productSort = this.state.typeSort == 'List' ? 'mylist-product' : 'productlist-product';
        const allImageSort = this.state.typeSort == 'List' ? 'mylist-product-image' : 'productlist-product-image';
        const allProductDetail = this.state.typeSort == 'List' ? 'mylist-product-data' : 'productlist-product-data';
        const allProductDetailLittle = this.state.typeSort == 'List' ? 'mylist-product-data-title' : 'productlist-product-data-title';
        const allProductPrice = this.state.typeSort == 'List' ? "mylist-product-data-price" : "productlist-product-data-price";

        return (

            <React.Fragment>
                {/* <center> */}
                    <div className='m-2' >
                        <TopbarComponents topTxt={this.state.topTxt} ></TopbarComponents>

                        <div className='main-banner '>
                            <img src={this.state.topBarSrc} style={{ width: '-webkit-fill-available' }} />
                        </div>

                        <div className='mt-3'>
                        <SearchTabComponent
                            topbarText={this.state.TopbarText}
                            txtSearch={this.getTxtCallback}
                        />
                        </div>

                        <div className='mt-3'>
                        <SortBarComponent
                            textHeadSort={'สินค้าทั้งหมด(' + products.length + ')'}
                            sortCallback={this.getTypeSortCallback}
                        />
                        </div>

                        <div className='mt-2'>
                        {products.length === 0 ? <h3>{this.state.txtNoData}</h3>
                            :
                            <React.Fragment>
                                <div
                                    className={"mt-4 "+allProductSort}
                                    // style={{ borderWidth : '2px'}}>
                                    style={{ gridTemplateColumns: screenWidth <= 500 }}>
                                    {products.map(({
                                        ProductID,
                                        ProductCatEN,
                                        ProductCatTH,
                                        ProductNameEN,
                                        ProductNameTH,
                                        FullPrice,
                                        Price,
                                        ProductImgURL_EN,
                                        ProductImgURL_TH,
                                        SKU_ID
                                    }) =>
                                        <div key={ProductID}>
                                            <div className={productSort}>
                                                <div className={allImageSort}>
                                                    <img src={ProductNameTH.includes("Test") ? defPic : ProductImgURL_TH}  />
                                                </div>
                                                <div className={allProductDetail}>
                                                    <div className={allProductDetailLittle}>
                                                        {ProductNameTH.includes("Test") ? defName : ProductNameTH}
                                                    </div>
                                                    <div className={allProductPrice}>{ProductNameTH.includes("Test") ? defPrice : Price} บาท</div>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </React.Fragment>
                        }
                        </div>
                    </div>
                {/* </center> */}
            </React.Fragment>

        )
    }
}
