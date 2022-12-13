import {getMenuTreeList,getMenuTitles} from '@/utils/menuTree';
// 菜单store
const state = {
  // 菜单列表
  menuList: [],
  //选中的路由
  menuActive:'',
  // 标题数组
  menuTitles: []
}

const mutations = {
  SET_MENU_LIST: (state, menuList) => {
    state.menuList = menuList
  },
  //设置选中
  SET_MENU_ACTIVE(state, menuActive){
    state.menuActive = menuActive
  },
  // 设置菜单的标题数组
  SET_MENU_TS(state, titles) {
    state.menuTitles = titles
  }
}

const actions = {
  // 保存菜单树
  saveMenuTreeList({commit}, menuTreeList) {
    const subMenus = getMenuTreeList(menuTreeList);
    commit('SET_MENU_LIST', subMenus)
  },
  // 设置菜单的标题数组
  setMenuTitles({commit},menuTreeList) {
    const subMenus = getMenuTitles(menuTreeList);
    commit('SET_MENU_TS', subMenus)
  },
  //设置选中
  setMenuActive({ commit }, menuActive){
    commit('SET_MENU_ACTIVE',menuActive)
  },
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
