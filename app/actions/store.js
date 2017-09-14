/*
* @Author: xuhao1994
* @Date:   2017-09-14 14:51:48
* @Last Modified by:   xuhao1994
* @Last Modified time: 2017-09-14 16:30:55
*/
import * as actionTypes from '../constants/store'

export function update(data) {
    return {
        type: actionTypes.STORE_UPDATE,
        data
    }
}
export function add(data) {
    return {
        type: actionTypes.STORE_ADD,
        data
    }
}
export function rm(data) {
    return {
        type: actionTypes.STORE_RM,
        data
    }
}