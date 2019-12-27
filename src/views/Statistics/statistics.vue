<template>
  <div>
    <div class="box">
      <div class="box1">
        <div class="top">
          <div class="title">
            <div class="top-one">
              今日发布
              <div class="shuzi">{{arr.length}}</div>
            </div>
            <div class="top-two">
              <div class="eimg">
                <i class="el-icon-check"></i>
              </div>
            </div>
          </div>

          <div class="title1">
            <div class="top-one">
              原创文章
              <div class="shuzi">2</div>
            </div>
            <div class="top-two">
              <div class="eimg">
                <i class="el-icon-tickets"></i>
              </div>
            </div>
          </div>
          <div class="title2">
            <div class="top-one">
              新留言
              <div class="shuzi">0</div>
            </div>
            <div class="top-two">
              <div class="eimg">
                <i class="el-icon-bell"></i>
              </div>
            </div>
          </div>
          <div class="title3">
            <div class="top-one">
              新消息
              <div class="shuzi">0</div>
            </div>
            <div class="top-two">
              <div class="eimg">
                <i class="el-icon-phone-outline"></i>
              </div>
            </div>
          </div>
        </div>
        <div class="tubiao">
          <div class="tubiao1">
            <ve-pie :data="chartData"></ve-pie>
          </div>
          <div class="tubiao2">
            <ve-pie :data="chartDate" :settings="chartSettings"></ve-pie>
          </div>
        </div>
        <div class="tongji">
          <ve-waterfall :data="chartDatc"></ve-waterfall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    this.chartSettings = {
      roseType: "radius"
    };
    return {
      arr: [],
      chartData: {
        columns: ["categorys", "numbers"],
        rows: []
      },
      chartDate: {
        columns: ["sources", "numbers"],
        rows: []
      },
      chartDatc: {
        columns: ["dates", "numbers"],
        rows: []
      }
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.arr = res.data;
          let list = this.$lodash.groupBy(this.arr, "category");
          for (let i in list) {
            this.chartData.rows.push({
              categorys: i,
              numbers: list[i].length
            });
          }

          let crr = this.$lodash.groupBy(this.arr, "source");
          for (let i in crr) {
            this.chartDate.rows.push({
              sources: i,
              numbers: crr[i].length
            });
          }

          let jrr = this.$lodash.groupBy(this.arr, "date");
          for (let i in jrr) {
            this.chartDatc.rows.push({
              dates: i,
              numbers: jrr[i].length
            });
          }
        })
        .catch(err => {
          console.log(err);
        });
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
.top {
  width: 1250px;
  height: 50px;
  display: flex;
}
.title {
  width: 312px;
  height: 50px;
  background: #7ccabf;
  display: flex;
}
.title1 {
  width: 312px;
  height: 50px;
  background: #e88a87;
  display: flex;
}
.title2 {
  width: 312px;
  height: 50px;
  background: #8375a3;
  display: flex;
}
.title3 {
  width: 312px;
  height: 50px;
  background: #7ccabf;
  display: flex;
}
.top-one {
  width: 252px;
  height: 50px;
  text-align: center;
  line-height: 35px;
  color: white;
}
.top-two {
  width: 60px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.shuzi {
  line-height: 10px;
}
.eimg {
  width: 30px;
  height: 30px;
}
.el-icon-check {
  color: white;
}
.el-icon-tickets {
  color: white;
}
.el-icon-bell {
  color: white;
}
.el-icon-phone-outline {
  color: white;
}
.tubiao {
  width: 1200px;
  height: 400px;
  margin: 5px auto;
  display: flex;
}
.tubiao1 {
  width: 600px;
  height: 400px;
}
.tubiao2 {
  width: 600px;
  height: 400px;
}
.tongji {
  width: 1200px;
  height: 400px;
}
</style>




 