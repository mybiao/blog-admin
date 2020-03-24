<template>
  <div class="pages">
    <el-table :data="pages" class="table1">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="PageTitle" label="文章标题">
          <template slot-scope="scope">
              <router-link :to="{path:'/admin/page/'+pages[scope.$index].PageId}">{{scope.row.PageTitle}}</router-link>
          </template>
      </el-table-column>
      <el-table-column prop="PageTime" label="发布时间"></el-table-column>
      <el-table-column prop="PagePath" label="文章路径"></el-table-column>
      <el-table-column prop="tagStr" label="标签" width="80px"></el-table-column>
      <el-table-column prop="Count" label="访问次数" width="50px"></el-table-column>
      <el-table-column prop="Version" label="版本" width="50px"></el-table-column>
      <el-table-column label="管理">
        <template slot-scope="scope">
          <el-button size="mini" @click="deletePage(scope.$index)">删除</el-button>
           <el-button size="mini" @click="editor(scope.$index)">编辑</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      reverse: true,
      pages: []
    };
  },
  created: function() {
   let load= this.$loading.service({fullscreen:true})
    this.$axios({
      method: "get",
      url: "/api/admin/pages"
    }).then(res => {
      let body=res.data.body;
      let tags = []
      for(let i=0;i<body.length; i++){
          let pt = body[i].pageTags;
          for(let j=0;j<pt.length;j++){
              tags.push(pt[j].TagName)
          }
          let tagStr=tags.join(",");
          body[i].tagStr=tagStr;
          tags=[];
      }
      this.pages=body;
    });
    load.close();
  },
  methods: {
    //index，表格行下标，从1开始
    deletePage: function(index) {
      let pid = this.pages[index].PageId;
      this.$axios({
        method: "delete",
        url: "/api/admin/page/" + pid
      }).then(res => {
        if (res.data.code === 1) {
          this.pages.splice(index,1);
          this.$msg.success("删除成功");
        } else {
          this.$msg.error("删除失败");
        }
      });
    },
    editor:function(index){
        let pid = this.pages[index].PageId;
        this.$router.push({path:'/admin/edit/'+pid})
    }
  }
};
</script>

<style>
.pages {
  width: 100%;
}
</style>