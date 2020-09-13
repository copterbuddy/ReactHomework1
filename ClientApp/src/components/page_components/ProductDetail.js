//components
import React, { Component } from 'react'
import TopbarComponents from '../global_components/Topbar'

//call api
import axios from 'axios';

//redux
import * as pageAction from '../../actions/page-action';
import * as productAction from '../../actions/product-action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class ProductDetail extends Component {

    componentDidMount() {
        this.props.pageAction.setPageID(2);

        this.loadData()
    }

    async loadData() {
        // this.setState({ productList: [] });
        this.props.productAction.setProductList([]);

        const url = window.RealWebServiceEndpoint + 'GetProduct/' + this.props.Product.productID

        await axios.get(url, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            //console.log('response on get : ',response.data)
            if (response.data !== null) {
                //if (this.state.round === 0) {
                // this.setState({ productList: response.data.products, index: 1, round: 1 });
                //this.props.productAction.setProductList(response.data.products);
                //}
                //else {

                if (response.data.Result !== false) {
                    let data = [];
                    data.push({
                        "ProductID": response.data.ProductID,
                        "ProductNameEN": response.data.ProductNameEN,
                        "ProductNameTH": response.data.ProductNameTH,
                        "FullPrice": response.data.FullPrice,
                        "Price": response.data.Price,
                        "ProductImgURL_EN": response.data.ProductImgURL_EN,
                        "ProductImgURL_TH": response.data.ProductImgURL_TH,
                        "DeliveryCharge": response.data.DeliveryCharge,
                        "Remark": response.data.Remark,
                        "ProductDescEN": response.data.ProductDescEN,
                        "ProductDescTH": response.data.ProductDescTH,
                        "SkuEN": response.data.SkuEN,
                        "SkuTH": response.data.SkuTH,
                        "Is_Sku": response.data.Is_Sku,
                        "Result": response.data.Result,
                        "ErrorCode": response.data.ErrorCode,
                        "ErrorDesc": response.data.ErrorDesc
                    });
                    // this.setState({ JsonResponse: data, index: this.state.index + 1 });
                    //this.setState({ productList: data, index: this.state.index });
                    this.props.productAction.setProductList(data);
                    // console.log('Map data is :', this.props.Product.productList)
                } else {
                    console.log('response null :', response)
                    {
                        this.setState({
                            txtNoData: 'ไม่พบสินค้า'
                        })
                    }
                }
                //}
            } else {
                console.log('response is null')
            }
        })
            .catch(function (error) {
                console.log("loadData Error", error);
            });
        //console.log('Response Obj :', this.props.Product.productList)
    }

    monetFormat() {
        return null
    }

    OnClickGoToSummary = () => {
        this.props.history.push('../sku-summary');
    }

    render() {
        const productList = this.props.Product.productList[0];
        // let index = 0

        // for (let i = 0; i < productList.length; i++) {
        //     if (productId === productList[i].productId) {
        //         index = i;
        //         break;
        //     }

        // }

        return (
            <React.Fragment>
                <div class="layout">
                    <TopbarComponents></TopbarComponents>
                    <div className="button-row">
                        {/* onClick="location.href='sku-summary.html'" อยู่ใน button */}
                        <button className="button-primary" onClick={() => this.OnClickGoToSummary()}>
                            เลือกสินค้า
                    </button>
                    </div>
                    {this.props.Product.productList.length === 0 ? <h3>ไม่พบสินค้า</h3>
                        :
                        <React.Fragment>
                            <div>

                                <div key={productList.ProductID} className="content">

                                    <div className="sku-product-header">

                                        <div className="sku-product-slider">
                                            <div>
                                                <img src={productList.ProductImgURL_TH} />
                                            </div>
                                        </div>

                                    </div>

                                    <div className="sku-product-data">
                                        <div className="sku-product-title">
                                            {productList.ProductNameTH}
                                        </div>

                                        <div className="sku-product-price">
                                            {productList.Price.toLocaleString('th-TH')} บาท
                            </div>

                                        <div className="sku-product-remark" style={{ padding: '3px 0px' }}>
                                            <span style={{
                                                color: '#00a6ff',
                                                fontSize: '8px',
                                                fontWeight: '500',
                                                letterSpacing: '-0.2px',
                                                backgroundColor: '#E3F6FF',
                                                padding: '2px 4px',
                                                borderRadius: '1px',
                                            }}>
                                                * {productList.Remark}
                                            </span>
                                        </div>

                                        <div className="sku-product-remark" style={{ padding: '3px 0px' }}>
                                            <span style={{
                                                color: '#15dcab',
                                                fontSize: '8px',
                                                fontWeight: '500',
                                                letterSpacing: '-0.2px',
                                                backgroundColor: '#E8FCF7',
                                                padding: '2px 4px',
                                                borderRadius: '1px'
                                            }}>
                                                <img src={require("../assets/images/sku-icon-truck@2x.png")} style={{
                                                    height: '17px',
                                                    verticalAlign: 'middle'
                                                }} /> ฟรี! ค่าจัดส่ง
                                </span>
                                        </div>
                                    </div>

                                    <div className="sku-product-detail">

                                        <div className="sku-product-detail-title">รายละเอียดสินค้า</div>

                                        <div className="sku-product-detail-content">
                                            <p dangerouslySetInnerHTML={{ __html: productList.ProductDescTH }} />
                                        </div>

                                    </div>

                                </div>

                            </div>
                        </React.Fragment>
                    }
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Product: state.Product
})

const mapDispatchToProps = dispatch => ({
    pageAction: bindActionCreators(pageAction, dispatch),
    productAction: bindActionCreators(productAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
