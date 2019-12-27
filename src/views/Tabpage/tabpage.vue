<template>
  <div>
    <div class="box">
      <div class="box1">
        <!-- //标为已读 -->
        <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane :label="`未读消息(${this.tableData.length})`" name="first">
            <div class="comtent">
              <el-table :data="tableData" style="width: 100%" :show-header="false">
                <el-table-column prop="date" width="800"></el-table-column>
                <el-table-column prop="name" width="250"></el-table-column>
                <el-table-column prop width="150">
                  <template slot-scope="scope">
                    <el-button @click="clickitem(scope.$index,scope.row)">标为已读</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="button">
                <el-button type="primary" @click="all">全部标为已读</el-button>
              </div>
            </div>
          </el-tab-pane>

          <!-- //已读消息 -->
          <el-tab-pane :label="`已读消息(${this.tableDate.length})`" name="second">
            <div class="comtent">
              <el-table :data="tableDate" style="width: 100%" :show-header="false">
                <el-table-column prop="date" width="800"></el-table-column>
                <el-table-column prop="name" width="250"></el-table-column>
                <el-table-column prop width="150">
                  <template slot-scope="scope">
                    <el-button @click="clickasd(scope.$index,scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>

              <div class="button">
                <el-button type="danger" @click="clickdelete">删除全部</el-button>
              </div>
            </div>
          </el-tab-pane>
          <!-- ///回收站 -->

          <el-tab-pane :label="`回收站(${this.tableDatc.length})`" name="third">
            <div class="comtent">
              <el-table :data="tableDatc" style="width: 100%" :show-header="false">
                <el-table-column prop="date" width="800"></el-table-column>
                <el-table-column prop="name" width="250"></el-table-column>
                <el-table-column prop width="150">
                  <template slot-scope="scope">
                    <el-button @click="huanyuan(scope.$index,scope.row)" type="warning">还原</el-button>
                  </template>
                </el-table-column>
              </el-table>
              <div class="button">
                <el-button type="info" @click="recovery">回收站</el-button>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      tableData: [
        {
          date: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          name: "2018-4-19  20:00:00"
        },
        {
          date: "今晚12点整发大红包，先到先得",
          name: "2018-4-19  21:00:00"
        }
      ],
      tableDate: [
        {
          date: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
          name: "2018-4-19  20:00:00"
        }
      ],
      tableDatc: [
        {
          date: "【系统通知】您的优惠券已经过期",
          name: "2018-4-19  20:00:00"
        }
      ]
    };
  },
  components: {},
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    clickitem(val, va) {
      this.tableData.splice(val, 1);
      this.tableDate.push(va);
    },
    all() {
      this.tableDate = this.tableDate.concat(this.tableData);
      this.tableData = [];
    },
    clickasd(val, vel) {
      this.tableDate.splice(val, 1);
      this.tableDatc.push(vel);
    },
    clickdelete() {
      this.tableDatc = this.tableDatc.concat(this.tableDate);
      this.tableDate = [];
    },
    huanyuan(val, vel) {
      this.tableDatc.splice(val, 1);
      this.tableDate.push(vel);
    },
    recovery() {
      this.tableDatc = [];
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 1297px;
  height: 1000px;
}
.box1 {
  width: 1250px;
  height: 900px;
  margin: 20px auto;
}
.comtent {
  width: 1200px;
  height: 900px;
  margin: 10px auto;
}
.button {
  width: 1100px;
  height: 50px;
  margin: 10px 0 0 20px;
}
</style>