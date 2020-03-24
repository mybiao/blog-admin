<template>
  <div>
    <div class="markcls">
      <el-form :model="form1" ref="form1" label-width="80px">
        <el-form-item label="文章标题">
          <el-input size="mini" v-model="form1.pageTitle" type="text"></el-input>
        </el-form-item>
        <el-form-item label="标签">
          <el-input size="mini" v-model="form1.pageTags" type="text" placeholder="多个标签逗号分隔"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="form1.private">私有</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <mavon-editor ref="editor" v-model="form1.value" @imgAdd="imgAdd"></mavon-editor>
    </div>
    <div class="btns">
      <el-button size="mini" type="primary" @click="form1Submit">发布文章</el-button>
      <el-button size="mini">保存草稿</el-button>
    </div>
  </div>
</template>

<script>
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import marked from "marked";
export default {
  components: {
    mavonEditor
  },
  data: function() {
    return {
      form1: {
        pid:0,
        pageTitle: "",
        pageTags: "",
        private: false,
        value: "",
        fragment:"",
      }
    };
  },
  created: function() {
    this.form1.pid = this.$route.params.pid;
    if (this.form1.pid > 0) {
      this.$axios({
        method: "get",
        url: "/api/page/detail/" + this.form1.pid
      }).then(res => {
        this.form1.value = res.data.body.text;
        this.form1.pageTitle = res.data.body.page.PageTitle;
        let pageTags=res.data.body.page.pageTags;
        let tagsStr=[];
        for(let i=0;i<pageTags.length;i++){
          tagsStr.push(pageTags[i].TagName);
        }
        this.form1.pageTags=tagsStr.join(',');
        if(res.data.body.page.Flag===1){
          this.form1.private=false;
        }else{
          this.form1.private=true;
        }
      });
    }
  },
  methods: {
    imgAdd: function(pos, $file) {
      let formdata = new FormData();
      formdata.append("image", $file);
      this.$axios({
        url: "/api/admin/uploadImage",
        method: "post",
        data: formdata
      }).then(res => {
        this.$refs.editor.$img2Url(pos, res.data.body);
      });
    },
    getFragment: function() {
      //markdown解析成html
      let pageHtml = marked(this.form1.value);
      let reg = /<\/?.+?\/?>/g;
      let outHtml = pageHtml.replace(reg, "");
      let fragment = "";
      if (outHtml.length <= 200) {
        fragment = outHtml + "······";
      } else {
        fragment = outHtml.substring(0, 200) + "······";
      }
      return fragment;
    },
    form1Submit: function() {
      if (this.form1.pageTitle.trim().length === 0) {
        this.$msg.error("请填写文章标题");
        return false;
      }
      if (this.form1.pageTags.trim().length === 0) {
        this.$msg.error("请填写文章标签");
        return false;
      }
      if (this.form1.value.trim().length === 0) {
        this.$msg.error("文章内容不能为空");
        return false;
      }
      this.form1.fragment=this.getFragment();
      let formdata=new FormData();
      for(let d in this.form1){
        formdata.append(d,this.form1[d]);
      }
      this.$axios({
        method: "post",
        url: "/api/admin/savePageInfo",
        data: formdata
      }).then(res => {
        if(res.data.code===0){
          this.$msg.success("文章发布成功")
        }
      });
    }
  }
};
</script>

<style>
.markcls {
  width: 80%;
}
.el-form-item {
  margin-bottom: 6px;
}
.btns {
  width: 100%;
  text-align: center;
  margin-top: 30px;
  margin-bottom: 15px;
}
</style>