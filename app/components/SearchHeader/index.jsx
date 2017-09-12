import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchInput from '../SearchInput'
import {hashHistory} from 'react-router'

import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
    	const keyword = this.props.keyword
        return (
            <div id="search-header" className="clear-fix">
                <span className="back-icon float-left" onClick={this.handleClick.bind(this)}>
                    <i className="icon-chevron-left"></i>
                </span>
                <div className="input-container">
                    <i className="icon-search"></i>
                    &nbsp;
                    <SearchInput value={keyword} handleSearch={this.handleSearch.bind(this)}/>
                </div>
            </div>
        )
    }
    handleClick(){
    	window.history.back();
    }
    handleSearch(keyword){
    	hashHistory.push("/search/all/"+encodeURIComponent(keyword))
    }

}
export default SearchHeader