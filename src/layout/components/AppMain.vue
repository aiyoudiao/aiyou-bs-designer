<!--
 * @Descripttion: 新的应用容器组件
 * @version: 1.0.0
 * @Author: aiyoudiao
 * @Date: 2020-08-26 00:49:22
 * @LastEditTime: 2020-08-29 16:04:48
 * @LastEditors: aiyoudiao
 * @FilePath: \code\src\layout\components\AppMain.vue
-->
<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss">
.el-date-picker {
  .el-input__inner {
    color: #3a3a3a;
  }
}

.app-main {
  /*50 = navbar  */
  min-height: calc(100vh - 50px);
  width: 100%;
  padding: 10px;
  position: relative;
  overflow: auto;
  /* overflow: hidden; */

  .el-form-item__label {
    color: #606266;
    padding: 0 5px 0 0;
  }
  .el-form-item {
    display: inline-block;
    margin-bottom: 0;
  }

  .el-form-item__content {
    margin-right: 6px;
    .el-date-editor {
      width: 100%;
    }
    .el-input__inner {
      border-color: #979797;
      color: #3a3a3a;
      padding-right: 10px;
    }
    .el-input__inner::placeholder {
      font-size: 10px;
    }
    .el-button--medium.is-round {
      padding: 8px 1vw;
    }
  }

  .el-card__body {
    padding: 20px 12px 10px;
  }
}

.fixed-header + .app-main {
  padding-top: 50px;
}

.hasTagsView {
  .app-main {
    min-height: calc(100vh-84px);
  }
}
</style>

<style lang="scss">
// fix css style bug in open el-dialog
.el-popup-parent--hidden {
  .fixed-header {
    padding-right: 15px;
  }
}
</style>
