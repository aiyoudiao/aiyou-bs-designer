<template>
  <div id="app">
    <!-- <dv-full-screen-container class="dv-full-screen-container-top"> -->
    <router-view />
    <!-- </dv-full-screen-container> -->
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">

@import url("https://fonts.googleapis.com/css?family=Molengo|Noto+Sans+SC|Noto+Serif+SC|Lobster|ZCOOL+QingKe+HuangYou|ZCOOL+XiaoWei");
@import url("//at.alicdn.com/t/font_1127427_8156c125kn9.css");

body {
  margin: 0;
  padding: 0;
  min-height: 100vh;
  user-select: none;
}
.el-header {
  padding: 0;
}
.el-container {
  height: 100%;
}

.dv-full-screen-container-top {
    position: static!important;
    overflow: visible!important;
    height: auto!important;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;

}

</style>
