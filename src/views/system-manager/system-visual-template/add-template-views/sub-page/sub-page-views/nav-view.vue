<template>
  <div class="nav-view">
    <div class="left-box">
      <el-input
        v-model="input"
        placeholder="请输入内容"
        size="large"
        clearable
        @keyup.enter.native="handleSearchChange"
      />
      <el-button
        type="primary"
        size="mesium"
        round
        @click="handleSearchChange"
      >搜 索</el-button>
    </div>
    <div class="right-box">
      <el-select
        v-model="value"
        placeholder="请选择"
        :style="{ width: '120px' }"
        @change="handleSelectChange"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    inputValue: {
      type: String,
      default: () => ''
    },
    value: {
      type: String,
      default: () => ''
    },
    options: {
      type: [Array],
      default: () => []
    }
  },
  data() {
    return {
      input: '',
      timer: ''
    }
  },

  watch: {
    inputValue() {
      this.input = this.inputValue
    }
  },
  methods: {
    handleSelectChange(value) {
      console.log('handleSelectChange:', value)
      this.$emit('handleSelectChange', value)
    },
    handleSearchChange() {
      /* 不允许狂点或者狂enter的操作 */
      if (this.timer) {
        clearTimeout(this.timer)
      }

      this.timer = setTimeout(() => {
        console.log('handleSearchChange:', this.input)
        this.$emit('handleSearchChange', this.input)
      }, 500)
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-view {
  padding: 20px;
  display: flex;
  flex-direction: row-reverse;
  // justify-content: space-between;
  // align-items: center;
  .left-box {
    flex: 9;
    .el-input {
      // max-width: 70%;
      // width: 60%;
      // min-width: 50%;
      max-width: 50%;
      width: 35%;
      min-width: 30%;
      border-width: 4px;
    }
    .el-input__inner {
      border-width: 2px;
    }
    .el-button {
      margin-left: 20px;
      width: 100px;
    }
  }
  .right-box {
    width: 130px;
    text-align: left;
  }
}
</style>
