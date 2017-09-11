import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'


import './style.less'


class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
            	{
            		this.props.isLoadingMore
            		?<div>正在加载...</div>
            		:<div onClick={this.loadMoreHandle.bind(this)}>点击加载更多</div>
            	}
            </div>
        )
    }
    loadMoreHandle(){
    	this.props.loadMoreFn()
    }
    componentDidMount(){
    	const loadMoreFn = this.props.loadMoreFn
    	const wrapper = this.refs.wrapper
    	let timeoutId
    	function callback(){
    		const top = wrapper.getBoundingClientRect().top
    		const windowHeight = window.screen.height
    		if(top&&top<windowHeight){
    			loadMoreFn()
    		}
    	}
    	window.addEventListener("scroll", function(){
    		if(this.props.isLoadingMore){
    			return
    		}
    		if(timeoutId){
    			clearTimeout(timeoutId)
    		}
    		timeoutId = setTimeout(callback,50)
    	}.bind(this), false)
    }
}
export default LoadMore