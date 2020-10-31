/**
 * @description 数据管理
 */

export default (Layout) => ({
  path: '/my-visual-manager',
  component: Layout,
  redirect: 'my-visual',
  name: 'my-visual-manager',
  meta: {
    title: '我的可视化管理',
    icon: 'nested'
  },
  children: [
    {
      path: 'my-visual',
      name: 'my-visual',
      meta: {
        title: '我的可视化',
        icon: 'my-visual'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/my-visual-manager/my-visual/index.vue')
    },
    {
      path: 'visual-editor',
      name: 'visual-editor',
      meta: {
        title: '可视化编辑器',
        icon: 'visual-editor'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/my-visual-manager/visual-editor/index.vue')
    },
    {
      path: 'visual-view',
      name: 'visual-view',
      meta: {
        title: '可视化|预览',
        icon: 'visual-view'
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/my-visual-manager/visual-view/index.vue')
    }
  ]
})
