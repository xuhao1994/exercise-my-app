import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import HomeHeader from '../../components/HomeHeader/'
import Category from '../../components/Category/'
import Ad from './subpage/Ad.jsx'
import List from './subpage/List.jsx'
import {connect} from 'react-redux'

class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        	<div>
        		<HomeHeader cityName={this.props.userinfo.cityName}/>
                <Category/>
                <div style={{height:'30px'}}></div>
                <Ad/>
                <List cityName={this.props.userinfo.cityName}/>
        	</div>
        )
    }
}

function mapStateToProps(state){
    return{//这里state就是顶层组件的store对象  userinfo 也是之前创建store的时候传进去的
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return{}//这里主要是存dispatch的  但是这个组件用不到触发更改只是展示  只需要监听更改所以就不传了
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);