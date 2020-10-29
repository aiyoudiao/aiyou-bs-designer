import {
  RELATIONSHIP_MANAGER,
  RELATIONSHIP_MANAGER_PATH,
  RELATIONSHIP_MANAGER_ZHCN,
  RELATIONSHIP_MANAGER_INDEX,
  RELATIONSHIP_MANAGER_INDEX_PATH,
  RELATIONSHIP_MANAGER_INDEX_ZHCN
} from '@/constant/relationship-manager'

export default (Layout) => ({
  path: RELATIONSHIP_MANAGER_PATH,
  component: Layout,
  redirect: RELATIONSHIP_MANAGER_INDEX_PATH,
  name: RELATIONSHIP_MANAGER,
  meta: {
    title: RELATIONSHIP_MANAGER_ZHCN,
    icon: 'nested'
  },
  children: [
    {
      path: RELATIONSHIP_MANAGER_INDEX_PATH,
      name: RELATIONSHIP_MANAGER_INDEX,
      meta: {
        title: RELATIONSHIP_MANAGER_INDEX_ZHCN,
        icon: ''
      },
      notTop: true, /* 当子节点为1时也不置顶 */
      component: () => import('@/views/relationship-manager/relationship/index.vue')
    }
  ]
})
