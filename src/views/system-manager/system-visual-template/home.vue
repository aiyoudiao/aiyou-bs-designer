<template>
  <div class="home-template-wrapper">
    <nav-view @handleSearchEvent="handleSearchEvent" @handleAddClick="handleAddClick" />
    <content-view
      @handlePageSizeChange="handlePageSizeChange"
      @handlePageNumberChange="handlePageNumberChange"
    />
  </div>
</template>

<script>
import NavView from './home-template-views/nav-view.vue'
import ContentView from './home-template-views/content-view.vue'

export default {
  name: 'SystemVisualTemplateHome',
  components: {
    'nav-view': NavView,
    'content-view': ContentView
  },
  data() {
    return {
      searchValue: '',
      selectValue: 'icon',
      pageSize: 50,
      pageNumber: 1
    }
  },
  methods: {
    handleSearchEvent(value) {
      this.searchValue = value
      this.resetPagination()
    },
    handlePageSizeChange(value) {
      this.pageSize = value
    },
    handlePageNumberChange(value) {
      this.pageNumber = value
    },
    handleAddClick() {
      this.$emit('handleAddClick')
    },

    resetPagination() {
      this.pageSize = 50
      this.pageNumber = 1
    }
  }
}
</script>

<style lang="scss">

</style>
