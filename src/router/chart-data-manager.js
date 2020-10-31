/**
 * @description 数据管理
 */

export default (Layout) => ({
  path: '/chart-data-manager',
  component: Layout,
  redirect: 'chart-data-list',
  name: 'chart-data-manager',
  meta: {
    title: '数据管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'chart-data-list',
      name: '',
      meta: {
        title: '数据列表',
        icon: 'chart-data-list'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/chart-data-manager/chart-data-list/index.vue')
    },
    {
      path: 'chart-data-source',
      name: 'chart-data-source',
      meta: {
        title: '数据源添加',
        icon: 'chart-data-source'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/chart-data-manager/chart-data-source/index.vue')
    }
  ]
})
