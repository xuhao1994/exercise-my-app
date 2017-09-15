/*
* @Author: xuhao1994
* @Date:   2017-09-15 15:09:10
* @Last Modified by:   xuhao1994
* @Last Modified time: 2017-09-15 17:21:06
*/
import { get } from '../get'
import { post } from '../post'
 
export function getOrderListData(username) {
    const result = get('/api/orderlist/' + username)
    return result
}

export function postComment(id, comment) {
    const result = post('/api/submitComment', {
        id: id,
        comment: comment
    })
    return result
}