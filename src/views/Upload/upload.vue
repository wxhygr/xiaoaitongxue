<template>
  <div>
    <div class="box">
      <el-card class="box1">
        <div class="tuozhuai">支持拖拽</div>
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          action="/api/upload"
          multiple
          show-file-list
          :file-list="fileList"
          :auto-upload="true"
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
          <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>

        </el-upload>
        <div class="caijian">支持裁剪</div>
        <div>
    <el-button type="primary" class="btn" @click="toggleShow">上传图片</el-button>
    <my-upload  
    @crop-success="cropSuccess" 
    @crop-upload-success="cropUploadSuccess"
    @crop-upload-fail="cropUploadFail"
    v-model="show" 
    :width="200" 
    :height="200" 
    img-format="png" 
    :size="size"
    langType='zh'
    :noRotate='false'
    field="file"
    url="/api/upload"></my-upload>
    <img :src="imgDataUrl">
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
export default {
  data() {
    return {
      fileList: [],
       imgDataUrl: "",
        show: false,
        size:2.1
    };
  },
  components: {
     "my-upload": myUpload
  },
  methods: {
     toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field) {
            console.log('-------- crop success --------',imgDataUrl, field);
        },
        //上传成功回调
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            this.imgDataUrl = jsonData.files.Avatar1;
            console.log(jsonData);
            console.log('field: ' + field);
        },
        //上传失败回调
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log('上传失败状态'+ status);
            console.log('field: ' + field);
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
  height: 1000px;
}
.box1 {
  width: 1200px;
  margin: 10px auto;
}
.tuozhuai {
  width: 1100px;
  height: 30px;
  font-weight: bold;
  font-size: 20px;
}
.caijian {
  width: 1100px;
  height: 30px;
  font-weight: bold;
  font-size: 20px;
  margin-top:40px;
}
.btn{
  margin-top:50px;
}
</style>