<template>
  <router-view :user="user" />
</template>

<script>
export default {
  data() {
    return {
      user: {
        uid: localStorage.getItem('uid'),
        username: localStorage.getItem('user')
      }
    }
  }
}
</script>

<style lang='scss' scoped>

</style>
