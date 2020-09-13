//components
import React, { Component } from 'react'
import TopbarComponents from '../global_components/Topbar'

//call api
import axios from 'axios';

//redux
import * as pageAction from '../../actions/page-action';
import * as productAction from '../../actions/product-action'
import * as customerAction from '../../actions/customer-action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

class SkuSummary extends Component {


    componentDidMount() {
        this.props.pageAction.setPageID(3);
    }

    onClickToAddress = () => {
        this.props.history.push('../sku-address');
    }

    deleteProduct = (event) => {
        this.props.productAction.setProductID(0)
        this.props.productAction.setProductList([])
        event.preventDefault();


    }

    dontGoLink = (event) => {
        event.preventDefault();
    }

    PriceSummary(price){
        let sum = price - 100
        return sum.toLocaleString('th-TH')
    }

    render() {

        const productList = this.props.Product.productList;
        const productId = this.props.Product.productID;
        const cusDataList = this.props.Customer.CusData;

        return (
            <React.Fragment>
                <div class="layout">
                    <TopbarComponents></TopbarComponents>
                    <div className="major-navbar">
                        <div className='navbar-title'>
                            สรุปรายการ
                        </div>
                    </div>
                    <div className="button-row">
                        <a href={this.dontGoLink}>
                            <button className="button-primary">
                                ชำระเงิน
                    </button>
                        </a>
                    </div>
                    <div className="content content--scrollable">
                        <div className="pizza-detail-title" >ที่อยู่สำหรับจัดส่ง</div>
                        <div className="pizza-address-card">
                            <div className="pizza-address-card-icon"></div>
                            {this.props.Customer.CusData.length === 0 ?
                                // ไม่มีที่อยู่
                                <React.Fragment>
                                    <div className="pizza-address-card-name">
                                        ระบุที่อยู่จัดส่ง
                        </div>
                                    <a onClick={() => { this.onClickToAddress() }}>

                                        <div className="pizza-address-card-action">
                                            เลือกที่อยู่อื่น
                                </div>
                                    </a>
                                </React.Fragment> :
                                // มีที่อยู่
                                <React.Fragment>
                                    {cusDataList.map(({
                                        Fullname,
                                        Tel,
                                        Email,
                                        Province,
                                        District,
                                        SubDistrict,
                                        Zipcode,
                                        Address,
                                        Description,
                                    }) =>

                                        <React.Fragment>
                                            <div className="pizza-address-card-name">
                                                {Fullname}
                                            </div>
                                            <a onClick={() => { this.onClickToAddress() }}>

                                                <div className="pizza-address-card-action">
                                                    เลือกที่อยู่อื่น
                                            </div>
                                            </a>
                                            <div className="pizza-address-card-mobile">
                                                {Tel}
                                            </div>
                                            <div className="pizza-address-card-email">
                                                {Email}
                                </div>
                                            <div className="pizza-address-card-address">
                                                {SubDistrict} {District} {Province} {Zipcode}
                                </div>
                                            <div className="pizza-address-card-additional-title">
                                                {Address}
                                </div>
                                            <div className="pizza-address-card-additional-detail">
                                                {Description}
                                </div>

                                        </React.Fragment>
                                    )}
                                </React.Fragment>
                            }

                        </div>
                        <div className="pizza-detail-title">รายการสินค้า</div>
                        {
                            productId === 0 ?
                                // ไม่มีไอเท็ม
                                <React.Fragment>
                                    <div className="pizza-item-card">
                                        <div className="pizza-item-card-head">
                                            {/* <div className="pizza-item-card-image"> */}
                                            {/* <img src={productList[0].ProductImgURL_TH} /> */}
                                            {/* </div> */}
                                            <div className="pizza-item-card-title">
                                                {/* Tokyo Disney Resort<br />
                            7-Day Ticket : DisneySea */}
                                                {/* {productList[0].ProductNameEN} */}
                                            </div>
                                            <div className="pizza-item-card-remarks">
                                                {/* <span style={{
                                                    color: "#00a6ff",
                                                    fontSize: "8px",
                                                    fontWeight: "200",
                                                    letterSpacing: '-0.2px',
                                                    backgroundColor: '#E3F6FF',
                                                    padding: '2px 4px',
                                                    borderRadius: '1px',
                                                }}>
                                                    * {productList[0].Remark}
                                                </span> */}
                                            </div>
                                            <div className="pizza-item-card-commands">
                                                {/* <a className="pizza-item-card-commands-delete" href="#" onClick={this.deleteProduct}>ลบรายการ</a> */}

                                                <span className="pizza-item-card-commands-detail">รายละเอียดสินค้า</span>
                                            </div>
                                            <div className="pizza-item-card-total">
                                                บาท
                        </div>
                                            <div className="pizza-item-card-quantity">จำนวน </div>
                                        </div>
                                        <div className="pizza-item-card-detail">
                                            <div className="pizza-item-card-detail-text">
                                                {/* <p dangerouslySetInnerHTML={{ __html: productList[0].ProductDescTH }} /> */}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pizza-summary">
                                        <div className="pizza-summary-row">
                                            <div className="pizza-summary-row-title">ค่าจัดส่ง</div>
                                            <div className="pizza-summary-row-detail">บาท</div>
                                        </div>
                                        <div className="pizza-summary-row">
                                            <div className="pizza-summary-row-title">ส่วนลดพิเศษ</div>
                                            {/* <div className="pizza-summary-row-detail pizza-redtext">- 100 บาท</div> */}
                                        </div>
                                        <div className="pizza-summary-row">
                                            <div className="pizza-summarybox-title">
                                                ราคาทั้งหมด
                        </div>
                                            <div className="pizza-summarybox-total">
                                                {/* {productList[0].Price - 100} บาท */}
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                                :
                                //  มีไอเทม
                                <React.Fragment>
                                    <div className="pizza-item-card">
                                        <div className="pizza-item-card-head">
                                            <div className="pizza-item-card-image">
                                                <img src={productList[0].ProductImgURL_TH} />
                                            </div>
                                            <div className="pizza-item-card-title">
                                                {/* Tokyo Disney Resort<br />
                            7-Day Ticket : DisneySea */}
                                                {productList[0].ProductNameEN}
                                            </div>
                                            <div className="pizza-item-card-remarks" style={{
                                                marginRight: '80px'
                                            }}>
                                                <span style={{
                                                    color: "#00a6ff",
                                                    fontSize: "8px",
                                                    fontWeight: "200",
                                                    letterSpacing: '-0.2px',
                                                    backgroundColor: '#E3F6FF',
                                                    padding: '2px 4px',
                                                    borderRadius: '1px',
                                                }}>
                                                    * {productList[0].Remark}
                                                </span>
                                            </div>
                                            <div className="pizza-item-card-commands">
                                                <a className="pizza-item-card-commands-delete" href="#" onClick={this.deleteProduct}>ลบรายการ</a>
                            |
                            <span className="pizza-item-card-commands-detail">รายละเอียดสินค้า</span>
                                            </div>
                                            <div className="pizza-item-card-total">
                                                {productList[0].Price.toLocaleString('th-TH')} บาท
                        </div>
                                            <div className="pizza-item-card-quantity">จำนวน 1 ชิ้น</div>
                                        </div>
                                        <div className="pizza-item-card-detail">
                                            <div className="pizza-item-card-detail-text">
                                                <p dangerouslySetInnerHTML={{ __html: productList[0].ProductDescTH }} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="pizza-summary">
                                        <div className="pizza-summary-row">
                                            <div className="pizza-summary-row-title">ค่าจัดส่ง</div>
                                            <div className="pizza-summary-row-detail">0 บาท</div>
                                        </div>
                                        <div className="pizza-summary-row">
                                            <div className="pizza-summary-row-title">ส่วนลดพิเศษ</div>
                                            <div className="pizza-summary-row-detail pizza-redtext">- 100 บาท</div>
                                        </div>
                                        <div className="pizza-summary-row">
                                            <div className="pizza-summarybox-title">
                                                ราคาทั้งหมด
                        </div>
                                            <div className="pizza-summarybox-total">
                                                {this.PriceSummary(productList[0].Price)} บาท
                        </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                        }
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Product: state.Product,
    Customer: state.Customer,
})

const mapDispatchToProps = dispatch => ({
    pageAction: bindActionCreators(pageAction, dispatch),
    productAction: bindActionCreators(productAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkuSummary);
