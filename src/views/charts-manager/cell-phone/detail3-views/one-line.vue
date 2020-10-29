<template>
  <div class="one-line-wrapper">
    <div v-for="item in list" :key="item" class="one-line-item">
      <div class="one-line-top">
        <common-monitor :onoff="onoff" :date="date" @changeRadioValue="handleRadioValue" @changeDateTimeRange="handleDateTimeRange" />
      </div>
      <div class="one-line-bottom">
        <div class="one-line-title">
          <div class="content">当前XX数</div>
        </div>
        <div class="line-item">
          <common-line
            :data="chartData.rows"
            :header="chartData.columns"
            :normal="true"
            :loading="loading"
            :extend="extend"
            :legend-hides="legendHides"
            @cleanLoading="loading = false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonMonitor from './common-monitor.vue'
import CommonLine from '@/zph-components/common-components/common-line'

export default {
  name: 'ContentView',
  components: {
    CommonMonitor,
    CommonLine
  },
  props: {
    onoff: {
      type: String,
      default: '开'
    },
    date: {
      type: [Array],
      default: () => {
        const start = new Date()
        const end = new Date()

        start.setTime(start.getTime() - 1000 * 60 * 60 * 2)
        return [start, end]
      }
    }
  },
  data() {
    return {
      list: Array(1)
        .fill(1)
        .map((value, index) => {
          return 'item' + (index + 1)
        }),
      radioSelect: '开',
      loading: true,
      legendHides: ['总会话数', '总会话数七日均值'],
      extend: {
        series: {
          label: {
            normal: {
              show: false
            }
          }
        }
      },
      chartData: {
        columns: [
          '时间',
          '总会话数',
          '总会话数七日均值',
          '总新建连接',
          '总新建连接数七日均值'
        ],
        rows: [].concat(
          [
            ['9:00', '25184', '21463', '106358', '24204'],
            ['9:05', '20145', '15947', '132833', '89220'],
            ['9:10', '19883', '11090', '233259', '196925'],
            ['9:15', '18283', '9728', '179076', '171295'],
            ['9:20', '21543', '16396', '287762', '276854'],
            ['9:25', '20959', '16328', '251872', '153122'],
            ['9:30', '16912', '12765', '263338', '207474'],
            ['9:35', '20006', '14370', '238119', '172434'],
            ['9:40', '16656', '10675', '273657', '191154'],
            ['9:45', '20851', '16845', '249101', '189382'],
            ['9:50', '26879', '18009', '114669', '22369'],
            ['9:55', '18482', '14143', '154866', '93204'],
            ['10:00', '26241', '19302', '252503', '159392'],
            ['10:05', '25140', '20949', '293483', '213469'],
            ['10:10', '14197', '9003', '144333', '104419'],
            ['10:15', '25679', '21745', '235801', '138394'],
            ['10:20', '22539', '16609', '236698', '145617'],
            ['10:25', '12110', '5530', '274675', '212153'],
            ['10:30', '19049', '13333', '259017', '186322'],
            ['10:35', '25511', '17131', '188487', '110237'],
            ['10:40', '20995', '16552', '255240', '221215'],
            ['10:45', '21695', '15076', '203275', '166565'],
            ['10:50', '19961', '13763', '225984', '131124'],
            ['10:55', '20647', '17097', '235796', '179966'],
            ['11:00', '18973', '11935', '162738', '110286']
          ].map(value => {
            const [one, two, three, four, five] = value

            return {
              时间: one,
              总会话数: two,
              总会话数七日均值: three,
              总新建连接: four,
              总新建连接数七日均值: five
            }
          })
        )
      }
    }
  },
  methods: {
    handleRadioValue(value) {
      this.$emit('changeRadioValue', value)
    },
    handleDateTimeRange(value) {
      this.$emit('changeDateTimeRange', value)
    }
  }
}
</script>

<style lang="scss" scoped>
/* 全局变量 */
$myTitle: 20px;

.one-line-wrapper {
  width: 100%;
  overflow: hidden;
  .one-line-item {
    box-sizing: border-box;
    margin-top: 50px;
    width: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-items: center;
    align-items: center;

    .one-line-top {
      height: 35px;
      width: 90%;
      display: flex;
      align-items: flex-end;
      justify-content: flex-end;
    }
    .one-line-bottom {
      width: 100%;
      display: flex;
      flex-direction: row;
      .one-line-title {
        display: flex;
        justify-content: center;
        // display: inline-block;
        align-items: center;
        width: 50px;
        margin-right: 10px;
        height: 385px;
        .content {
          font-size: $myTitle;
          color: #333;
          writing-mode: vertical-lr;
        }
      }

      .line-item {
        width: 100%;
        height: 385px;
        padding-top: 10px;
        border: 1px solid #000;
        // margin-bottom: -50px;
      }
    }
  }
}
</style>
