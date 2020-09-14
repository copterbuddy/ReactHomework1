//components
import React, { Component } from 'react'
import TopbarComponents from '../global_components/Topbar'

//call api
import axios from 'axios';

//redux
import * as pageAction from '../../actions/page-action'
import * as productAction from '../../actions/product-action'
import * as customerAction from '../../actions/customer-action'
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

            InputProvinceId: '',
            InputDistrictId: '',
            InputSubDistrictId: '',

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
        this.Submit = this.Submit.bind(this)
    }

    componentDidMount() {
        this.props.pageAction.setPageID(4);
        this.loadData(TYPEADDRESS.GETPROVINCE, '', '', '');
    }

    GetDistrict = (event) => {
        //getId
        const provinceId = event.target.value;

        //getName
        var index = event.nativeEvent.target.selectedIndex;
        const provinceName = event.nativeEvent.target[index].text


        this.setState({
            InputProvinceId: provinceId,
            InputProvince: provinceName
        })


        this.loadData(TYPEADDRESS.GETDISTRICT, provinceId, '', '')
    }

    GetSubDistrict = (event) => {
        //getId
        const districtId = event.target.value;
        //getName
        var index = event.nativeEvent.target.selectedIndex;
        const districteName = event.nativeEvent.target[index].text

        this.setState({
            InputDistrictId: districtId,
            InputDistrict: districteName
        })

        this.loadData(TYPEADDRESS.GETSUBDISTRICT, '', districtId, '')
    }

    GetZipCode = (event) => {
        //getId
        const subDistrictId = event.target.value;
        //getName
        var index = event.nativeEvent.target.selectedIndex;
        const subDistrictName = event.nativeEvent.target[index].text

        this.setState({
            InputSubDistrictId: subDistrictId,
            InputSubDistrict: subDistrictName
        })

        this.loadData(TYPEADDRESS.GETZIPCODE, this.state.InputProvinceId, this.state.InputDistrictId, subDistrictId)
    }

    GetAll = (event) => {
        //getName
        var index = event.nativeEvent.target.selectedIndex;
        const zipCode = event.nativeEvent.target[index].text

        this.setState({
            InputZipCode: zipCode
        })
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
        else if (typeAddress === TYPEADDRESS.GETDISTRICT) this.setState({ District: value })
        else if (typeAddress === TYPEADDRESS.GETSUBDISTRICT) this.setState({ SubDistrict: value })
        else if (typeAddress === TYPEADDRESS.GETZIPCODE) this.setState({ ZipCode: value })
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

    IsnullOrEmty(value) {
        let chkValue = true
        if (value === undefined || value === '' || value.length === 0 || value === null) chkValue = false
        return chkValue
    }

    Submit() {
        let isChkValidate = true

        //Check Require
        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputName);
            if (!isChkValidate) {
                this.refInputName.focus()
                alert('กรุณาใส่ชื่อ')
            }
        }

        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputTel);
            if (!isChkValidate) {
                this.refInputTel.focus()
                alert('กรุณาใส่เบอร์โทรศัพท์')
            }
        }

        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputEmail);
            if (!isChkValidate) {
                this.refInputEmail.focus()
                alert('กรุณาใส่อีเมล')
            }
        }

        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputProvince);
            if (!isChkValidate)
                alert('กรุณาเลือกจากหวัด')
        }

        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputDistrict);
            if (!isChkValidate)
                alert('กรุณาเลือกเขต/อำเภอ')
        }

        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputSubDistrict);
            if (!isChkValidate)
                alert('กรุณาเลือกแขวง/ตำบล')
        }

        if (isChkValidate) {
            isChkValidate = this.IsnullOrEmty(this.state.InputZipCode);
            if (!isChkValidate)
                alert('กรุณาเลือกเลขไปรษณีย์')
        }


        //Check Format
        if (isChkValidate) {
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
        }

        //focus จาก ชื่อ ref
        // this.nameInputRef.focus()

        if (isChkValidate) {
            let data = []
            data.push({
                "Fullname": this.state.InputName,
                "Tel": this.state.InputTel,
                "Email": this.state.InputEmail,
                "Province": this.state.InputProvince,
                "District": this.state.InputDistrict,
                "SubDistrict": this.state.InputSubDistrict,
                "Zipcode": this.state.InputZipCode,
                "Address": this.state.InputAddress,
                "Description": this.state.InputDesc,
            });
            this.props.customerAction.setCustomerData(data)

            this.props.history.push('../sku-summary')
        };
    }

    //#region GetInput
    getName = (event) => { this.setState({ InputName: event.target.value }) }
    getTel = (event) => { this.setState({ InputTel: event.target.value }) }
    getEmail = (event) => { this.setState({ InputEmail: event.target.value }) }
    getInputAddress = (event) => { this.setState({ InputAddress: event.target.value }) }
    getDesc = (event) => { this.setState({ InputDesc: event.target.value }) }
    //#endregion end GetInput

    render() {
        const province = this.state.Province
        const district = this.state.District
        const subDistrict = this.state.SubDistrict
        const zipCode = this.state.ZipCode
        return (
            <React.Fragment>
                <div className="layout">
                    <TopbarComponents></TopbarComponents>
                    <div className="major-navbar">
                        <div className="navbar-title">
                            ที่อยู่สำหรับจัดส่ง
                </div>
                    </div>
                    <div className="button-row">
                        <button className="button-primary" onClick={this.Submit} >
                            ยืนยัน
                    </button>
                    </div>
                    <div className="content content--scrollable mt-1">
                        <div className="pizza-address-input">
                            <input onChange={this.getName} ref={(input) => { this.refInputName = input; }} type="text" placeholder="ชื่อ - นามสกุล" />
                        </div>
                        <div className="pizza-address-input">
                            <input onChange={this.getTel} ref={(input) => { this.refInputTel = input; }} type="tel" placeholder="เบอร์ติดต่อ" />
                        </div>
                        <div className="pizza-address-input">
                            <input onChange={this.getEmail} ref={(input) => { this.refInputEmail = input; }} type="email" placeholder="อีเมล" />
                        </div>
                        <div className="pizza-address-title">ข้อมูลที่อยู่</div>
                        <div className="pizza-address-input" >
                            <React.Fragment>
                                {province.length === 0 ?

                                    <select><option>จังหวัด</option></select>
                                    :
                                    <select onChange={this.GetDistrict} ref={(input) => { this.refInputProvince = input; }}  >
                                        <option>จังหวัด</option>
                                        {province.map(({
                                            ProvinceCode,
                                            ProvinceNameTH,
                                            ProvinceNameEN,
                                            Status
                                        }) =>
                                            <option key={ProvinceCode} value={ProvinceCode} data={ProvinceNameTH} >{ProvinceNameTH}</option>
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
                                <select onChange={this.GetAll} >
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
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Customer: state.Customer
})

const mapDispatchToProps = dispatch => ({
    customerAction: bindActionCreators(customerAction, dispatch),
    pageAction: bindActionCreators(pageAction, dispatch)
})

export default connect(mapStateToProps, mapDispatchToProps)(SkuAddress);
