<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="btn">
          <div>
            <el-button type="danger" size="small" @click="back">返回</el-button>
          </div>
          <div>
            <el-button type="primary" size="small" @click="fabu">发布</el-button>
          </div>
        </div>
        <div>
          <div class="neirong">
            <el-form :model="ruleForm" ref="ruleForm" label-width="100px" class="demo-ruleForm">
              <el-form-item label="文章标题" prop="title">
                <el-input v-model="ruleForm.title"></el-input>
              </el-form-item>
              <el-form-item label="文章摘要" prop="abstract">
                <el-input v-model="ruleForm.abstract"></el-input>
              </el-form-item>
              <div class="sa">
                <el-form-item label="作者" prop="author">
                  <el-input v-model="ruleForm.author" placeholder="请输入作者" class="input"></el-input>
                </el-form-item>

                <el-form-item label="类目" prop="category">
                  <el-select v-model="ruleForm.category" placeholder="请选择类目" class="input">
                    <el-option label="Vue" value="Vue"></el-option>
                    <el-option label="React" value="React"></el-option>
                    <el-option label="Node.js" value="Node.js"></el-option>
                    <el-option label="性能优化" value="性能优化"></el-option>
                    <el-option label="JavaScript" value="JavaScript"></el-option>
                    <el-option label="小程序" value="小程序"></el-option>
                    <el-option label="工具类" value="工具类"></el-option>
                    <el-option label="其他" value="其他"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="来源" prop="source">
                  <el-select v-model="ruleForm.source" placeholder="请选择来源" class="input">
                    <el-option label="原创" value="原创"></el-option>
                    <el-option label="转载" value="转载"></el-option>
                    <el-option label="与他人合作" value="与他人合作 "></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="重要性" prop="star">
                  <el-select v-model="ruleForm.star" placeholder="请选择重要性" class="input">
                    <el-option label="1" value="1"></el-option>
                    <el-option label="2" value="2"></el-option>
                    <el-option label="3" value="3"></el-option>
                    <el-option label="4" value="4"></el-option>
                    <el-option label="5" value="5"></el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="发布时间" required>
                  <el-date-picker
                    v-model="ruleForm.date"
                    type="datetime"
                    placeholder="选择日期时间"
                    align="right"
                    :picker-options="pickerOptions"
                  ></el-date-picker>
                </el-form-item>
              </div>
            </el-form>
          </div>

          <el-main class="content-content">
            <mavon-editor
              v-model="ruleForm.text"
              :ishljs="true"
              ref="md"
              @imgAdd="$imgAdd"
              @imgDel="$imgDel"
            />
          </el-main>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
          _id:'',
          title:'',
          abstract:'',
          star:'',
          author:'',
          category:'',
          source:'',
          text:'',
          date:'',
      },
      pickerOptions: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              picker.$emit("pick", new Date());
            }
          },
          {
            text: "昨天",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", date);
            }
          },
          {
            text: "一周前",
            onClick(picker) {
              const date = new Date();
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", date);
            }
          }
        ]
      }
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/article/article", {
          _id: this.$route.query.id
        })
        .then(res => {
          this.ruleForm = res.data;
          this.ruleForm.date = this.$dayjs(this.ruleForm.date).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    $imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData();
      formdata.append("image", $file);
      this.img_file[pos] = $file;
      this.$http({
        url: "",
        method: "post",
        data: formdata,
        headers: { "Content-Type": "multipart/form-data" }
      }).then(res => {
        let _res = res.data;
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        this.$refs.md.$img2Url(pos, _res.url);
      });
    },
    $imgDel(pos) {
      delete this.img_file[pos];
    },
    fabu() {
      this.$axios
        .post("/article/update", {
          id:this.ruleForm._id,
          title: this.ruleForm.title,
          abstract: this.ruleForm.abstract,
          star: this.ruleForm.star,
          author: this.ruleForm.author,
          category: this.ruleForm.category,
          source: this.ruleForm.source,
          text: this.ruleForm.text,
          date: this.ruleForm.date
        })
        .then(res => {
             this.$message({
          message: '删除成功',
          type: 'success',
        });
        this.$router.push({name:"release"})
        })
        .catch(err => {
          console.log(err);
        });
    },
    back(){
        this.$router.back({name:'release'})
    }
  },
  mounted() {
    this.getData();
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
  width: 1250px;
  height: 1000px;
  margin: 10px auto;
}
.btn {
  width: 1250px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.neirong {
  width: 1250px;
  height: 200px;
  margin-top: 20px;
}
.neirong1 {
  width: 1250px;
  height: 65px;
  line-height: 65px;
  display: flex;
  border: 1px solid red;
}
.inpt {
  width: 1100px;
}
.form {
  margin-top: 10px;
  display: flex;
}
.input {
  width: 132px;
}
.sa {
  display: flex;
}
</style>