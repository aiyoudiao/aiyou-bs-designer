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

<style>
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
