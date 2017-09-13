import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { connect } from 'react-redux'

import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

import { getSearchData } from '../../../fetch/search/search'

//初始化一个组件的state
const initialState = {
	data:[],
	hasMore:false,
	isloadingMore:false,
	page:0
}

class SearchList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = initialState
    }
    render() {
        return (
            <div>
            	{
            		this.state.data.length
            		?<ListComponent data={this.state.data}/>
            		:<div>加载中...</div>
            	}
            	{
            		this.state.hasMore
            		?<LoadMore 
            		isloadingMore={this.state.isloadingMore}
            		loadMoreFn={this.loadMoreData.bind(this)}/>
            		:''
            	}
            </div>
        )
    }

    componentDidMount(){
    	//获取首页数据
    	this.loadFirstPageData()
    }

    loadFirstPageData(){
    	const city = this.props.userinfo.cityName
    	const keyword = this.props.keyword
    	const category = this.props.category
    	const result = getSearchData(0, city, category, keyword)
    	this.resultHandle(result);
    }

    //加载更多数据
    loadMoreData(){
    	//更新一下显示状态
    	this.setState({isloadingMore:true})

    	const city = this.props.userinfo.cityName
    	const keyword = this.props.keyword
    	const category = this.props.category
    	const page = this.state.page
    	const result = getSearchData(page, city, category, keyword)
    	this.resultHandle(result);

    	//更新一下显示状态
    	this.setState({isloadingMore:false})
    }

    //处理数据
    resultHandle(result){
    	//先更新页数
    	this.setState({page:this.state.page+1})

    	result.then(res=>{
    		return res.json()
    	}).then(json=>{
    		const hasMore = json.hasMore
    		const data = json.data

    		this.setState({
    			hasMore:hasMore,
    			data:this.state.data.concat(data)
    		})
    	}).catch(ex=>{
    		if(__DEV__){
    			console.error("搜索页面出错了,",ex.message)
    		}
    	})
    }

    //处理重新搜索的情况
    componentDidUpdate(prevProps,prevState){
    	const keyword = this.props.keyword
    	const category = this.props.category

    	//当列表组件触发更新时先判断当前的关键字是不是重复的
    	if(keyword == prevProps.keyword && category == prevProps.category){
    		return
    	}

    	//这里特殊情况,由于页面内还有可能重复搜索,当条件成立时需要重置列表的所有state
    	this.setState(initialState);
    	//再根据新条件加载第一页数据
    	this.loadFirstPageData();
    }
}


//-------------分割线-------------  
function mapStateToProps(state){
    return{
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return{}
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SearchList);