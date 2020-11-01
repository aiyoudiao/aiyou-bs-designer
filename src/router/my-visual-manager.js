/**
 * @description 数据管理
 */

export default (Layout) => ({
  path: '/my-visual-manager',
  component: Layout,
  redirect: 'my-visual',
  name: 'my-visual-manager',
  hidden: true,
  meta: {
    title: '我的可视化管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'visual-editor/:id',
      name: 'visual-editor',
      hidden: true,
      meta: {
        title: '可视化编辑器',
        icon: 'visual-editor'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/my-visual-manager/visual-editor/index.vue')
    },
    {
      path: 'visual-view/:id',
      name: 'visual-view',
      hidden: true,
      meta: {
        title: '可视化|预览',
        icon: 'visual-view'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/my-visual-manager/visual-view/index.vue')
    }
  ]
})
