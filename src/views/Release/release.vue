<template>
  <div>
    <div class="box1">
      <el-card class="box2">
        <div class="title">
          <div class="sort">#</div>
          <div class="Title">标题</div>
          <div class="author">作者</div>
          <div class="Category">类目</div>
          <div class="source">来源</div>
          <div class="Importance">重要性</div>
          <div class="time">发布时间</div>
          <div class="operation">操作</div>
        </div>

        <div class="comtent">
          <div class="title1" v-for="(item,index) in arr" :key="index">
            <div class="sort1">{{index + 1}}</div>
            <div class="Title1">{{item.title}}</div>
            <div class="author1">{{item.author}}</div>
            <div class="Category1">
                <div v-if="item.category === 'React'"><el-tag type="info">React</el-tag></div>  
                <div v-else-if="item.category === 'Vue'"><el-tag type="success">Vue</el-tag></div>  
                <div v-else-if="item.category === 'JavaScript'"><el-tag type="warning">JavaScript</el-tag></div>
                <div v-else-if="item.category === '工具类'"><el-tag type="danger">工具类</el-tag></div>
                <div v-else-if="item.category === '其他'"><el-tag>其他</el-tag></div>
                <div v-else-if="item.category === 'Node.js'"><el-tag type="warning">Node.js</el-tag></div>
                <div v-else-if="item.category === '性能优化'"><el-tag type="danger">性能优化</el-tag></div>
                <div v-else-if="item.category === '小程序'"><el-tag type="success">小程序</el-tag></div>
            </div>
            <div class="source1">{{item.source}}</div>
            <div class="Importance1">
              <el-rate v-model="item.star" class="star" disabled ></el-rate>
            </div>
            <div class="time1">{{item.date}}</div>
            <div class="operation1">
              <el-button type="primary" @click="edit(item._id)">编辑</el-button>
              <el-button type="danger" @click="clickdelete(item._id)">删除</el-button>
              <el-button type="success" @click = "clickSee(item._id)">查看</el-button>
            
            </div>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      arr: [],
    };
  },
  components: {},
  methods: {
    getData() {
      this.$axios
        .req("/article/allArticle")
        .then(res => {
          this.arr = res.data;
          this.arr.map(item => {
            item.star = Number(item.star)
            item.date = this.$dayjs(item.date).format('YYYY-MM-DD hh:mm:ss')
          })
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    clickdelete(val){
          this.$axios.post("/article/delete",{_id:val})
          .then(response =>{
          }).catch(err => {
            console.log(err)
          })
      this.$message({
          message: '删除成功',
          type: 'success',
        });
        this.getData();
    },
    clickSee(val){
      this.$router.push({name:"see",query:{id:val}})
    },
    edit(val){
      this.$router.push({name:"edit",query:{id:val}})
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
.box1 {
  width: 1297px;
  height: 1000px;
}
.box2 {
  width: 1250px;
  margin: 20px auto;
}
.title {
  width: 1200px;
  height: 40px;
  display: flex;
}
.sort {
  width: 50px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.Title {
  width: 320px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.author {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.Category {
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.source {
  width: 80px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.Importance {
  width: 180px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.time {
  width: 120px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.operation {
  width: 280px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border: 1px solid #666;
}
.title1 {
  width: 1200px;
  height: 80px;
  display: flex;
}
.sort1 {
  width: 50px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
}
.Title1 {
  width: 320px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
}
.author1 {
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
}
.Category1 {
  width: 100px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
  display: flex;
  justify-content: center;
  align-items: center;
}
.source1 {
  width: 80px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
  word-wrap: break-word;
  text-overflow: ellipsis;
  font-size: 14px;
}
.Importance1 {
  width: 180px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
}
.time1 {
  width: 120px;
  height: 80px;
  line-height: 30px;
  border: 1px solid #666;
  word-wrap: break-word;
  text-overflow: ellipsis;
  font-size: 14px;
}
.operation1 {
  width: 280px;
  height: 80px;
  line-height: 80px;
  text-align: center;
  border: 1px solid #666;
}
.star {
  margin-top: 30px;
}

</style>