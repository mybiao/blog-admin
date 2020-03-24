<template>
  <div class="main">
      <el-container>
          <el-aside class="aside" style="width:20%">
              <el-menu default-active="this.$route.path"
              :router="true"
              >
                  <el-menu-item index="/admin">
                      <span slot="title">文章列表</span>
                  </el-menu-item>
                   <el-menu-item index="2">
                      <span slot="title">草稿</span>
                  </el-menu-item>
                  <el-menu-item index="/admin/edit/0">
                      <span slot="title">文章发布</span>
                  </el-menu-item>
              </el-menu>
          </el-aside>
          <el-main>
            <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
            </keep-alive>
            <router-view v-if="!$route.meta.keepAlive"></router-view>
          </el-main>
      </el-container>
  </div>
</template>

<script>
export default {
    components:{

    },
    data:function(){
        return{
            username:"",
        }
    },
    created:function(){
        
    }
}
</script>

<style>
.main{
    height: 100%;
    width: 100%;
}

</style>