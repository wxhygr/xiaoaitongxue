<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="box2">
          <div class="box3">期待您的下次光临</div>
          <el-button type="primary" class="button" @click="signout">确认退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  components: {},
  methods: {
    signout() {
      this.$axios
        .req("/user/logout")
        .then(res => {
          if (res.message === "登出成功") {
            this.$message({
              message: "退出成功",
              type: "success"
            });
             localStorage.removeItem("username")
            this.$router.push({ name: "sign" });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
}
.box1 {
  width: 1200px;
  height: 650px;
  margin: 10px auto;
  display: flex;
  justify-content: center;
  align-items: center;
}
.box2 {
  width: 300px;
  height: 300px;
}
.box3 {
  width: 300px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  font-weight: bold;
  font-size: 20px;
}
.button {
  margin-left: 100px;
}
</style>