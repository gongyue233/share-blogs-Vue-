<template>
    <div id="detail">
        <div class="user_info">
            <img :src="user.avatar" alt="">
            <h3>{{title}}</h3>
            <p class="auth"><router-link :to="`/user/${user.id}`">{{user.username}}</router-link> 发布于{{friendlyDate(createdAt)}}</p>
        </div>
        <section class="article" v-html="markdown">
        </section>
    </div>
</template>

<script>
import marked from 'marked';
import blog from '../helpers/blog';
export default {
    name:'Detail',
    data(){
        return {
            title:'',
            rawContent:'',//未经marked处理的原始内容
            user:{},
            createdAt:''
        }
    },
    created(){
        blog.getBlogContent({blogId: this.$route.params.blogId}).then(res=>{
            //console.log(res);
            this.title = res.data.title;
            this.rawContent = res.data.content;
            this.createdAt = res.data.createdAt;
            this.user = res.data.user
        })
    },    
    computed:{
        markdown(){
            return marked(this.rawContent)
        }
    }
}
</script>

<style>
#detail .user_info{
    display: grid;
    grid: auto auto / 80px 1fr;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid #ebebeb;
}
#detail .user_info img{
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    justify-self: center;
}
#detail .user_info h3{
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    word-break: break-all;
    margin-top: 4px;
}
#detail .user_info p{
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: 12px;
    color: #999;
    margin-top: 0;
}
#detail .article{
    word-break: break-all;
}
#detail .user_info p a{
    text-decoration: none;
    color: #409EFF;
}
</style>