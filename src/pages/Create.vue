<template>
    <div id="create">
        <div class="create_title">
            <p>文章标题</p>
            <el-input
                type="textarea"
                placeholder="请输入标题"
                :autosize="{ maxRows: 1}"
                v-model="title"
                maxlength="30"
                show-word-limit
            >
            </el-input>
        </div>
        <div class="create_text">
            <p>内容简介</p>
            <el-input
                type="textarea"
                placeholder="请输入内容简介"
                :autosize="{ minRows:3 ,maxRows: 3}"
                v-model="description"
                maxlength="200"
                show-word-limit
            >
            </el-input>
        </div>
        <div class="create_content">
            <p>文章内容</p>
            <el-input
                type="textarea"
                placeholder="请输入文章内容"
                :autosize="{ minRows:12 ,maxRows: 10}"
                v-model="content"
                maxlength="10000"
                show-word-limit
            >
            </el-input>
        </div>
        <p class="at_index">
            <label>是否展示在首页  </label> 
            <el-switch
            v-model="atIndex"
            active-color="#13ce66"
            inactive-color="#ff4949">
            </el-switch>
        </p>
        <div class="establish" @click="onCreate">立即创建</div> 
        
    </div>
</template>

<script>
import blog from '../helpers/blog.js';
export default {
    name:'Create',
    data(){
        return {
            title:'',
            description:'',
            content:'',
            atIndex: false
        }
    },
    methods:{
        onCreate(){
            blog.createBlog({ title:this.title, content:this.content, description:this.description})
            .then(res=>{
                this.$message.success(res.msg);
                this.$router.push({path:`/detail/${res.data.id}`})
            })
        }
    }
}
</script>
<style scoped>
#create{
    display: grid;
    position: relative;
}
#create .at_index{
    justify-self: right;
    margin-top: 20px;
    margin-bottom: 0;
    font-size: 14px;
}
#create .establish{
    margin: 30px;
    color: white;
    border-radius: 4px;
    background-color: #409EFF;
    justify-self: center;
    text-align: center;
    font-size: 16px;
    width: 80px;
    padding: 10px;
}
</style>