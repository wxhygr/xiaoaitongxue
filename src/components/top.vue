<template>
  <div>
    <div class="top">
      <div class="welcome">欢迎{{username}}来到属于你的营地后台管理系统</div>
      <div class="time">
        <span v-if=" 0<this.hours&& this.hours<6">该睡觉了</span>
        <span v-if=" 6<this.hours && this.hours<12">早上好</span>
        <span v-if=" 12<this.hours && this.hours<14">中午好</span>
        <span v-if=" 14<this.hours && this.hours<18">下午好</span>
        <span v-if=" 18<this.hours  && this.hours<24">晚上好</span>
        ，亲爱的{{username}}此次登录时间 ：
        <countTo :startVal="0" :endVal="2019" :duration="3600"></countTo>年
        <countTo :startVal="0" :endVal="12" :duration="3600"></countTo>月
        <countTo :startVal="0" :endVal="27" :duration="3600"></countTo>日
        <span>{{hours}}</span>:
        <span>{{minutes}}</span>:
        <span>{{seconds}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import countTo from "vue-count-to";
export default {
  data() {
    return {
      hours: "",
      minutes: "",
      seconds: "",
      username: ""
    };
  },
  components: {
    countTo
  },
  methods: {},
  created() {
    let target = new Date("2019-6-6").getTime(); //获取目标时间戳
    setInterval(() => {
      let date = new Date();
      let hours = date.getHours();
      let minutes = date.getMinutes();
      let seconds = date.getSeconds();
      this.hours = hours;
      this.minutes = minutes;
      this.seconds = seconds;
    }, 1000);
  },
  mounted() {
    this.username = localStorage.getItem("username");
  },
  watch: {},
  computed: {}
};
</script>

<style scoped lang='scss'>
.top {
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #2e5e85;
}
.welcome {
  width: 350px;
  height: 30px;
  color: white ;
  text-align: center;
  line-height: 30px;
  font-size: 16px;
}
.time {
  width: 600px;
  height: 30px;
  text-align: center;
  line-height: 30px;
  color : white;
}
</style>