<template>
  <div :class="{'has-logo':showLogo}">
    <logo v-if="showLogo" :collapse="isCollapse" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <el-menu
        ref="menuObj"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
        @select="handleSelectItem"
      >
        <sidebar-item v-for="route in permission_routes" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'
import ejectRouter from '@/ejectRouter'
import getPageTitle from '@/utils/get-page-title'

export default {
  components: { SidebarItem, Logo },
  computed: {
    ...mapGetters([
      'permission_routes',
      'sidebar'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // if set path, the sidebar will highlight the path you set
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    showLogo() {
      return this.$store.state.settings.sidebarLogo
    },
    variables() {
      return variables
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  methods: {
    /* NOTE 对需要弹出页面的菜单项进行处理 */
    handleSelectItem(indexPath) {
      /* 当前浏览器地址栏的hash */
      const currentHash = window.location.hash.split('#')[1]
      const menuMap = this.$refs.menuObj.items
      const menuItemName = menuMap[currentHash].$el.innerText
      document.title = getPageTitle(menuItemName)

      /* 点击的的菜单在已经记录的需要弹出页面的菜单中时，就直接打开一个新的界面 */
      if (Object.values(ejectRouter).includes(indexPath)) {
        window.open('/#' + indexPath)
      }
      /* 将原来那个菜单选项的高亮还原 */
      this.$refs.menuObj.updateActiveIndex(currentHash)
      setTimeout(() => {
        document.title = getPageTitle(menuItemName)
      }, 500)
    }
  }
}
</script>
