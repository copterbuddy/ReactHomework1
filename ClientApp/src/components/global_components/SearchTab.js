import React, { Component } from 'react'

export default class SearchTab extends Component {

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
                    </div>
                    
                </div>
            </React.Fragment>
        )
    }
}
