import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getInfoData} from '../../../fetch/detail/detail'
import Detailinfo from '../../../components/Detailinfo'
class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
        	info:false
        }
    }
    render() {
        return (
            <div>
            	{
            		this.state.info
            		?<Detailinfo data={this.state.info} />
            		:<div>加载中...</div>
            	}
            </div>
        )
    }
    componentDidMount(){
    	let id = this.props.id
    	let result = getInfoData(id)
    	result.then(res=>{
    		return res.json()
    	}).then(json=>{
    		this.setState({
    			info:json
    		})
    	})
    }
}
export default Info