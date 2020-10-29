<template>
  <div class="mutiple-form-table">
    <h2>一级页面</h2>
    <el-table
      border
      :data="tableData"
      style="width='inherit'"
      height="100%"
    >
      <el-table-column
        type="index"
        label="序号"
        width="50"
        fixed="left"
        align="center"
      />
      <el-table-column
        fixed
        label="kpi指标"
        prop="kpi指标"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row['kpi指标']"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in kpiOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="计算方式"
        prop="计算方式"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row['计算方式']"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in calcOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="计算频率"
        prop="计算频率"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row['计算频率']"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in frequencyOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="计算周期"
        prop="计算周期"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row['计算周期']"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in calcPeriodOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="图示"
        prop="图示"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row['图示']"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in iconOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed
        label="基线值"
        prop="基线值"
        align="center"
        :resizable="false"
      >
        <template slot-scope="scope">
          <el-select
            v-model="scope.row['基线值']"
            placeholder="请选择"
            :style="{ width: '120px' }"
          >
            <el-option
              v-for="item in baselineOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="140"
        align="center"
      >
        <template slot="header" slot-scope="scope">
          <el-dropdown :hide-on-click="false" placement="bottom">
            <span class="el-dropdown-link">
              操作<i class="el-icon-arrow-down el-icon--right" />
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>添加一项</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </template>

        <template slot-scope="scope">
          <el-button type="danger" size="small" round @click="handleDeleteClick(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kpiOptions: [
        {
          label: '总带宽',
          value: '总带宽1'
        },
        {
          label: '总带宽2',
          value: '总带宽2'
        }
      ],
      calcOptions: [
        {
          label: '平均值',
          value: '平均值1'
        },
        {
          label: '平均值2',
          value: '平均值2'
        }
      ],
      frequencyOptions: [
        {
          label: '5min',
          value: '5min1'
        },
        {
          label: '5min2',
          value: '5min2'
        }
      ],
      calcPeriodOptions: [
        {
          label: '1hour1',
          value: '1hour1'
        },
        {
          label: '1hour2',
          value: '1hour2'
        }
      ],
      iconOptions: [
        {
          label: '折线图',
          value: '折线图1'
        },
        {
          label: '折线图2',
          value: '折线图2'
        }
      ],
      baselineOptions: [
        {
          label: '上周同比',
          value: '上周同比1'
        },
        {
          label: '上周同比2',
          value: '上周同比2'
        }
      ],
      tableData: [
        {
          kpi指标: '总带宽1',
          计算方式: '平均值1',
          计算频率: '5min1',
          计算周期: '1hour1',
          图示: '折线图1',
          基线值: '上周同比1'
        }
      ]
    }
  }
}
</script>

<style lang="scss" scoped>
  h2 {
    padding: 0;
    font-size: 14px;
    font-weight: 600;
  }
</style>
