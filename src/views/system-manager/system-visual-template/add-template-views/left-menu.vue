<template>
  <div class="menu-wrapper">
    <custom-sidebar :menu-list="menuList" :open-menu-list="openMenuList" :active-menu-name="activeMenuName" @handleMenuItemClick="handleMenuItemClick" />
  </div>
</template>

<script>
import CustomSidebar from './custom-sidebar'
export default {
  components: {
    CustomSidebar
  },
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
  methods: {
    handleMenuItemClick(data) {
      this.$emit('handleMenuItemClick', data)
    }
  }
}
</script>

<style lang="scss">
.menu-wrapper {
  height: calc(100vh);
  background-color: #304156;
  width: 100%;
  .el-menu, .el-submenu, .el-menu-item, .el-menu-item-group {
    width: 150px;
    // overflow-x: hidden;
  }
}
</style>
