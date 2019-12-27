<template>
  <div>
    <div class="box23">
      <div class="box24">
        <div>
          <img src="../assets/img/xuan.png" @click="ched" />
        </div>
        <div>Todo List</div>
      </div>
      <div class="box25">
        <div class="box26" v-for="(item,index) in list" :key="index">
          <div class="boasa">
            <input type="checkbox" v-model="item.checked" @click="che(item)"  class="tyu"/>
            <div class="sada">
              <div>{{item.name}}</div>
            </div>
            <div class="boxads">
              <img
                src="../assets/img/cuo.png"
                width="25px"
                height="25px"
                @click="del(item)"
                class="img"
              />
            </div>
          </div>
        </div>

        <div class="box27">
          <div class="box28">
            <span class="nihaoya">{{total}}items left</span>
            <span @click="All" class="nihao">All</span>
            <span @click="Active" class="nihao">Active</span>
            <span @click="Completed" class="nihao">Completed</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [
        {
          name: "star this repository",
          checked: false
        },
        {
          name: "fork this repository",
          checked: false
        },
        {
          name: "follow author",
          checked: false
        },
        {
          name: "vue-admin",
          checked: false
        },
        {
          name: "vue",
          checked: false
        },
        {
          name: "element-ui",
          checked: false
        },
        {
          name: "axios",
          checked: true
        },
        {
          name: "webpack",
          checked: true
        }
      ],
      arr: [],
      num: 0,
      checkbox: true
    };
  },
  components: {},
  methods: {
    del(it) {
      this.list = this.list.filter(item => {
        return item !== it;
      });
    },
    //全选
    ched() {
      if (this.num === 1) {
        this.list.map(item => {
          item.checked = this.checkbox;
        });
      }
    },
    All() {
      this.num = 1;
      this.list = this.arr.filter(item => {
        return item.checked !== "";
      });
    },
    Active() {
      this.num = 2;
      this.list = this.arr.filter(item => {
        return item.checked === false;
      });
    },
    Completed() {
      this.num = 3;
      this.list = this.arr.filter(item => {
        return item.checked !== false;
      });
    }
  },
  mounted() {},
  watch: {},
  computed: {
    total() {
      let nun = 0;
      if (this.num === 1) {
        this.list.map(item => {
          if (item.checked !== true) {
            nun++;
          }
        });
        return nun;
      } else if (this.num === 2) {
        this.list.map(item => {
          if (item.checked === false) {
            nun++;
          }
        });
        return nun;
      } else if (this.num === 3) {
        this.list.map(item => {
          if (item.checked === true) {
            nun++;
          }
        });
        return nun;
      }
    }
  }
};
</script>

<style scoped lang='scss'>
.box1 {
  width: 500px;
  height: 800px;
}
.box23 {
  width: 230px;
  height: 300px;
  margin-top: -15px;
  margin-left: -15px;
}
.box24 {
  width: 230px;
  height: 30px;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.box25 {
  width: 230px;
  height: 270px;
}
.boasa {
  display: flex;
}
.box26 {
  width: 230px;
  height: 25px;
}
.box26:hover .img {
  display: block;
}
.sada {
  flex: 9;
}
.boxads {
  flex: 1;
}
.box27 {
  width: 230px;
  height: 60px;
  border-top: 1px solid #666;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.box28 {
  width: 220px;
  height: 50px;
  font-size: 12px;
  line-height: 50px;
}
.img {
  display: none;
}
.nihao {
  margin-left: 5px;
  cursor: pointer;
}
.nihao:hover {
  background: #666;
}
.nihaoya:hover {
  background: #666;
  cursor: pointer;
}
.tyu{
  margin-top:5px; 
}
</style>