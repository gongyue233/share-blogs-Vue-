<template>
    <div id="my">
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
                <div class="actions">
                    <router-link :to="{name:'edit', params:{blogId: blog.id}}">编辑 </router-link> 
                    <a href="#">
                        <el-button type="text" @click.prevent="onDelete(blog.id)">
                            删除
                        </el-button>
                    </a>
                </div>
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
import {mapGetters} from 'vuex';
export default {
    name:'User',
    data(){
        return {
            blogs:[],            
            page:1,
            total: 0,
            totalpage:0,
        }
    },
    computed:{
        ...mapGetters(['user'])
    },
    created(){
        this.page = parseInt(this.$route.query.page) || 1; 
        blog.getBlogUserId(this.user.id, {page:this.page}).then(res=>{
            //console.log(res);
            this.page = res.page;
            this.total = res.total;
            this.totalpage = res.totalpage;
            this.blogs = res.data;
        })
    },
    methods:{
        splitDate(datestr){
            let dateobj = typeof datestr==='object' ? datestr : new Date(datestr);
            return {
                date: dateobj.getDate(),
                month: dateobj.getMonth() + 1, 
                year: dateobj.getFullYear()
            }
        },
        UserChangePage(newPage){
            blog.getBlogUserId(this.user.id, {page: newPage}).then(res=>{
            //console.log(res)
            this.blogs=res.data;
            this.total = res.total;
            this.totalpage=res.totalpage;
            this.page = res.page;
            //console.log(this.page)
            this.$router.push({path:`/my`, query:{page: newPage}});
            })            
        },
        onDelete(blogId){
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                blog.deleteBlog({blogId}).then(()=>{
                    this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                     //将blogs数组过滤掉了被删除的blog
                    this.blogs = this.blogs.filter(blog=> blog.id!==blogId);
                })            
            })
        }
    },
   
}
</script>
<style scoped>
#my .user_info{
    display: grid;
    grid: auto auto / 80px 1fr;
    margin-top: 30px;
    padding-bottom: 20px;
    border-bottom: 1p solid #ebebeb;
}
#my .user_info img{
    grid-column: 1;
    grid-row: 1 / 3;
    width: 60px;
    height: 60px;
    border-radius: 50%;
    justify-self: center;
}
#my .user_info h3{
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: 10px;
    padding-left: 20px;
    text-align: left;
}
#my .item{
    display: grid;
    grid: auto auto auto / 80px 1fr;
    margin: 10px 0;
}
#my .item .date{
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    justify-self: center;
    text-align: center;
}
#my .item .date span{
    display: block;
    color: #999;
}
#my .item .date .day{
    font-size: 40px;
}
#my .item a{
    text-decoration: none;
}
#my .item a h3{
    color: black;
    text-align: justify;
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    margin-top: 8px;
    font-weight: bold;
    font-size: 18px;
    word-break: break-all;
}
#my .item p{
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    margin-top: 0;
    text-align: justify;
    word-break: break-all;
}
#my .item .actions{
    grid-column: 2 / 3;
    grid-row: 3 / 4;
    font-size: 12px;
}
#my .item .actions a{
    text-decoration: none;
    color: #409EFF;
    font-size: 14px;
}
</style>