import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'
import BuyAndStore from '../../../components/BuyAndStore'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {hashHistory} from 'react-router'
import * as storeActionsFromOtherFiles from '../../../actions/store'
class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            isStore:false
        }
    }
    render() {
        return (
            <BuyAndStore
             isStore={this.state.isStore}
             buyHandle={this.buyHandle.bind(this)} 
             storeHandle={this.storeHandle.bind(this)}
             />
        )
    }

    componentDidMount(){
    	this.isStoreCheck()
    }


        //购买
    buyHandle(){
        const isLogin = this.loginCheck()
        if(!isLogin){
            return
        }
        //购买流程
        


        //跳转用户主页
        hashHistory.push('/User')
    }
    //收藏
    storeHandle(){
    	const isLogin = this.loginCheck()
        if(!isLogin){
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions

        if(this.state.isStore){
        	//已被收藏,需要取消收藏
        	storeActions.rm({id:id})
        }else{
        	//未被收藏,需要添加收藏
        	storeActions.add({id:id})
        }
        //操作之后,需要重置当前的收藏状态
        this.setState({
        	isStore:!this.state.isStore
        })
    }

    //判断是否收藏了
    isStoreCheck(){
    	const id = this.props.id
    	const store = this.props.store
    	store.some(item=>{
    		if(item.id == id){
    			this.setState({
    				isStore:true
    			})
    			return true
    		}
    	})
    }

    //判断用户登录状态
    loginCheck(){
        const id = this.props.id
        let username = this.props.userinfo.username
        if(username==null){
            hashHistory.push('/Login/'+encodeURIComponent('/detail/'+id))
            return false
        }
        return true
    }
}
//__________________分割线____________________
function mapStateToProps(state){
    return{
        userinfo:state.userinfo,
        store:state.store
    }
}

function mapDispatchToProps(dispatch){
    return{
    	storeActions:bindActionCreators(storeActionsFromOtherFiles,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy);