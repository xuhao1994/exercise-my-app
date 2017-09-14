/*
* @Author: xuhao1994
* @Date:   2017-09-14 09:19:26
* @Last Modified by:   xuhao1994
* @Last Modified time: 2017-09-14 09:22:44
*/
import {get} from '../get'
export function getInfoData(id){
	const result = get('/api/detail/info/'+id)
	return result
}
export function getCommentData(page,id){
	const result = get('/api/detail/comment/'+page+'/'+id)
	return result
}