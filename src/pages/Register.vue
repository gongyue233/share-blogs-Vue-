<template>
    <div id="register">
        <div class="register_content">
        <div class="register_name">
            <p>用户名</p>
            <el-input v-model="register_name" placeholder="请输入用户名"></el-input>
        </div>
        <div class="register_password">
            <p>密码</p>
            <el-input placeholder="请输入密码" v-model="register_password" show-password @keyup.enter="onRegister"></el-input>
        </div>
        <div class="register_es" @click="onRegister">立即注册</div>
        </div>
        <div class="register_ques">已有账号？ <router-link to="/login">立即登录</router-link> </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
    name:'Register',
    data(){
        return {
            register_name:'',
            register_password:''
        }
    },
    methods:{
        ...mapActions(['register']),
        onRegister(){
            // this.login返回的是一个Promise函数
            this.register({username:this.register_name, password:this.register_password})
                .then(()=>{
                    this.$router.push({path:'/'})//this.$router.push跳转到根页面上
                })
        
        }
    }
}
</script>
<style scoped>
#register{
    display: grid;
}
#register .register_content .register_name,#register .register_content .register_password,#register .register_content .register_es{
    margin-top: 30px;
}
#register .register_content{
    width: 450px;
    justify-self: center;
    text-align: left;
}
.register_content .register_es{
    font-size: 14px;
    width: 70px;
    height: auto;
    padding: 6px 0;
    text-align: center;
    border-radius: 4px;
    background-color: #409EFF;
    color: white;
}
#register .register_ques{
    font-size: 14px;
    margin-top: 20px;
    justify-self: center;
}
#register .register_ques a{
    text-decoration: none;
    color: #409EFF;
}
@media (max-width:500px) {
    #register .register_content{
        width: 300px;
    }
}
</style>