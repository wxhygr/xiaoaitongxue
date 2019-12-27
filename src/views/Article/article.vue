<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="fabu">
          <div class="chakan">
            <el-button size="small" type="danger" class="btn">查看</el-button>
            <el-button size="small" type="primary" class="btn" @click="fabu">发布</el-button>
          </div>
        </div>
        <div class="neirong">
          <el-form
            :model="ruleForm"
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
          >
            <el-form-item label="文章标题" prop="name">
              <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item label="文章摘要" prop="zhaiyao">
              <el-input v-model="ruleForm.zhaiyao"></el-input>
            </el-form-item>
            <div class="sa">
              <el-form-item label="作者" prop="region">
                <el-input v-model="ruleForm.region" placeholder="请输入作者" class="input"></el-input>
              </el-form-item>

              <el-form-item label="类目" prop="leimu">
                <el-select v-model="ruleForm.leimu" placeholder="请选择类目" class="input">
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

              <el-form-item label="来源" prop="laiyuan">
                <el-select v-model="ruleForm.laiyuan" placeholder="请选择来源" class="input">
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
                  v-model="ruleForm.value2"
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
            v-model="editorContent"
            :ishljs="true"
            ref="md"
            @imgAdd="$imgAdd"
            @imgDel="$imgDel"
          />
        </el-main>
        <el-button class="niubi" type="primary" @click="fabu">发布</el-button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
        },
      editorContent: "",
      ruleForm: {
        name: "",
        region: "",
        value2: "",
        zhaiyao: "",
        leimu: "",
        laiyuan: "",
        star: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        zhaiyao: [{ required: true, message: "请输入文章摘要" }],
        leimu: [{ required: true, message: "请选择文章类目" }],
        laiyuan: [{ required: true, message: "请选择文章来源" }],
        star: [{ required: true, message: "请选择文章重要性" }],
        region: [
          { required: true, message: "请选择活动区域", trigger: "change" }
        ],
      },
       
    };
  },
  components: {},
  methods: {
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
      this.$axios.post("/article/create", {
        title: this.ruleForm.name,
        abstract: this.ruleForm.zhaiyao,
        star: this.ruleForm.star,
        author:this. ruleForm.region,
        category: this.ruleForm.leimu,
        source: this.ruleForm.laiyuan,
        text: this.editorContent,
        date: this.value2
      }).
        then(response => {
          console.log(response);
        }).catch(err => {
          console.log(err);
        });
       this.ruleForm = '',
       this.$message({
          message: '恭喜你，上传成功',
          type: 'success'
        });
      this.$router.push({ name: "release" });
    },

    pickerOptions() {}
  },
  mounted() {},
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
.fabu {
  width: 1250px;
  height: 40px;
  background: #4c957f;
  display: flex;
}
.chakan {
  width: 150px;
  height: 40px;
  margin-left: 1080px;
}

.btn {
  margin-top: 3px;
}
.neirong {
  width: 1250px;
  height: 200px;
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
.niubi {
  margin: 10px 0 0 580px;
}
</style>