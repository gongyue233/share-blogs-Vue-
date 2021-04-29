import auth from '@/helpers/auth.js';
const state = {
    user: null,
    isLogin: false,
}

const mutations = {
    setUser(state, payload){ //修改用户名
        state.user = payload.user
    },
    setLogin(state, payload){
        state.isLogin = payload.isLogin
    }
};
const getters = { //放进getters了，不需要在使用这些数据的时候加上auth前缀
    user: state=>state.user,
    isLogin: state => state.isLogin
};
const actions = {
    // {username, password}代表传入的第二个参数是一个对象，且对象含有 username 和 password 属性
    login({ commit }, {username, password}) {
        return auth.login({ username, password}) //return使其变成Promise，使得登录后也可以进行后续操作
            .then(res=>{
                commit('setUser',{user: res.data})
                commit('setLogin',{ isLogin: true})
            })
    },
    async register({ commit }, { username, passw}){ 
        let res = await auth.register({ username, password });
        //res就是得到了auth.register的 .then 的结果
        commit('setUser', { user: res.data })
        commit('setLogin', { isLogin: true })
        return res.data
    },
    async logout({ commit }) {
        await auth.logout()
        commit('setUser', { user: null })
        commit('setLogin', { isLogin: false })
    },
    async checkLogin({ commit, state}) {
        if(state.isLogin) return true
        let res = await auth.getInfo()
        commit('setLogin', { isLogin: res.isLogin })
        if(!res.isLogin) return false
        commit('setUser', { user: res.data })
        return true 
    }
    
}

export default {
    state,
    getters,
    mutations,
    actions
}