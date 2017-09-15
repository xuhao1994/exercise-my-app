import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'
import {connect} from 'react-redux'
import {hashHistory} from 'react-router'
class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
            	<Header title="用户主页" backRouter="/" />
            	<UserInfo
            	 username={this.props.userinfo.username} 
            	 city={this.props.userinfo.cityName}/>
                 <OrderList username={this.props.userinfo.username}/>
            </div>
        )
    }

    componentDidMount(){
    	const username = this.props.userinfo.username
    	if(username==null){
    		hashHistory.push("/Login")
    	}
    }

}
//-------------分割线-------------  
function mapStateToProps(state){
    return{
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return{
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(User);