import React, { Component } from 'react'

//redux
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import * as productAction from '../../actions/product-action'

class Topbar extends Component {

    render() {
        const pageID = this.props.Page.pageID
        return (
            <React.Fragment>
                <div className='navbar' style={{
                    margin: "0px"
                }}>
                    <div className=' navbar-title'>
                        {
                            pageID === 1 ? null :
                            <div className="navbar-back" onClick={() => { this.props.history.goBack() }}></div>
                        }
                        {this.props.Page.topTxt}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => ({
    Page: state.Page,
    Product: state.Product
})

const mapDispatchToProps = dispatch => ({
    ProductAction: bindActionCreators(productAction, dispatch)
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Topbar))
