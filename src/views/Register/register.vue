<template>
  <div class="booo">
    <div class="box">
      <el-card class="box1">
        <div class="sign">欢迎来到小爱后台管理系统</div>

        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>

          <el-form-item label="请输入密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div class="btn">
          <el-button type="primary" @click="register">立即注册</el-button>
          <el-button type="primary" @click="sign">立即登录</el-button>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      let reg = new RegExp(/[\u4E00-\u9FA5]/g)
      if (!value) {
        return callback(new Error("用户名不能为空"));
      }else if(value.match(reg) ){
       return callback(new Error("用户名不能用中文"));
      }else{
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.ruleForm.checkPass !== "") {
          this.$refs.ruleForm.validateField("checkPass");
        }
        callback();
      }
    };
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [{ validator: checkAge, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    register() {
      this.$axios
        .req("/user/register", 
        { username: this.ruleForm.username,password:this.ruleForm.password })
        .then(res => {
          if(res.code === 200){
           this.$message({
            message: "注册成功",
            type: "success"
          });
          this.$router.push({name:"sign"})
          }else{
            alert('用户已存在')
          }
          
        }).catch(err => {
          console.log(err);
        });
    },
    sign(){
      this.$router.push({name:"sign"})
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.booo{
  background: url("../../assets/img/timg.jpg");
  background-size: cover;
  height: 730px;
}
.box {
  width: 1490px;
  height: 700px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box1 {
  width: 600px;
  height: 400px;
  margin: 20px auto;
}
.sign {
  width: 460px;
  height: 100px;
  text-align: center;
  line-height: 50px;
}
.asdf {
  margin: 30px 80px 0 0;
}
.btn {
  width: 550px;
  height: 100px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
</style>