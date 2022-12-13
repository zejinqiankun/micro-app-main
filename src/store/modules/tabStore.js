import router from '@/router/index.js'

// 缓存页签store
const state = {
    // 当前路由index
    currentRouteIndex: 0,
    tabActive:'', //选中
    tabTagList:[], //tag列表
}

const mutations = {
    //添加-单
    tabAdd (state, route) {
        const tagIndex = state.tabTagList.findIndex(item => item.path === route.path)
        if (tagIndex!==-1) {// 存在则选择
            //设置选中
            state.tabActive = route.path;
            // rItem里的params和query,fullPath需要更新，否则params和query固定为初次添加进tabTagList时的数据
            let tagRoute = state.tabTagList[tagIndex];
            const meta = tagRoute.meta;
            tagRoute = Object.assign(tagRoute,route);
            tagRoute.meta = meta
            state.tabTagList[tagIndex] = tagRoute;
            if(route.params && route.params.boo){
                //强制刷新
                const newRefreshIndex = meta.refreshIndex !== undefined?meta.refreshIndex+1:0;
                meta.refreshIndex = newRefreshIndex;
                // 更新索引
                state.tabTagList[tagIndex].meta = meta;
                state.currentRouteIndex = newRefreshIndex
            }else {
                state.currentRouteIndex = meta.refreshIndex !== undefined?meta.refreshIndex:0;
            }
        }else {// 不存在则添加
            //并设置选中
            state.tabActive = route.path
            state.currentRouteIndex = route.meta.refreshIndex !== undefined?route.meta.refreshIndex:0;
            //添加到标签数组
            state.tabTagList.push(route)
        }
    },
    //关闭-单
    tabDel(state,route){
        //查找下标
        const tagIndex = state.tabTagList.findIndex(item => item.path === route.path)
        //当要删除的为当前选中的
        if(route.path === state.tabActive){
            //当下标存在 并且大于零
            if(tagIndex > 0){
                state.tabActive = state.tabTagList[tagIndex -1 ]['path']
            }//当下标存在 并且等于0 且 tabTagList 1
            else if(tagIndex === 0 && state.tabTagList.length > 1){
                state.tabActive = state.tabTagList[tagIndex + 1 ]['path']
            }
            else{
                state.tabActive = ''
            }
        }
        state.tabTagList.splice(tagIndex,1)
        router.push({path:state.tabActive ? state.tabActive : '/home'})
    },
    //关闭其他-留自己
    tabOther(state,route){
        let tagIndex = state.tabTagList.findIndex(item => item.path === route.path)
        //先删除右侧
        if(tagIndex < state.tabTagList.length - 1){
            state.tabTagList.splice(tagIndex+1,(state.tabTagList.length - 1) - tagIndex )
        }
        //再删除左侧
        if(tagIndex !== 0){
            state.tabTagList.splice(0,tagIndex)
        }
        router.push({path:route.path})
    },
    //关闭所有
    tabClear(state){
        state.tabTagList = []
        state.tabBreadList = []
        state.tabActive = ''
        router.push({path:'/home'})
    },
    //刷新
    tabRefresh(state,route){
        const currentRoute = router.currentRoute;
        if (currentRoute&&currentRoute.path === route.path) {
            const tagIndex = state.tabTagList.findIndex(item => item.path === currentRoute.path);
            if (tagIndex!==-1) {
                const meta = state.tabTagList[tagIndex].meta;
                if (meta) {
                    const newRefreshIndex = meta.refreshIndex !== undefined?meta.refreshIndex+1:0
                    meta.refreshIndex = newRefreshIndex;
                    state.tabTagList[tagIndex].meta = meta;
                    state.currentRouteIndex = newRefreshIndex;
                }else {
                    console.error('tag route meta不存在！')
                }
            }else {
                console.error('tag route不存在！')
                currentRoute.meta.refreshIndex !== undefined ? currentRoute.meta.refreshIndex += 1 : currentRoute.meta.refreshIndex =0;
                state.currentRouteIndex = currentRoute.meta.refreshIndex;
            }
        }
    }
}

const actions = {}
const getters = {
    tabTagPaths: (state) => {
        return state.tabTagList.map((item) => {
            return item.path;
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions,
    getters
}