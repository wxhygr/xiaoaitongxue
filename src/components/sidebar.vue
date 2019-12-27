<template>
  <div>
    <div class="sidebar">
      <div class="option">
        <div class="img">
          <img src="../assets/img/定位 (1).png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem">首页</div>
      </div>

      <div class="option">
        <div class="img">
          <img src="../assets/img/应用 选中 (1).png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem2">分页表格</div>
      </div>

      <div class="option">
        <div class="img">
          <img src="../assets/img/应用 选中 (1).png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem1">已发布</div>
      </div>

      <div class="option">
        <div class="img">
          <img src="../assets/img/应用 选中 (1).png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="statistics">统计</div>
      </div>
      <div class="option">
        <div class="img">
          <img src="../assets/img/勾 (1).png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="article">发表文章</div>
      </div>
      <div class="option">
        <div class="img">
          <img src="../assets/img/设 置.png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem4">标签页</div>
      </div>
      <div class="option">
        <div class="img">
          <img src="../assets/img/设 置.png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem5">导出excel</div>
      </div>
      <div class="option">
        <div class="img">
          <img src="../assets/img/设 置.png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem6">图片上传</div>
      </div>

      <div class="option">
        <div class="img">
          <img src="../assets/img/回收站.png" width="25px" height="25px" />
        </div>
        <div class="shouye" @click="clickitem10">退出系统</div>
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
    clickitem() {
      this.$router.push({ name: "home" });
    },
    clickitem1() {
      this.$router.push({ name: "release" });
    },
    clickitem2() {
      this.$router.push({ name: "pagingform" });
    },
    article() {
      this.$router.push({ name: "article" });
    },
    statistics(){
      this.$router.push({name:"statistics"})
    },


    clickitem4() {
      this.$router.push({ name: "tabpage" });
    },
    clickitem5() {
      this.$router.push({ name: "export" });
    },

    clickitem6() {
      this.$router.push({ name: "upload" });
    },
    clickitem10() {
      this.$router.push({ name: "signout" });
    }
  },
  mounted() {},
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.sidebar {
  width: 200px;
  height: 100%;
  background: #344055;
}
.option {
  width: 150px;
  height: 60px;
  margin: 0px auto;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
}
.img {
  width: 25px;
  height: 25px;
}
.shouye {
  width: 80px;
  height: 25px;
  text-align: center;
  line-height: 25px;
}
.shouye:hover {
  cursor: pointer;
}
</style>