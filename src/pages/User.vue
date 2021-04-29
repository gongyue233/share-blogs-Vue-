<template>
    <div id="user">
        <section class="user_info">
            <img :src="user.avatar" :alt="user.username">
            <h3>{{user.username}}</h3>
        </section>
        <section>
            <div class="item" v-for="blog in blogs" :key="blog.id">
                <div class="date">
                    <span class="day">{{splitDate(blog.createdAt).date}}</span>
                    <span class="month">{{splitDate(blog.createdAt).month}}月</span>
                    <span class="year">{{splitDate(blog.createdAt).year}}年</span>
                </div>
                <router-link :to="{name: 'detail', params:{blogId: blog.id}}">
                <h3>{{blog.title}}</h3>
                </router-link>
                <p>
                    {{blog.description}}
                </p>
            </div>
        </section>
        <div class="pagination">
        <el-pagination            
            layout="prev, pager, next"
            :total="total"
            :page-count="totalpage"
            :current-page="page"
            @current-change="UserChangePage">
        </el-pagination>
        </div>
    </div>
</template>
<script>
import blog from '../helpers/blog';
export default {
    name:'User',
    data(){
        return {
            blogs:[],
            user:{},
            page:1,
            total: 0,
            totalpage:0,
            userId: '',

        }
    },
    created(){
        this.userId = this.$route.params.userId;
        this.page = parseInt(this.$route.query.page) || 1; 
        //与首页类似，如果没有page参数才等于1
        blog.getBlogUserId(this.userId, {page:this.page}).then(res=>{
            //console.log(res);
            this.page = res.page;
            this.total = res.total;
            this.totalpage = res.totalpage;
            this.blogs = res.data;
            // user页面用的是同一个user
            if(res.data.length > 0){ //需要排除无数据的情况
                this.user = res.data[0].user
            }
        })
    },
    methods:{
        splitDate(datestr){
            let dateobj = typeof datestr==='object' ? datestr : new Date(datestr);
            return {
                date: dateobj.getDate(),
                month: dateobj.getMonth() + 1,  //返回的是从0开始的索引值所以需要+1
                year: dateobj.getFullYear()
            }
        },
        UserChangePage(newPage){
            blog.getBlogUserId(this.userId, {page: newPage}).then(res=>{
            //console.log(res)
            this.blogs=res.data;
            this.total = res.total;
            this.totalpage=res.totalpage;
            this.page = res.page;
            this.$router.push({path:`/user/${this.userId}`, query:{page: newPage}});
            })            
        }
    },
   
}
</script>

<style scoped>
#user .user_info{
    display: grid;
    grid: auto auto / 80px 1fr;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1p solid #ebebeb;
}
#user .user_info img{
    grid-column: 1;
    grid-row: 1 / 3;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    justify-self: center;
}
#user .user_info h3{
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: 10px;
    padding-left: 20px;
    text-align: left;
}
#user .item{
    display: grid;
    grid: auto auto / 80px 1fr;
    margin: 10px 0;
}
#user .item .date{
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    justify-self: center;
    text-align: center;
}
#user .item .date span{
    display: block;
    color: #999;
}
#user .item .date .day{
    font-size: 40px;
}
#user .item a{
    text-decoration: none;
}
#user .item a h3{
    color: black;
    text-align: justify;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: 8px;
    font-weight: bold;
    font-size: 18px;
    word-break: break-all;
}
#user .item p{
    text-align: justify;
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    word-break: break-all;
    margin-top: 0;
}

</style>