import Vue from 'vue'
import App from './App.vue'
import router from './../router'
import VueRouter from 'vue-router';
import Axios from 'axios'
import qs from 'qs'
import hljs from 'highlight.js'
import {
  Form,
  Input,
  Button,
  FormItem,
  Message,
  MessageBox,
  Container,
  Aside,
  Main,
  Menu,
  MenuItem,
  Table,
  TableColumn,
  Loading,
  Checkbox,
} from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.use(VueRouter);

Vue.use(Form);
Vue.use(Input);
Vue.use(Button);
Vue.use(FormItem);
Vue.use(Container);
Vue.use(Aside);
Vue.use(Main);
Vue.use(Menu);
Vue.use(MenuItem);
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Checkbox);

Axios.defaults.baseURL="https://www.mybiao.top:81"
Axios.interceptors.request.use(config=>{
  // if(config.method==="post"){
  //   let formData = new FormData();
  //   for(let d in config.data){
  //     formData.append(d,config.data[d])
  //   }
  //   config.data = formData;
  // }
  if(localStorage.token){
    config.headers['Authorization']='Bearer '+localStorage.getItem("token");
  }else{
    router.push({path:'/admin/login'})
  }
  return config;
},err=>{
  return Promise.resolve(err);
})
Axios.interceptors.response.use(res=>{
  return res;
},err=>{
  if(err.response.status===401){
    MessageBox.alert("身份已过期，跳转到登录页面重新登录！","身份过期",{
      confirmButtonText:"确定",
      callback:action=>{
        if(action==="confirm"){
          router.push({path:'/admin/login'})
        }
      }
    })
    //登录过期，更新token
    // if(!localStorage.refreshToken){
    //   MessageBox.alert("身份已过期，跳转到登录页面重新登录！","身份过期",{
    //     confirmButtonText:"确定",
    //     callback:action=>{
    //       if(action==="confirm"){
    //         this.$router.push({path:'/logins'})
    //       }
    //     }
    //   })
    // }

    // Axios({
    //   method:"POST",
    //   url:"/api/refreshToken",
    //   data:{
    //     refreshToken:localStorage.getItem("refreshToken")
    //   }
    // }).then(res=>{
    //   if(res.data.code===0){
    //     //获取新的token失败
    //     this.$router.push({path:'/logins'})
    //   }else{
    //     localStorage.removeItem('token');
    //     localStorage.setItem("token",res.data.data.newToken)
    //     err.config.headers['Authorization']='Bearer '+localStorage.getItem("token");
    //     window.console.log(err.config);
    //     Axios(err.config)
    //   }
    // }).catch(error=>{
    //   window.console.log(error);
    //   Message.error("刷新获取新token失败");
    // })
    return Promise.resolve(err);
  }else{
    Message.error("服务器错误!");
    return Promise.resolve(err);
  }
})
Vue.prototype.$axios = Axios;
Vue.prototype.$qs = qs;
Vue.prototype.$msg = Message;
Vue.prototype.$loading = Loading;
Vue.directive("highlight",function(el){
  let blocks = el.querySelectorAll('pre code')
  blocks.forEach(block => {
    hljs.highlightBlock(block)
  });
})
new Vue({
  router:router,
  render: h => h(App),
}).$mount('#app')