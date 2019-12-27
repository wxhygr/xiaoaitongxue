<template>
  <div>
    <div class="box">
      <div class="box1">
        <div>
          <el-button type="primary" size="small" @click="back">返回</el-button>
        </div>
        <div class="title">{{arr.title}}</div>
        <div class="category">摘要：{{arr.category}}</div>
        <div class="time">发表于：{{arr.date}}</div>
        <div class="comtent">{{arr.text}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: {}
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
          this.arr = res.data;
          console.log(this.arr);
          this.arr.date = this.$dayjs(this.arr.date).format(
            "YYYY-MM-DD hh:mm:ss"
          );
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    back() {
      this.$router.back({ name: "release" });
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
.title {
  width: 1200px;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-weight: bold;
  font-size: 25px;
}
.category {
  width: 1200px;
  height: 60px;
  text-align: center;
  line-height: 80px;
  font-size: 17px;
}
.time {
  width: 1200px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  font-size: 13px;
  color: gray;
}
.comtent {
  width: 1250px;
  height: 500px;
  border: 1px solid skyblue;
}
</style>