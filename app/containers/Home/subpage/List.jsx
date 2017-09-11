import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getListData} from '../../../fetch/home/home'

import ListComponent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'
class List extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            data:[],    //数据
            hasMore:false,   //是否加载更多
            isLoadingMore:false,    //是否显示加载更多
            page:1  //下一页,默认第二页
        }
    }
    render() {
        return (
            <div>
            	<h2 className='home-list-title'>猜你喜欢</h2>
            	{
                    this.state.data.length
                    ?<ListComponent data={this.state.data} />
                    :<div>加载中...</div>
                }
                {
                    this.state.hasMore
                    ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}></LoadMore>
                    :<div></div>
                }

            </div>
        )
    }
    componentDidMount(){
    	this.loadFirstPageData()
    }
    loadFirstPageData(){    //加载首屏数据
    	const cityName = this.props.cityName;
    	const result = getListData(cityName,0);
    	this.showFirstPageData(result);
    	
    }
    loadMoreData(){ //加载更多数据
        this.setState({
            isLoadingMore:true
        })
        const cityName = this.props.cityName;
        const page = this.state.page;
        const result = getListData(cityName,page);
        this.showFirstPageData(result);
        
        this.setState({
            isLoadingMore:false,
            page:page+1
        })
    }
    showFirstPageData(result){  //处理数据
    	result.then((res) => {
    		return res.json()
    	}).then(json => {
    		this.setState({
                data:this.state.data.concat(json.data),
                hasMore:json.hasMore
            })
    	})
    }

}
export default List