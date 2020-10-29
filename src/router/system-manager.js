/**
 * @description 系统管理
 */

export default (Layout) => ({
  path: '/system-manager',
  component: Layout,
  redirect: 'system-visual-template',
  name: 'system-manager',
  meta: {
    title: '可视化管理',
    icon: 'system'
  },
  children: [
    {
      path: 'system-visual-template',
      name: 'system-visual-template',
      meta: {
        title: '应用可视化模板管理',
        icon: 'system-template'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/system-manager/system-visual-template/index.vue')
    }
  ]
})
