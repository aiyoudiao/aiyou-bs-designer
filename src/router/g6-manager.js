import {
  G6_MANAGER,
  G6_MANAGER_PATH,
  G6_MANAGER_ZHCN,
  G6_MANAGER_INDEX,
  G6_MANAGER_INDEX_PATH,
  G6_MANAGER_INDEX_ZHCN,
  G6_MANAGER_SIMPLE,
  G6_MANAGER_SIMPLE_PATH,
  G6_MANAGER_SIMPLE_ZHCN,
  G6_MANAGER_CUSTOM_NODE,
  G6_MANAGER_CUSTOM_NODE_PATH,
  G6_MANAGER_CUSTOM_NODE_ZHCN,
  G6_MANAGER_CUSTOM_COMBO,
  G6_MANAGER_CUSTOM_COMBO_PATH,
  G6_MANAGER_CUSTOM_COMBO_ZHCN,
  G6_MANAGER_CUSTOM_ICONFONT,
  G6_MANAGER_CUSTOM_ICONFONT_PATH,
  G6_MANAGER_CUSTOM_ICONFONT_ZHCN
} from '@/constant/g6-manager'

export default (Layout) => ({
  path: G6_MANAGER_PATH,
  component: Layout,
  redirect: G6_MANAGER_INDEX_PATH,
  name: G6_MANAGER,
  meta: {
    title: G6_MANAGER_ZHCN,
    icon: 'nested'
  },
  children: [
    {
      path: G6_MANAGER_INDEX_PATH,
      name: G6_MANAGER_INDEX,
      meta: {
        title: G6_MANAGER_INDEX_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/g6-manager/tutorial-demo/index.vue')
    },
    {
      path: G6_MANAGER_SIMPLE_PATH,
      name: G6_MANAGER_SIMPLE,
      meta: {
        title: G6_MANAGER_SIMPLE_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/g6-manager/tutorial-demo/simple.vue')
    },
    {
      path: G6_MANAGER_CUSTOM_NODE_PATH,
      name: G6_MANAGER_CUSTOM_NODE,
      meta: {
        title: G6_MANAGER_CUSTOM_NODE_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/g6-manager/custom-node/index.vue')
    },
    {
      path: G6_MANAGER_CUSTOM_COMBO_PATH,
      name: G6_MANAGER_CUSTOM_COMBO,
      meta: {
        title: G6_MANAGER_CUSTOM_COMBO_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/g6-manager/custom-combo/index.vue')
    },
    {
      path: G6_MANAGER_CUSTOM_ICONFONT_PATH,
      name: G6_MANAGER_CUSTOM_ICONFONT,
      meta: {
        title: G6_MANAGER_CUSTOM_ICONFONT_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/g6-manager/iconfont-test/index.vue')
    }
  ]
})
