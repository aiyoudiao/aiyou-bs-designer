<template>
  <div :class="{ 'has-logo': showLogo }">
    <logo v-if="showLogo" :collapse="true" />
    <el-scrollbar wrap-class="scrollbar-wrapper">
      <!-- <el-menu
        :default-active="activeMenu"
        :collapse="false"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      > -->
      <el-menu
        :default-openeds="openMenuList"
        :default-active="activeMenu"
        :collapse="isCollapse"
        :background-color="variables.menuBg"
        :text-color="variables.menuText"
        :unique-opened="false"
        :active-text-color="variables.menuActiveText"
        :collapse-transition="false"
        mode="vertical"
      >
        <sidebar-item
          v-for="menu in menuList"
          :key="menu.name"
          :item="menu"
          :index="menu.name"
          @handleMenuItemClick="handleMenuItemClick"
        />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'
import variables from '@/styles/variables.scss'

export default {
  components: { SidebarItem, Logo },
  props: {
    openMenuList: {
      type: [Array],
      default: () => []
    },
    activeMenuName: {
      type: [String],
      default: () => ''
    },
    menuList: {
      type: [Array],
      default: () => []
    }
  },
  data: function() {
    return {
      currentMenuName: ''
    }
  },
  computed: {
    activeMenu() {
      console.log('activeMenu', this.currentMenuName)
      return this.currentMenuName || this.activeMenuName
    },
    showLogo() {
      return true
    },
    variables() {
      return variables
    },
    isCollapse() {
      return false
    }
  },
  watch: {
    activeMenuName() {
      this.currentMenuName = this.activeMenuName
    }
  },
  created() {

  },
  mounted() {
  },
  methods: {
    handleMenuItemClick(data) {
      console.log('data.name', data.name)
      this.currentMenuName = data.name
      this.$emit('handleMenuItemClick', data)
    }
  }
}
</script>

<style lang="scss">

.el-submenu .el-submenu__icon-arrow {
    display: inline-block!important;
}

</style>
