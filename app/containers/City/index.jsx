import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'
import * as userInfoActionsFormOtherFile from '../../actions/userinfo'
import localStore from '../../util/localStore.js'
import {CITYNAME} from '../../config/localStoreKey.js'
import { hashHistory } from 'react-router'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
        	<div>
        		<Header title={'选择城市'}/>
        		<CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeCityFn={this.changeCityFn.bind(this)} />
        	</div>
        )
    }
    changeCityFn(newCity){
        if(newCity==null){
            return
        }
        //获取store中的城市信息
        const city = this.props.userinfo
        //修改城市信息中的cityName属性
        city.cityName = newCity
        //将修改后的城市信息再更新回去
        this.props.userInfoActions.update(city);
        //更改本地的storage 
        localStore.setItem(CITYNAME, newCity)
        //返回主页
        hashHistory.push('/');
        
    }
}
function mapStateToProps(state){
    return{
        userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch){
    return{
        userInfoActions:bindActionCreators(userInfoActionsFormOtherFile,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(City);