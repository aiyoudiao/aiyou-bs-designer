<template>
  <div class="top-content-wrapper">
    <custom-navbar @handleBackLevel="handleBackLevel" @handleSubmitConfig="handleSubmitConfig" />
  </div>
</template>

<script>
import CustomNavbar from './custom-navbar'

export default {
  components: {
    'custom-navbar': CustomNavbar
  },
  methods: {
    handleBackLevel() {
      this.$emit('handleBackLevel')
    },
    handleSubmitConfig() {
      this.$emit('handleSubmitConfig')
    }
  }
}
</script>

<style lang="scss">

</style>
