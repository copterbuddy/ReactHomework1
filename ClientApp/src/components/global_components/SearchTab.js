import React, { Component } from 'react'

export default class SearchTab extends Component {

    constructor(props) {
        super(props);
        this.state = {
            but: ''
        }
        // bind callback ที่่ใช้
        this.reloadSearch = this.reloadSearch.bind(this)

    }

    reloadSearch(event) {
        const { txtSearch } = this.props
        if (txtSearch !== undefined) {
            txtSearch(event.target.value);
        }
        this.setState({
            but: event.target.value
        })

    }

    //state = { theme: null }

    // resetTheme = evt => {
    //     evt.preventDefault();
    //     this.setState({ theme: null });
    // }

    // chooseTheme = (theme, evt) => {
    //     evt.preventDefault();
    //     this.setState({ theme });
    // }

    render() {
        //const { theme } = this.state;
        //const themeClass = theme ? theme.toLowerCase() : 'secondary';

        return (
            <React.Fragment>
                <div className="input-group flex-nowrap myCenterInput">
                    <div className="input-group-prepend">
                        <div className='myCenterInput'>
                            <span className="input-group-text glyphicon glyphicon-search myCenterSpan myGlyphicon" id="addon-wrapping"></span>
                        </div>
                        {/* <span className="input-group-text" id="addon-wrapping">{'-->'}</span> */}
                        <input type="search"
                            onChange={this.reloadSearch}
                            className="form-control myHolder"
                            placeholder="ค้นหาสินค้า"
                            aria-label="Username"
                            aria-describedby="addon-wrapping"
                            style={{
                                top: '1px',
                                backgroundColor: '#5c58582c'
                            }}>

                            </input>
                        {/* onChange={() => this.reloadSearch({this.})} */}
                    </div>
                </div>
            </React.Fragment>
        )
    }
}
