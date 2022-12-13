import windowCookie from "@/utils/cookie";
const state = {
    // 用户信息
    userInfo: {}
};
const mutations = {
    SET_USER_INFO: (state, userInfo) => {
        state.userInfo = userInfo
    }
}
const actions = {
    // 设置用户信息
    setUserInfo({ commit , dispatch}, {userInfo, menuList}) {
        commit('SET_USER_INFO', userInfo)
        // 保存菜单树,保存菜单列表
        dispatch("menu/setMenuTitles", menuList, { root: true });
        dispatch("menu/saveMenuTreeList", menuList, { root: true });
    },
    // 退出登录清除相关信息
    logoutToClearUserInfo() {
        //清除local存储的信息
        window.sessionStorage.clear();
        let localArr = ["regType", "vuexAlong"];
        localArr.forEach((item) => {
            window.localStorage.removeItem(item);
        });
        window.clearVuexAlong();
        //清除cookie
        let cookieArr = ["userName", "powerArr", "XSRF-TOKEN", "SESSION"];
        cookieArr.forEach((item) => {
            windowCookie.remove(item);
        });
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
};