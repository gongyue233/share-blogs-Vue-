//利用已经封装的request进行关于博客blog相关的api封装
import request from './request.js';
const URL = {
    Blog_list: '/blog',
    Blog_content: '/blog/:blogId',
    Create: '/blog',
    Update: '/blog/:blogId',
    Delete:'/blog/:blogId'
};
export default{
    getBlog({page=1, userId, atIndex} = { page: 1 }){ //如果使用该函数时不传参数，则默认是page:1
        return request(URL.Blog_list,'GET', { page, userId, atIndex })
    },
    getIndexBlog({ page=1 } = { page: 1 }){
        return this.getBlog({ page, atIndex: true})
    },
    getBlogUserId(userId, { page=1, atIndex } = { page: 1 }){
        return this.getBlog({userId, page, atIndex})
    },
    getBlogContent({ blogId }){
        return request(URL.Blog_content.replace(':blogId', blogId),'GET')
    },
    createBlog({ title = '', content = '', description='文章简介最少10个字这是哪个憨批定的规矩'}){
        return request(URL.Create, 'POST', { title, content, description})
    },
    updateBlog({ blogId },{ title, content, description, atIndex }){
        return request(URL.Update.replace(':blogId', blogId), 'PATCH', { title, content, description, atIndex })
    },
    deleteBlog({ blogId }){
        return request(URL.Delete.replace(':blogId', blogId),'DELETE')
    }
};
//经测试，如果错误了，为了能够调用reject，因此使用时then()里一定要有失败的回调函数。
//测试代码经window.auth=auth方法挂载了，blog也是挂到window上了:
//auth.register({username:'pikapika233', password:'1245745'}).then(res=>console.log(res), err=>console.log(err))
//auth.get_info().then(res=>console.log(res),err=>console.log(err))
//blog.createBlog({title:'为什么promise后面跟着catch会出问题',content:'这只是测试封装的blog'}).then(res=>console.log(res),err=>console.log(err))
//blog.getBlogContent()
//blog.deleteBlog()
