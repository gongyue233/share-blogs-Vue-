<template>
    <div id="index">
        <div class="item" v-for="blog in blogs" :key="blog.id">
            <div class="left">
                <router-link :to="{name: 'user', params:{userId: blog.user.id}}">
                <img :src="blog.user.avatar" alt="">
                <span class="name">{{blog.user.username}}</span>
                </router-link>
            </div>
            <router-link :to="{name:'detail', params:{blogId:blog.id}}">
            <p class="title">{{blog.title}}<span class="time">{{friendlyDate(blog.createdAt)}}</span> </p>
            <div class="content">
                    {{blog.description}}
            </div>   
            </router-link>         
        </div>
        <div class="pagination">
        <el-pagination            
            layout="prev, pager, next"
            :total="total"
            :page-count="totalpage"
            :current-page="page"
            @current-change="ChangePage">
        </el-pagination>
        </div>
    </div>
</template>

<script>
import blog from '../helpers/blog'
export default {
    name:'Index',
    data(){
        return{
            blogs:[],
            total:0,
            page:1,
            totalpage:1,
        }
    },
    created(){ 
        this.page = parseInt(this.$route.query.page) || 1;         
        blog.getIndexBlog({page: this.page}).then(res=>{
            //console.log(res)
            this.blogs=res.data;
            this.total = res.total;
            this.page = res.page;
            this.totalpage=res.totalpage;
        })
    },
    methods:{
        ChangePage(newPage){
            blog.getIndexBlog({page: newPage}).then(res=>{
            //console.log(res)
            this.blogs=res.data;
            this.total = res.total;
            this.totalpage=res.totalpage;
            this.page = res.page;
            this.$router.push({path:'/', query:{page: newPage}});
            })            
        }
    }
}
</script>

<style scoped>
#index .item a{
    text-decoration: none;
    color: black;
}
#index .item{
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 20px 0;
}
#index .item .left{
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    justify-self: center;
    text-align: center;
}
#index .item .left img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
}
#index .item .left .name{
    font-size: 12px;
    color: #999;
}
#index .item a .title{
    margin-top: 4px;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    padding-left: 10px;
    text-align: justify;
    font-weight: bold;
    font-size: 18px;
}
#index .item .title span{
    color: #999;
    font-size: 12px;
    padding-left: 16px;
}
#index .item a .content{
    font-size: 14px;
    grid-column: 2 / 3;
    grid-row: 2 / 3 ;
    padding-left: 10px;
    text-align: justify;
    word-break: break-all;
    overflow: hidden;
    
}
#index .pagination{
    text-align: center;
    
}

</style>