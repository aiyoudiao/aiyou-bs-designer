/*
 * @Descripttion: aiyoudiao
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-19 02:22:52
 * @LastEditTime: 2020-08-27 18:18:02
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\router\charts-manager.js
 */
/**
 * NOTE 异步的组件有个弊病，你的import方法中必须写全字符串，
 * 不能使用变量，否则打包的时候不会去打包那个组件为一个js文件。
 */

import {
  CHARTS_MANAGER,
  CHARTS_MANAGER_PATH,
  CHARTS_MANAGER_ZHCN,
  CHARTS_MANAGER_INDEX,
  CHARTS_MANAGER_INDEX_PATH,
  CHARTS_MANAGER_INDEX_ZHCN,
  CHARTS_MANAGER_DETAIL,
  CHARTS_MANAGER_DETAIL_PATH,
  CHARTS_MANAGER_DETAIL_ZHCN,
  CHARTS_MANAGER_DETAIL_2,
  CHARTS_MANAGER_DETAIL_2_PATH,
  CHARTS_MANAGER_DETAIL_2_ZHCN,
  CHARTS_MANAGER_DETAIL_3,
  CHARTS_MANAGER_DETAIL_3_PATH,
  CHARTS_MANAGER_DETAIL_3_ZHCN,
  CHARTS_MANAGER_DETAIL_4,
  CHARTS_MANAGER_DETAIL_4_PATH,
  CHARTS_MANAGER_DETAIL_4_ZHCN
} from '@/constant/charts-manager'

export default (Layout) => ({
  path: CHARTS_MANAGER_PATH,
  component: Layout,
  redirect: CHARTS_MANAGER_INDEX_PATH,
  name: CHARTS_MANAGER,
  meta: {
    title: CHARTS_MANAGER_ZHCN,
    icon: 'nested'
  },
  children: [
    {
      path: CHARTS_MANAGER_INDEX_PATH,
      name: CHARTS_MANAGER_INDEX,
      meta: {
        title: CHARTS_MANAGER_INDEX_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      // component: () => import('../views/charts-manager/big-screen/index.vue'),
      component: () => import('@/views/charts-manager/cell-phone/index.vue')
    },
    {
      path: CHARTS_MANAGER_DETAIL_PATH,
      name: CHARTS_MANAGER_DETAIL,
      meta: {
        title: CHARTS_MANAGER_DETAIL_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/charts-manager/cell-phone/detail.vue')
    },
    {
      path: CHARTS_MANAGER_DETAIL_2_PATH,
      name: CHARTS_MANAGER_DETAIL_2,
      meta: {
        title: CHARTS_MANAGER_DETAIL_2_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/charts-manager/cell-phone/detail2.vue')
    },
    {
      path: CHARTS_MANAGER_DETAIL_3_PATH,
      name: CHARTS_MANAGER_DETAIL_3,
      meta: {
        title: CHARTS_MANAGER_DETAIL_3_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/charts-manager/cell-phone/detail3.vue')
    },
    {
      path: CHARTS_MANAGER_DETAIL_4_PATH,
      name: CHARTS_MANAGER_DETAIL_4,
      meta: {
        title: CHARTS_MANAGER_DETAIL_4_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/charts-manager/cell-phone/detail4.vue')
    }
  ]
})
