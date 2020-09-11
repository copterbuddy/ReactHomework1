//components
import React, { Component } from 'react'
import TopbarComponents from '../global_components/Topbar'

//call api
import axios from 'axios';

//redux
import * as pageAction from '../../actions/page-action'
import * as productAction from '../../actions/product-action'
import * as custAction from '../../actions/customer-action'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const TYPEADDRESS = {
    GETPROVINCE: 'GetProvince',
    GETDISTRICT: 'GetDistrict',
    GETSUBDISTRICT: 'GetSubDistrict',
    GETZIPCODE: 'GetZipCode'
}

class SkuAddress extends Component {


    constructor(props) {
        super(props)

        this.state = {
            Province: [],
            District: [],
            SubDistrict: [],
            ZipCode: [],

            InputName: '',
            InputTel: '',
            InputEmail: '',
            InputProvince: '',
            InputDistrict: '',
            InputSubDistrict: '',
            InputZipCode: '',
            InputAddress: '',
            InputDesc: '',
        }

    }

    componentDidMount() {
        this.loadData(TYPEADDRESS.GETPROVINCE, '', '', '');
    }

    GetDistrict = (event) => {
        const provinceId = event.target.value;
        this.setState({ InputProvince: provinceId })
        this.loadData(TYPEADDRESS.GETDISTRICT, provinceId, '', '')
    }

    GetSubDistrict = (event) => {
        const districtId = event.target.value;
        this.setState({ InputDistrict: districtId })
        this.loadData(TYPEADDRESS.GETSUBDISTRICT, '', districtId, '')
    }

    GetZipCode = (event) => {
        const subDistrictId = event.target.value;
        this.setState({ InputSubDistrict: subDistrictId })
        this.loadData(TYPEADDRESS.GETZIPCODE, this.state.InputProvince, this.state.InputDistrict, subDistrictId)
    }

    //#region Call API
    loadData = (typeAddress, provinceCode, districtCode, subDistrictCode) => {
        this.isSetState(typeAddress, [])
        //this.setState({ Province: [] });

        const tempTypeAddress = this.getAddress(typeAddress)
        const url = window.WebServiceEndpoint + tempTypeAddress

        const body = this.isGetBody(typeAddress, provinceCode, districtCode, subDistrictCode)

        axios.post(url, body, {
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            if (response.data !== null) {
                this.getDataPush(typeAddress, response);
            } else {
                console.log('response is null')
            }
        })
            .catch(function (error) {
                console.log("loadData Error", error);
            });
    }

    isSetState(typeAddress, value) {
        if (typeAddress === TYPEADDRESS.GETPROVINCE) this.setState({ Province: value })
        if (typeAddress === TYPEADDRESS.GETDISTRICT) this.setState({ District: value })
        if (typeAddress === TYPEADDRESS.GETSUBDISTRICT) this.setState({ SubDistrict: value })
        if (typeAddress === TYPEADDRESS.GETZIPCODE) this.setState({ ZipCode: value })
    }

    isGetBody(typeAddress, provinceCode, districtCode, subDistrictCode) {
        let body = []
        if (typeAddress === TYPEADDRESS.GETPROVINCE) {
            body = {
                "ProvinceCode": "",
                "Lang": "TH"
            }
        } else if (typeAddress === TYPEADDRESS.GETDISTRICT) {
            body = {
                "ProvinceCode": provinceCode,
                "Lang": "TH"
            }
        } else if (typeAddress === TYPEADDRESS.GETSUBDISTRICT) {
            body = {
                "DistrictCode": districtCode,
                "Lang": "TH"
            }
        } else if (typeAddress === TYPEADDRESS.GETZIPCODE) {
            body = {
                "ProvinceCode": provinceCode,
                "DistrictCode": districtCode,
                "SubDistrictCode": subDistrictCode,
                "Lang": "TH"
            }
        }
        return body
    }

    // isStatePush(typeAddress) {
    //     if (typeAddress === TYPEADDRESS.GETPROVINCE) return this.state.Province
    // }

    getAddress(typeAddress) {
        if (typeAddress === TYPEADDRESS.GETPROVINCE) return window.GetProvince
        if (typeAddress === TYPEADDRESS.GETDISTRICT) return window.GetDistrict
        if (typeAddress === TYPEADDRESS.GETSUBDISTRICT) return window.GetSubDistrict
        if (typeAddress === TYPEADDRESS.GETZIPCODE) return window.GetZipCode

    }

    getDataPush(typeAddress, response) {
        let data = []
        if (typeAddress === TYPEADDRESS.GETPROVINCE) {
            if (response.data.provinces.length !== 0 && response.data.Result === true) {
                for (let i = 0; i < response.data.provinces.length; i++) {
                    data.push({
                        "ProvinceCode": response.data.provinces[i].ProvinceCode,
                        "ProvinceNameTH": response.data.provinces[i].ProvinceNameTH,
                        "ProvinceNameEN": response.data.provinces[i].ProvinceNameEN,
                        "Status": response.data.provinces[i].Status,
                    });
                }

                this.isSetState(typeAddress, data)
            } else {
                console.log('response null :', response)
                {
                    this.setState({
                        txtNoData: 'ไม่พบสินค้า'
                    })
                }
            }
        } else if (typeAddress === TYPEADDRESS.GETDISTRICT) {
            if (response.data.districts.length !== 0 && response.data.Result === true) {
                for (let i = 0; i < response.data.districts.length; i++) {
                    data.push({
                        "DistrictCode": response.data.districts[i].DistrictCode,
                        "DistrictNameTH": response.data.districts[i].DistrictNameTH,
                        "DistrictNameEN": response.data.districts[i].DistrictNameEN,
                    });
                }


                this.isSetState(typeAddress, data)
            } else {
                console.log('response null :', response)
                {
                    this.setState({
                        txtNoData: 'ไม่พบสินค้า'
                    })
                }
            }
        } else if (typeAddress === TYPEADDRESS.GETSUBDISTRICT) {
            if (response.data.subDistricts.length !== 0 && response.data.Result === true) {
                for (let i = 0; i < response.data.subDistricts.length; i++) {
                    data.push({
                        "SubDistrictCode": response.data.subDistricts[i].SubDistrictCode,
                        "SubDistrictNameTH": response.data.subDistricts[i].SubDistrictNameTH,
                        "SubDistrictNameEN": response.data.subDistricts[i].SubDistrictNameEN,
                    });


                }

                this.isSetState(typeAddress, data)

            } else {
                console.log('response null :', response)
                {
                    this.setState({
                        txtNoData: 'ไม่พบสินค้า'
                    })
                }
            }
        } else if (typeAddress === TYPEADDRESS.GETZIPCODE) {
            if (response.data.zipCode.length !== 0 && response.data.Result === true) {
                console.log('myres: ', response)
                for (let i = 0; i < response.data.zipCode.length; i++) {
                    data.push({
                        "ZipCodeID": response.data.zipCode[i].ZipCodeID,
                        "ZipCode": response.data.zipCode[i].ZipCode,
                    });

                }
                this.isSetState(typeAddress, data)
            } else {
                console.log('response null :', response)
                {
                    this.setState({
                        txtNoData: 'ไม่พบสินค้า'
                    })
                }
            }
        }
    }
    //#endregion Call API

    Submit() {
        let isChkValidate = true

        const Emailpattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const Emailresult = Emailpattern.test(this.state.InputEmail);

        const Mobilepattern = /(([0-9]{3}))*([0-9]{3})*([0-9]{4})/;
        const Mobileresult = Mobilepattern.test(this.state.InputTel);

        if (Emailresult === false) {
            alert('รูปแบบ E-mail ไม่ถูกต้อง กรุณาใส่ข้อมูลใหม่');
            this.setState({ InputEmail: '' });
            isChkValidate = false
        }
        else if (Mobileresult === false) {
            alert('กรุณาใส่เบอรฺ์ติดต่อเฉพาะตัวเลขให้ครบ 10 หลัก');
            this.setState({ InputTel: '' });
            isChkValidate = false
        }
        else if (this.state.InputTel.substring(0, 1) !== '0') {
            alert('กรุณาใส่เบอรฺ์ติดต่อเริ่มต้นด้วยเลข 0');
            this.setState({ InputTel: '' });
            isChkValidate = false
        }
        else if (this.state.InputTel.substring(0, 2) === '02') {
            alert('ไม่สามารถใส่เบอรฺ์ติดต่อเริ่มต้นด้วยเลข 02 ได้ กรุณาใส่ข้อมูลใหม่');
            this.setState({ InputTel: '' });
            isChkValidate = false
        }

        //focus จาก ชื่อ ref
        // this.nameInputRef.focus()
        if (isChkValidate) this.props.history.push('../sku-summary');
    }

    //#region GetInput
    getName(event) { this.setState({ InputName: event.target.value }) }
    getTel(event) { this.setState({ InputTel: event.target.value }) }
    getEmail(event) { this.setState({ InputEmail: event.target.value }) }
    getInputAddress(event) { this.setState({ InputAddress: event.target.value }) }
    getDesc(event) { this.setState({ InputDesc: event.target.value }) }
    //#endregion end GetInput

    render() {
        const province = this.state.Province
        const district = this.state.District
        const subDistrict = this.state.SubDistrict
        const zipCode = this.state.ZipCode
        return (
            <div>
                <TopbarComponents></TopbarComponents>
                <div className="major-navbar">
                    {/* <div class="navbar-title"> */}
                        ที่อยู่สำหรับจัดส่ง
                {/* </div> */}
                </div>
                <div className="button-row">
                    <a onClick={() => { this.Submit() }}>
                        <button className="button-primary">
                            ยืนยัน
                    </button>
                    </a>
                </div>
                <div className="content content--scrollable">
                    <div className="pizza-address-title">ข้อมูลลูกค้า</div>
                    <div className="pizza-address-input">
                        <input onChange={this.getName} ref={(input) => { this.nameInputRef = input; }} type="text" placeholder="ชื่อ - นามสกุล" />
                    </div>
                    <div className="pizza-address-input">
                        <input onChange={this.getTel} ref={(input) => { this.telInputRef = input; }} type="tel" placeholder="เบอร์ติดต่อ" />
                    </div>
                    <div className="pizza-address-input">
                        <input onChange={this.getEmail} ref={(input) => { this.emailInputRef = input; }} type="email" placeholder="อีเมล" />
                    </div>
                    <div className="pizza-address-title">ข้อมูลที่อยู่</div>
                    <div className="pizza-address-input" >
                        <React.Fragment>
                            {province.length === 0 ?

                                <select><option>จังหวัด</option></select>
                                :
                                <select onChange={this.GetDistrict} >
                                    <option>จังหวัด</option>
                                    {province.map(({
                                        ProvinceCode,
                                        ProvinceNameTH,
                                        ProvinceNameEN,
                                        Status
                                    }) =>
                                        <option key={ProvinceCode} value={ProvinceCode}>{ProvinceNameTH}</option>
                                    )}
                                </select>
                            }

                        </React.Fragment>
                    </div>
                    <div className="pizza-address-input">
                        <React.Fragment>
                            {district.length === 0 ?

                                <select><option>เขต/อำเภอ</option></select>
                                :
                                <select onChange={this.GetSubDistrict} >
                                    <option>เขต/อำเภอ</option>
                                    {district.map(({
                                        DistrictCode,
                                        DistrictNameTH,
                                        DistrictNameEN,
                                    }) =>
                                        <option key={DistrictCode} value={DistrictCode}>{DistrictNameTH}</option>
                                    )}
                                </select>
                            }

                        </React.Fragment>
                    </div>
                    <div className="pizza-address-input">
                        <React.Fragment>
                            {subDistrict.length === 0 ?

                                <select><option>แขวง/ตำบล</option></select>
                                :
                                <select onChange={this.GetZipCode} >
                                    <option>แขวง/ตำบล</option>
                                    {subDistrict.map(({
                                        SubDistrictCode,
                                        SubDistrictNameTH,
                                        SubDistrictNameEN,
                                    }) =>
                                        <option key={SubDistrictCode} value={SubDistrictCode}>{SubDistrictNameTH}</option>
                                    )}
                                </select>
                            }

                        </React.Fragment>
                    </div>
                    <div className="pizza-address-input">
                        {zipCode.length === 0 ?

                            <select><option>รหัสไปรษณีย์</option></select>
                            :
                            <select >
                                <option>รหัสไปรษณีย์</option>
                                {zipCode.map(({
                                    ZipCodeID,
                                    ZipCode,
                                }) =>
                                    <option key={ZipCodeID} value={ZipCodeID}>{ZipCode}</option>
                                )}

                            </select>
                        }
                    </div>
                    <div className="pizza-address-input">
                        <input onChange={this.getInputAddress} ref={(input) => { this.addressInputRef = input; }} type="text" placeholder="บ้านเลขที่" />
                    </div>
                    <div className="pizza-address-input">
                        <textarea onChange={this.getDesc} ref={(input) => { this.descInputRef = input; }} placeholder="อธิบายข้อมูลที่อยู่เพิ่มเติม"></textarea>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => ({

})

export default connect(mapStateToProps, mapDispatchToProps)(SkuAddress);
