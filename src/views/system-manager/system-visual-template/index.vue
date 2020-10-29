<template>
  <div class="visual-template-wrapper">
    <component :is="page" @handleAddClick="handleAddClick" @showHome="showHome" />
  </div>
</template>

<script>
import Home from './home.vue'
import Add from './add.vue'

export default {
  name: 'SystemVisualTemplate',
  components: {
    'home': Home,
    'add': Add
  },
  data() {
    return {
      page: 'home'
    }
  },
  methods: {
    handleAddClick() {
      this.page = 'add'
    },
    showHome() {
      this.page = 'home'
    }
  }
}
</script>

<style lang="scss">
.visual-template-wrapper {
  width: 100%;
  height: 100%;
}
</style>
