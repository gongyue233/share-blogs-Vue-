import axios from 'axios';
import { Message } from 'element-ui';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.baseURL = '//blog-server.hunger-valley.com';


export default function request(url,type = 'GET',data = {}){
    return new Promise((resolve,reject)=>{
        let option={ 
            url, 
            method: type,
        };
        if(type.toLowerCase() === 'get'){
            option.params = data;
        }else{
            option.data = data;
        }
        if(localStorage.token){
            axios.defaults.headers.common['Authorization']  = localStorage.token;
           
        }

        axios(option).then(res=>{
            if(res.data.status === 'ok'){
                //console.log(res.data)
                if(res.data.token){
                    localStorage.token = res.data.token
                }
                resolve(res.data);
            }else{
                Message.error(res.data.msg)  
                 reject(res.data)     
                 //经测试，如果错误了，为了能够调用reject，因此使用时then()里一定要有失败的回调函数
            }
        }).catch(err=>{
            Message.error('网络异常');
            reject({ msg: '网络异常' })   
        })
    })
}
//request('/auth/login', 'POST', {username: 'hunger', password: '123456'})
//   .then(data=>{
//     console.log(data)
//   },x=>console.log(x)) 
//比如上面，就在then 里定义了成功和失败两个回调函数
 