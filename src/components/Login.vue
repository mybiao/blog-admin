<template>
<div class="body">
  <div class="login">
      <el-form ref="form" :model="form1" label-width="80px">
          <el-form-item label="用户名">
          <el-input v-model="form1.username" type="text"></el-input>
          </el-form-item>
          <el-form-item label="密码">
          <el-input v-model="form1.password" type="password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item class="loginBtn">
              <el-button type="primary" @click="login">提交</el-button>
          </el-form-item>
      </el-form>
  </div>
</div>
</template>

<script>
export default {

data:function(){
    return{
        form1:{
            username:"",
            password:"",
        }
    }
},
methods:{
    login:function(){
        this.$axios({
            method: "post",
            url: "/api/admin/login",
            data:this.form1
        }).then(res=>{
            let token = res.data.token;
            let refreshToken = res.data.refreshToken;
            localStorage.clear();
            localStorage.setItem("token",token);
            localStorage.setItem("refreshToken",refreshToken);
            this.$msg.info("登录成功")
            this.$router.push({path:'/admin'});
        })
    }
},
}
</script>

<style>
@media (max-width: 768px){
    .login{
        width: 90%;
        position: absolute;
        top: 30%
    }

    
}

.loginBtn{
    text-align: center;
}

@media (min-width: 768px){
.body{
    height: 100%;
    width: 100%;
    background: url("./../assets/xiaoqx.jpg") no-repeat;
    background-size: cover;
}
.login{
    position: absolute;
    width: 26%;
    left: 37%;
    top: 30%;
    text-align: center;
    background-color: azure;
    padding-top: 5%;
    padding-right: 5%;
}
}
</style>