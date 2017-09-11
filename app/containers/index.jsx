import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import LocalStore from '../util/localStore.js'
import {CITYNAME} from '../config/localStoreKey.js'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import * as userInfoActionsFormOtherFile from '../actions/userinfo.js'


class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>正在加载...</div>
                }
            </div>
        )
    }

    componentDidMount(){
    	//从localstorage里面获取城市
    	let cityName = LocalStore.getItem(CITYNAME);
    	if(cityName == null){
    		cityName = '北京'
    	}

    	//将城市信息存储到Redux中
    	this.props.userInfoActions.update({
            cityName:cityName
        });
    	this.setState({
    		initDone:true
    	})
    	


    }
}

function mapStateToProps(state){
    return{}//这步其实就是传需要的reducer  例如 return{state.userinfo}
    //这里这个App组件呢 其实主要是用下dispatch,用不到reducer
}

function mapDispatchToProps(dispatch){
    return{
        userInfoActions:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App);