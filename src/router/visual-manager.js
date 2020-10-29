/**
 * @description 可视化管理
 */

export default (Layout) => ({
  path: '/visual-manager',
  component: Layout,
  redirect: 'app-wall',
  name: 'visual-manager',
  meta: {
    title: '可视化管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'app-wall',
      name: 'visual-app-wall',
      meta: {
        title: '应用墙',
        icon: 'app-wall'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/visual-manager/app-wall/index.vue')
    }
  ]
})
