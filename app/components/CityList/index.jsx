import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class CityList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
            <h1>城市列表</h1>
	            <ul>
	            	<li onClick={this.handleclick.bind(this,'北京')}>北京</li>
	            	<li onClick={this.handleclick.bind(this,'上海')}>上海</li>
	            	<li onClick={this.handleclick.bind(this,'杭州')}>杭州</li>
	            	<li onClick={this.handleclick.bind(this,'广东')}>广东</li>
	            	<li onClick={this.handleclick.bind(this,'深圳')}>深圳</li>
	            	<li onClick={this.handleclick.bind(this,'厦门')}>厦门</li>
	            </ul>
            </div>
        )
    }
    handleclick(newCity){
    	console.log(newCity);
    	this.props.changeCityFn(newCity);
    }
}
export default CityList