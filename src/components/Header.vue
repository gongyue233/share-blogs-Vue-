<template>
    <div id="header" :class="[{login: isLogin}, {'no_login':!isLogin}]">
        <div class="content" v-if="!isLogin">
            <h1>share knowledge</h1>
            <h2>分享博客，探索知识</h2>
            <div class="btns">                
                <router-link to="/login"><el-button round>立即登录</el-button></router-link>
                <router-link to="/register"><el-button round>注册账号</el-button></router-link>
            </div>            
        </div>
        <div class="user_img" v-if="isLogin">  
             <router-link to="/"><h1>Let's share</h1></router-link>
            <div class="avater">
                <router-link :to="{name:'create'}">
                    <i class="el-icon-edit"></i>
                </router-link>                
                <img :src="user.avatar" :alt="user.username" :title="user.username">                
                <ul>
                    <li><router-link :to="{name:'my'}">我的</router-link></li>
                    <li><a href="#" @click="onLogout">注销</a></li>
                </ul>
            </div>        
            
        </div>
    </div>  
</template>

<script>
import {mapGetters, mapActions} from 'vuex';
export default {
    name:'Header',
    data(){
        return {
        }
    },
    methods:{
        ...mapActions([
            'checkLogin',//store里的actions的的checkLogin变成了checkLogin方法
            'logout'
        ]),
        onLogout(){
            this.logout()           
        }
    },
    created(){      
        console.log('create执行了一次')
        this.checkLogin()//因为返回的是Promise对象，所以这句后面可以使用.then 或 .catch
    },
    computed:{
        ...mapGetters([
            'isLogin',
            'user'
        ])
    }
}
</script>

<style>
div{
    display: block;
}
h1,h2,h3,h4,h5{
    font-weight:normal;
}
#header{
    padding: 0;
    margin: 0;    
    background-color: #409EFF;    
    color: #fff;
}
#header.login{
    float: left;
}
#header.no_login{    
    display: grid;
    justify-items: center;
    text-align: center;

}
#header .user_img a{
    text-decoration: none;
}
#header .content h1,#header .user_img a h1{
    font-size: 40px;
    color: #fff;
}

#header .content .btns .el-button{
    margin: 10px 30px 20px 0;
}
#header .user_img h1,#header .user_img .avater{
    display: inline-block;
}
#header .user_img{
    position: relative;
}
#header .user_img .avater{
    position: absolute;
    right: 0;
    width: 60px;
    height: 100px;
    margin-top: 34px;
    text-align: center;
}
#header .user_img .avater a{
    text-decoration: none;
    color: #fff;
}
#header .user_img .avater a .el-icon-edit{
    position: absolute;
    font-size: 36px;
    transform: translateX(-60px);
}
#header .user_img .avater ul{
    display: none;
    right: 0;
    position: absolute;
    border: 1px solid #eaeaea;
    background-color: #fff;    
    padding: 0 6px;
    width: 40px;
    margin-top: 4px;
    
}
#header .user_img .avater:hover ul{
    display: block;
}
#header .user_img .avater img{
    width: 40px;
    height: 40px;
    border-radius: 20px;
    border: 1px solid white;      
}



#header .user_img .avater ul,#header .user_img .avater ul li{
    list-style: none;
}
#header .user_img .avater ul li{
    border-bottom: 1px solid #eaeaea;
}
#header .user_img .avater ul li a{
    text-decoration: none;
    color: #333;
    font-size: 12px;
    display: block;
    padding: 5px 0px;
}

</style>
