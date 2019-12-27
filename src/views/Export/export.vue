<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="comtent">
          <el-table :data="list(arr)" style="width: 100%" ref="multipleTable">
            <el-table-column label="名称" prop="NAME" width="300"></el-table-column>
            <el-table-column label="商品编号" prop="GOODS_SERIAL_NUMBER" width="300"></el-table-column>
            <el-table-column label="原价" prop="ORI_PRICE" width="300"></el-table-column>
            <el-table-column label="现价" prop="PRESENT_PRICE" width="300"></el-table-column>
          </el-table>
        </div>
        <div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-sizes="[10,20,30,40]"
            :page-size="10"
            layout="total, sizes, prev, pager, next, jumper"
            :total="arr.length"
          ></el-pagination>
        </div>
        <div class="load">
          <download-excel
            class="export-excel-wrapper"
            :data="jsondata"
            :fields="json_fields"
            name="shopping.xls"
          >
            <el-button type="primary">导出EXCEL</el-button>
          </download-excel>

          <download-excel
            class="export-excel-wrapper"
            :data="jsondata"
            :fields="json_fields"
            name="shopping.csv"
            type="csv"
          >
            <el-button type="danger" class="csv">CSV</el-button>
          </download-excel>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      arr: [],
      jsondata: [],
      currentPage: 1,
      pagesize: 10,
      json_fields: {},
      json_meta: [
        [
          {
            " key ": " charset ",
            " value ": " utf- 8 "
          }
        ]
      ]
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/tableData")
        .then(res => {
          this.jsondata = res.data;
          this.arr = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSizeChange(val) {
      this.pagesize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    list(arr) {
      return arr.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    }
  },
  mounted() {
    this.getData();
    // this.jsondata = this.arr;
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 1297px;
}
.box1 {
  width: 1200px;
  height: 1000px;
  margin: 10px auto;
}
.comtent {
  width: 1200px;
  margin-top: 10px;
}
.load {
  width: 500px;
  height: 50px;
  margin-top: 20px;
  display: flex;
}
.csv {
  margin-left: 20px;
}
</style>