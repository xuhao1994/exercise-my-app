import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'


class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
        	name:''
        }
    }
    render() {
        return (
            <input type="text"
	             placeholder="请输入关键字"
	             onChange={this.handleChange.bind(this)}
	             onKeyDown={this.handleKeyDown.bind(this)}
	             value={this.state.name}
             />
        )
    }
    componentDidMount(){
    	this.setState({
    		name:this.props.value||""
    	})
    }
    handleChange(e){
        const val = e.target.value;
        this.setState({name:val})
    }
    handleKeyDown(e){
        if(e.keyCode != 13){
            return
        }
        const keyWord = this.state.name
        if(keyWord.length==0){
            return
        }
        this.props.handleSearch(keyWord)
    }
}
export default SearchInput