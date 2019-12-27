<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="Searchbox">
          <el-input placeholder="请输入要搜索的内容" v-model="search" clearable></el-input>
        </div>
        <div class="comtent">
          <el-table :data="list(arr)" style="width: 100%" ref="multipleTable">
            <el-table-column label="名称" prop="NAME" width="300"></el-table-column>
            <el-table-column label="商品编号" prop="GOODS_SERIAL_NUMBER" width="300"></el-table-column>
            <el-table-column label="原价" prop="ORI_PRICE" width="175"></el-table-column>
            <el-table-column label="现价" prop="PRESENT_PRICE" width="175"></el-table-column>
            <el-table-column prop width="250">
              <template slot-scope="scope">
                <el-button type="primary" @click="edit(scope.row)" size="small" icon="el-icon-edit">编辑</el-button>

                <el-dialog title :visible.sync="dialogFormVisible" class="dialog">
                  <el-form>
                    <el-form-item label="名称" :label-width="formLabelWidth">
                      <el-input v-model="crr.NAME" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="原价" :label-width="formLabelWidth">
                      <el-input v-model="crr.ORI_PRICE" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item label="现价" :label-width="formLabelWidth">
                      <el-input v-model="crr.PRESENT_PRICE" autocomplete="off"></el-input>
                    </el-form-item>
                  </el-form>
                  <div slot="footer" class="dialog-footer">
                    <el-button @click="quxiao(scope.row)">取 消</el-button>
                    <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
                  </div>
                </el-dialog>

                <el-button
                  class="btn"
                  type="danger"
                  size="small"
                  icon="el-icon-delete"
                  @click.native.prevent="deleteRow(scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogFormVisible: false,
      formLabelWidth: "50px",
      name: "",
      arr: [],
      currentPage: 1,
      pagesize: 10,
      search: "",
      Nlist: [],
      crr: {}
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/tableData")
        .then(res => {
          this.arr = res.data;
          this.Nlist = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    handleSizeChange(val) {
      this.pagesize = val;
    }, //
    handleCurrentChange(val) {
      this.currentPage = val;
    }, //
    list(arr) {
      return arr.slice(
        (this.currentPage - 1) * this.pagesize,
        this.currentPage * this.pagesize
      );
    },
    deleteRow(index) {
      this.arr.splice(index + (this.currentPage - 1) * this.pagesize, 1);
      this.Nlist.splice(index + (this.currentPage - 1) * this.pagesize, 1);
      this.$message({
        type: "success",
        message: "删除成功!"
      });
    },
    edit(val) {
      this.dialogFormVisible = true;
      this.crr = val;
    },
    quxiao(val){
      this.dialogFormVisible = false
      this.crr = []
     console.log(val);
    }
  },
  mounted() {
    this.getData();
  },
  watch: {
    search(val) {
      this.arr = this.Nlist.filter(arr => {
        return JSON.stringify(arr).includes(val);
      });
    }
  },
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 1297px;
}
.box1 {
  width: 1200px;
  margin: 10px auto;
}
.Searchbox {
  width: 300px;
  height: 50px;
}
.comtent {
  width: 1200px;
  margin-top: 10px;
}
.btn {
  margin-left: 10px;
}
.asdfzxc {
  width: 400px;
}
.dialog {
  width: 1100px;
  margin-left: 200px;
}
</style>