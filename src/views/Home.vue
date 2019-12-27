<template>
  <div>
    <div class="box">
      <div class="box1">
        <el-card class="visit">
          <div class="ni">
            <div class="people">
              <img src="../assets//img/people.svg" width="40px" height="40px" />
            </div>
            <div class="shuju">
              <span class="vie">New Visits</span>
              <countTo :startVal="0" :endVal="crr.visits" :duration="3600"></countTo>
            </div>
          </div>
        </el-card>
        <el-card class="visit">
          <div class="ni">
            <div class="people">
              <img src="../assets/img/news.svg" width="40px" height="40px" />
            </div>
            <div class="shuju">
              <span class="vie">Messages</span>
               <countTo :startVal="0" :endVal="crr.messages" :duration="3600"></countTo>
            </div>
          </div>
        </el-card>
        <el-card class="visit">
          <div class="ni">
            <div class="people">
              <img src="../assets/img/money.svg" width="40px" height="40px" />
            </div>
            <div class="shuju">
              <span class="vie">Purchases</span>
             <countTo :startVal="0" :endVal="crr.purchases" :duration="3600"></countTo>
            </div>
          </div>
        </el-card>
        <el-card class="visit">
          <div class="ni">
            <div class="people">
              <img src="../assets/img/car.svg" width="40px" height="40px" />
            </div>
            <div class="shuju">
              <span class="vie">Shopping</span>
            <countTo :startVal="0" :endVal="crr.shopping" :duration="3600"></countTo>
            </div>
          </div>
        </el-card>
      </div>

      <div class="box2">
        <el-card class="curve">
          <ve-line :data="chartData" :settings="chartSettings"></ve-line>
        </el-card>
      </div>
      <div class="graph">
        <el-card class="img">
          <ve-radar :data="chartDate" :settings="chartSetting"></ve-radar>
        </el-card>
        <el-card class="img">
          <ve-pie :data="chartDatc" :settings="chartSettinging"></ve-pie>
        </el-card>
        <el-card class="img">
          <ve-histogram :data="chartData" :settings="chartSettings"></ve-histogram>
        </el-card>
      </div>
      <!-- 购物所使用的钱币 -->
      <div class="graph">
        <el-card class="sss">
          <div class="ccc">
            <div class="top-title">
              <div class="title1">Order_NO</div>
              <div class="title">Price</div>
              <div class="title2">Stutus</div>
            </div>
            <div class="top-title" v-for="(item,index) in err" :key="index">
              <div class="title1">{{item.num}}</div>
              <div class="title">￥{{item.price}}</div>
              <div class="title2">
                <div class="title2-yang">
                  <div class="title2-size" v-if="item.status === 0">pending</div>
                  <div class="title3-size" v-else-if="item.status === 1">success</div>
                </div>
              </div>
            </div>
          </div>
        </el-card>
  <!-- todolist 表单 -->
        <el-card class="niqwe">
            <homm></homm>
        </el-card>
       <!-- 进度条加图片 -->
        <el-card class="niqwe">
          <div class="tupian">          
            <img         
              src="https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png"
              width="220px"
              height="130px"
            />
          </div>
      <!-- 进度条 -->
          <div v-for="(item) in lise" :key="item.name">
            {{item.name}}
            <el-progress :percentage="item.progress*100" v-if="item.progress*100 === 100" status="success" ></el-progress>
               <el-progress :percentage="item.progress*100" v-else-if="item.progress*100 !== 100"></el-progress>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>
    
<script>
import homm from '../components/todolist.vue'
import countTo from 'vue-count-to'
export default {
  data() {
    return {
      crr: {},
      err: [],
      lise: [],
      chartData: {
        columns: ["date", "expected", "actual"],
        rows: []
      },
      chartSettings: {
        metrics: ["expected", "actual"],
        dimension: ["date"]
      },
      chartDate: {
        columns: [
          "name",
          "sales",
          "ministration",
          "techology",
          "delelopmer",
          "marketing"
        ],
        rows: []
      },
      chartSetting: {
        metrics: [
          "sales",
          "ministration",
          "techology",
          "delelopmer",
          "marketing"
        ],
        dimension: ["name"]
      },
      chartDatc: {
        columns: ["name", "data"],
        rows: []
      },
      chartSettinging: {
        metrics: ["data"],
        dimension: ["name"]
      },
      
    };
  },
  components: {
    homm,
    countTo
  },
  methods: {
    getData() {
      this.$axios
        .req("/homeData")
        .then(res => {
          this.crr = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //  折线图
    getdata() {
      this.$axios
        .req("/homeChat ")
        .then(response => {
          this.chartData.rows = response.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    //雷达图
    getdatc() {
      this.$axios
        .req("/radarChat")
        .then(res => {
          this.chartDate.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 饼图
    getdatd() {
      this.$axios
        .req("/ringChat")
        .then(res => {
          this.chartDatc.rows = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //进度条
    getdatf() {
      this.$axios
        .req("/progress")
        .then(res => {
          this.lise = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },

    getdatq() {
      this.$axios
        .req("/orderData")
        .then(res => {
          this.err = res.data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    format(percentage) {
      return percentage === 100 ? "满" : `${percentage}%`;
    }
  },
  mounted() {
    this.getData();
    this.getdata();
    this.getdatq();
    this.getdatc();
    this.getdatd();
    this.getdatf();
  },
  created() {},

  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.box {
  width: 1297px;
  height: 1500px;
}
.box1 {
  width: 1200px;
  height: 180px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0 auto;
}
.visit {
  width: 285px;
  height: 80px;
}
.ni {
  width: 285px;
  height: 80px;
  display: flex;
  justify-content: space-around;
}
.people {
  width: 40px;
  height: 40px;
}
.shuju {
  width: 90px;
  height: 40px;
}
.box2 {
  width: 1297px;
  height: 500px;
}
.curve {
  width: 1200px;
  height: 430px;
  margin: 0 auto;
}
.graph {
  width: 1297px;
  height: 350px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.img {
  width: 350px;
  height: 370px;
}
.niqwe {
  width: 250px;
  height: 320px;
  margin-top: 40px;
}

.sss {
  width: 570px;
  height: 320px;
  margin-top: 40px;
}

.tupian {
  width: 220px;
  height: 150px;
}

.vie {
  color: #a39dc0;
  font-size: 14px;
}

.ccc {
  width: 530px;
  height: 300px;
}
.top-title {
  width: 540px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.title1 {
  width: 250px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #a39dc0;
  font-size: 12px;
}
.title {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #a39dc0;
  font-size: 12px;
}
.title2 {
  width: 80px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  color: #a39dc0;
  font-size: 12px;
}
.title2-yang {
  width: 80px;
  height: 20px;
  background: #fef0f0;
  margin: 4px auto;
  border-radius: 5px;
}
.title2-size {
  line-height: 17px;
  color: #f66c6c;
}
.title3-size {
  color: #67c23a;
   line-height: 17px;
}
</style>