<template>
    <div id="edit">
        <div class="edit_title">
            <p>文章标题</p>
            <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ maxRows: 1}"
                v-model="title"
                maxlength="30"
                show-word-limit
            >
            
            </el-input>
        </div>
        <div class="edit_text">
            <p>内容简介</p>
            <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows:3 ,maxRows: 3}"
                v-model="description"
                maxlength="200"
                show-word-limit
            >
            </el-input>
        </div>
        <div class="edit_content">
            <p>文章内容</p>
            <el-input
                type="textarea"
                placeholder="请输入内容"
                :autosize="{ minRows:12 ,maxRows: 10}"
                v-model="content"
                maxlength="10000"
                show-word-limit
            >            
            </el-input>
        </div>
        <div class="establish" @click="onEdit">保存</div>
    </div>
</template>

<script>
import blog from '../helpers/blog';
export default {
    name:'Edit',
    data(){
        return {
            title:'',
            description:'',
            content:'',
            atIndex: false,
            blogId:''
        }
    },
    created(){
        console.log('创建')
        this.blogId = this.$route.params.blogId;
        blog.getBlogContent({ blogId: this.blogId }).then(res=>{
            console.log('res:'+ res)
            this.title = res.data.title;
            this.description = res.data.description;
            this.content = res.data.content;
            this.atIndex = res.data.atIndex
        })
    },
    methods:{
        onEdit(){
            blog.updateBlog({ blogId: this.blogId },
                    { title:this.title, content: this.content, description: this.description, atIndex:this.atIndex })
                    .then(res=>{
                        this.$message.success(res.msg);
                        this.$router.push({name:'detail', params:{blogId: this.blogId}})
                    })
        }
    }
}
</script>

<style>
#edit{
    display: grid;
}
#edit .establish{
    margin: 20px;
    color: white;
    border-radius: 4px;
    background-color: #409EFF;
    justify-self: center;
    text-align: center;
    font-size: 16px;
    width: 80px;
    padding: 10px;
}
#edit .edit_title .el-textarea .el-textarea__inner{
    text-decoration: none;    
    font-size: 14px;
    font-style: normal;
    color: black;
}
#edit .edit_text .el-textarea .el-textarea__inner{
    text-decoration: none;    
    font-size: 14px;
    font-style: normal;
    color: black;
}
#edit .edit_content .el-textarea .el-textarea__inner{
    text-decoration: none;    
    font-size: 14px;
    font-style: normal;
    color: black;    
}
</style>