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

class SkuSummary extends Component {
    

    componentDidMount() {
        this.props.pageAction.setPageID(3);

        // this.loadData()
    }

    onClickToAddress = () => {
        this.props.history.push('../sku-address');
    }

    

    render() {
        return (
            <React.Fragment>
                <div>
                    <TopbarComponents></TopbarComponents>
                    <div className="major-navbar">
                        {/* <div className=' navbar-title'> */}
                            สรุปรายการ
                        {/* </div> */}
                    </div>
                    <div className="button-row">
                        <a href="sku-summary.html">
                            <button className="button-primary">
                                ชำระเงิน
                    </button>
                        </a>
                    </div>
                    <div className="content content--scrollable">
                        <div className="pizza-detail-title">ที่อยู่สำหรับจัดส่ง</div>
                        <div className="pizza-address-card">
                            <div className="pizza-address-card-icon"></div>
                            <div className="pizza-address-card-name">
                                ระบุที่อยู่จัดส่ง
                        </div>
                            <a  onClick={() => {this.onClickToAddress()}}>
                                <div className="pizza-address-card-action">
                                    เลือกที่อยู่อื่น
                                </div>
                            </a>
                            <div className="pizza-address-card-mobile">
                                099 999 9999
                    </div>
                            <div className="pizza-address-card-email">
                                nalida@krungsri.com
                    </div>
                            <div className="pizza-address-card-address">
                                295/44 ถนน พระราม3 แขวง บางคอแหลม เขต บางคอแหลม กรุงเทพมหานคร 10120
                    </div>
                            <div className="pizza-address-card-additional-title">
                                ข้อมูลที่อยู่เพิ่มเติม
                    </div>
                            <div className="pizza-address-card-additional-detail">
                                ปากซอยอยู่มีเซเว่นอยู่ ตรงข้ามเซเว่นเป็นบ้านสำหรับจัดส่ง
                    </div>

                        </div>
                        <div className="pizza-detail-title">รายการสินค้า</div>
                        <div className="pizza-item-card">
                            <div className="pizza-item-card-head">
                                <div className="pizza-item-card-image">
                                    <img src="images/temp-sku-product1.jpg" />
                                </div>
                                <div className="pizza-item-card-title">
                                    Tokyo Disney Resort<br />
                            7-Day Ticket : DisneySea
                        </div>
                                <div className="pizza-item-card-remarks">
                                    <span style={{
                                        color: "#00a6ff",
                                        fontSize: "8px",
                                        fontWeight: "200",
                                        letterSpacing: '-0.2px',
                                        backgroundColor: '#E3F6FF',
                                        padding: '2px 4px',
                                        borderRadius: '1px',
                                    }}>
                                        * ใช้เวลาดำเนินการ 5-7 วัน หลังจากชำระเงิน
                            </span>
                                </div>
                                <div className="pizza-item-card-commands">
                                    <a className="pizza-item-card-commands-delete" href="#">ลบรายการ</a>
                            |
                            <span className="pizza-item-card-commands-detail">รายละเอียดสินค้า</span>
                                </div>
                                <div className="pizza-item-card-total">
                                    15,000 บาท
                        </div>
                                <div className="pizza-item-card-quantity">จำนวน 1 ชิ้น</div>
                            </div>
                            <div className="pizza-item-card-detail">
                                <div className="pizza-item-card-detail-text">
                                    <strong>ประเภทบัตร : 1 วัน ระบุวันเข้าสวนสนุก</strong><br />
                            - ท่านจำเป็นต้องระบุวันและสถานที่เข้า จึงจะรับประกันการ
                            เข้าสวนสนุก<br />
                            - สามารถออก E-Ticket ได้ภายใน 90 วันนับจากวันที่สั่งซื้อ
                            ยกตัวอย่างเช่น สั่งซื้อวันที่ 01 มี.ค.62 จะสามารถออก E-Ticket
                            ได้ถึงวันที่ 30 พ.ค.62<br />
                            - ถ้าลูกค้าไม่สามารถเข้าสวนสนุกตามวันที่ระบุไว้หน้าบัตร
                            จะไม่สามารถใช้ตั๋วใบเดิมไปเข้าวันอื่นได้ <br />
                            - เมื่อสั่งซื้อสินค้าเรียบร้อยแล้ว กรุณาติดต่อเจ้าหน้าที่ผ่านช่องทาง
                            Chat เพื่อแจ้งวันที่ต้องการเข้าสวนสนุก<br />
                            - จำเป็นต้องใช้บัตรนี้ในการออก Fast Pass ในสวนสนุก<br />
                                    <br />
                            * หมายเหตุ เมื่อออกบัตรให้เรียบร้อยแล้ว ไม่สามารถ
                            เปลี่ยนแปลงได้อีก
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
                                    14,900 บาท
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({
    pageAction: bindActionCreators(pageAction, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(SkuSummary);
