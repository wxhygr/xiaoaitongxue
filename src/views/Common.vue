<template>
 <div>
    <top></top>

    <div class="box">
      <sidebar></sidebar>
    <router-view>
    </router-view>
    </div>
    
  
 </div>
</template>

<script>
  import top from '../components/top'
  import sidebar from '../components/sidebar'

 export default {
   data () {
     return {
      
     }
   },
   components: {
         top,
       sidebar,
   },
   methods: {

   },
   mounted() {

   },
   watch: {

   },
   computed: {

   }
 }
</script>

<style scoped lang='scss'>
.box{
  display: flex;
}
</style>