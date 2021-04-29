<template>
    <div id="login">
        <div class="login_content">
        <div class="login_name">
            <p>用户名</p>
            <el-input v-model="login_name" placeholder="请输入用户名"></el-input>
        </div>
        <div class="login_password">
            <p>密码</p>
            <el-input placeholder="请输入密码" v-model="login_password" show-password @keyup.enter="onLogin"></el-input>
        </div>
        <div class="login_es" @click="onLogin">立即登录</div>
        </div>
        <div class="login_ques">没有账号？ <router-link :to="{name: 'register'}">注册新用户</router-link> </div> 
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:'Login',
    data(){
        return {
            login_name:'',
            login_password:''
        }
    },
    methods:{
        ...mapActions(['login']),
        onLogin(){
            // this.login返回的是一个Promise函数
            this.login({username:this.login_name, password:this.login_password})
                .then(()=>{
                    this.$router.push({path: this.$route.query.redirect || '/'})//this.$router.push跳转到根页面上
                    
                })
        }
    }
}
</script>
<style scoped>
#login{
    display: grid;
}
#login .login_content .login_name,#login .login_content .login_password,#login .login_content .login_es{
    margin-top: 30px;
}
#login .login_content{
    width: 450px;
    justify-self: center;
    text-align: left;
}
.login_content .login_es{
    font-size: 14px;
    width: 70px;
    height: auto;
    padding: 6px 0;
    text-align: center;
    border-radius: 4px;
    background-color: #409EFF;
    color: white;
}
#login .login_ques{
    font-size: 14px;
    margin-top: 20px;
    justify-self: center;
}
#login .login_ques a{
    text-decoration: none;
    color: #409EFF;
}
@media (max-width:500px) {
    #login .login_content{
        width: 300px;
    }
}
</style>