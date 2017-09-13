import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'
import './style.less'
import SearchList from './subpage/SearchList'
class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        const params = this.props.params
        const keyword = params.keyword?params.keyword:''
        return (
        	<div>
        		<SearchHeader keyword={keyword}/>
                <SearchList keyword={keyword} category={params.type}/>
        	</div>
        )
    }
}
export default Search