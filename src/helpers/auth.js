//利用已经封装的request进行关于认证auth相关的api封装
import request from './request.js';
const URL = {
    Register:'/auth/register',
    Login: '/auth/login',
    Get_info:'/auth',
    Logout:'/auth/logout'
};
export default {
    register({username, password}){ //注册
        return request(URL.Register,'POST',{username, password})
    },
    login({username, password}){
        return request(URL.Login,'POST',{username, password})
    },
    logout(){
        localStorage.removeItem('token');
        return request(URL.Logout)
    },
    getInfo(){ //是否在登录
        return request(URL.Get_info)
    }
};

//测试时挂auth在window上，在main.js文件内 import auth from './helpers/auth.js'; window.auth = auth
//auth.register({username:'hunger93939',password:'3444331'}).then(res=>console.log(res),(x)=>console.log(x))
//auth.login({username:'hunger5656',password:'3435532'}).then(res=>console.log(res))