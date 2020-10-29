/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-26 00:49:22
 * @LastEditTime: 2020-08-27 16:43:01
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\utils\get-page-title.js
 */
import defaultSettings from '@/settings'

const title = defaultSettings.title || '可视化管理系统'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle} - ${title}`
  }
  return `${title}`
}
