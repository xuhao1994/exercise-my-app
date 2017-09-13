/*
* @Author: xuhao1994
* @Date:   2017-09-13 14:18:29
* @Last Modified by:   xuhao1994
* @Last Modified time: 2017-09-13 14:37:39
*/
import { get } from '../get'

export function getSearchData(page, cityName, category, keyword) {
    const keywordStr = keyword.length ? '/' + keyword : ''
    const result = get('/api/search/' + page + '/' + cityName + '/' + category + keywordStr)
    return result
}