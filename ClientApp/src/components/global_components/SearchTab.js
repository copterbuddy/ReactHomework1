import React, { Component } from 'react'

export default class SearchTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
        // bind callback ที่่ใช้
        this.reloadSearch = this.reloadSearch.bind(this)

    }

    reloadSearch() {
        const { txtSearchCallback } = this.props
        if (txtSearchCallback !== undefined) {
            txtSearchCallback('twsst');
        }

    }

    state = { theme: null }

    resetTheme = evt => {
        evt.preventDefault();
        this.setState({ theme: null });
    }

    chooseTheme = (theme, evt) => {
        evt.preventDefault();
        this.setState({ theme });
    }

    render() {
        const { theme } = this.state;
        const themeClass = theme ? theme.toLowerCase() : 'secondary';

        return (
            <React.Fragment>
                <div className="input-group flex-nowrap">
                    <div className="input-group-prepend">
                        {/* <span className="input-group-text glyphicon glyphicon-search" id="addon-wrapping">@</span> */}
                        <span className="input-group-text" id="addon-wrapping">@</span>
                        <input type="search" className="form-control" placeholder="ค้นหาสินค้า" aria-label="Username" aria-describedby="addon-wrapping"></input>
                        {/* onChange={() => this.reloadSearch({this.})} */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
