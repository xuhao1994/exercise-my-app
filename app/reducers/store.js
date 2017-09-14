/*
* @Author: xuhao1994
* @Date:   2017-09-14 15:06:55
* @Last Modified by:   xuhao1994
* @Last Modified time: 2017-09-14 15:25:56
*/
import * as actionTypes from '../constants/store'

let initialState = []

export default function store (state = initialState, action) {
    switch (action.type) {
        case actionTypes.STORE_UPDATE:
            return action.data
        case actionTypes.STORE_ADD:
            state.unshift(action.data)
            return state
		case actionTypes.STORE_RM:
            return state.filter(item=>{
                if(item.id != action.data.id){
                    return item
                }
            })
        default:
            return state
    }
}