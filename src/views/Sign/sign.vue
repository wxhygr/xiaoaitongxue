<template>
  <div class="boxone">
    <el-card class="box-card">
      <div class="sign">欢迎来到小爱后台管理系统</div>
      <div class="asdf">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="请输入用户名" prop="age">
            <el-input v-model="ruleForm.age"></el-input>
          </el-form-item>

          <el-form-item label="请输入密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" autocomplete="off"></el-input>
          </el-form-item>

          <el-form-item label="请输入验证码" prop="checkPass" class="btn">
            <el-input
              type="password"
              v-model="ruleForm.checkPass"
              autocomplete="off"
              class="button"
            ></el-input>

            <div class="Verification" @click="clickcation">
              <img src="api/captcha" ref="captcha" />
            </div>
          </el-form-item>

          <div class="item">
            <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
            <el-button type="primary" @click="register">立即注册</el-button>
          </div>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var checkAge = (rule, value, callback) => {
      let reg = new RegExp(/[\u4E00-\u9FA5]/g);
      if (!value) {
        return callback(new Error("用户名不能为空"));
      } else if (value.match(reg)) {
        return callback(new Error("用户名不能用中文"));
      } else {
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
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入验证码"));
      } else {
        callback();
      }
    };

    return {
      ruleForm: {
        pass: "",
        age: "",
        checkPass: ""
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }],
        age: [{ validator: checkAge, trigger: "blur" }]
      }
    };
  },
  components: {},
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios
            .req("/user/login", {
              username: this.ruleForm.age,
              password: this.ruleForm.pass,
              code: this.ruleForm.checkPass
            })
            .then(res => {
              if (res.message === "登录成功") {
                this.$message({
                  message: "成功登陆",
                  type: "success"
                });
                 localStorage.setItem("username", this.ruleForm.age);
                this.$router.push({ name: "home" });
              } else if (res.message === "用户不存在") {
                this.$message({
                  message: "此用户名不存在",
                  type: "danger"
                });
              } else {
                this.$message({
                  message: "登录失败",
                  type: "danger"
                });
              }
            })
            .catch(err => {
              console.log(err);
            });
        }
      });
    },
    clickcation() {
      this.$refs.captcha.src = "/api/captcha?time=" + Date.now();
    },
    register() {
      this.$router.push({name:"register"})
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box-card {
  width: 500px;
  height: 500px;
  margin: 0 auto;
}
.sign {
  width: 460px;
  height: 100px;
  text-align: center;
  line-height: 50px;
}
.yonghu {
  width: 460px;
  height: 50px;
  margin-top: 10px;
}
.denglu {
  margin: 30px 0 0 170px;
}
.asdf {
  margin: 30px 80px 0 0;
}
.boxone {
  height: 730px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: url("../../assets/img/timg.jpg") ;
  background-size: cover;
}
.button {
  width: 100px;
}
.item {
  width: 470px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.btn {
  width: 500px;
  height: 70px;
}

.Verification {
  width: 150px;
  height: 70px;
  margin-left: 130px;
  margin-top: -55px;
}
</style>