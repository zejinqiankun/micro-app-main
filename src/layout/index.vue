<template>
  <el-container style="height: 100%;">
    <el-header height="45px" style="border-bottom: 1px solid #eee">
      Header
      <el-button style="float: right" type="primary" @click="toLogout">退出登录</el-button>
    </el-header>
    <el-container>
      <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: calc(100% - 45px)">
        <el-menu  :default-active="activeMenu">
          <el-menu-item index="home" @click="toHome" :class="{'is-active':$route.name === 'home'}">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <menu-tree :menuData="sideMenuTreeList"/>
        </el-menu>
      </el-aside>
      <div style="width:100%">
        <tab/>
        <el-main id="mask-container">
          <router-view/>
          <div id="sub-micro-container"></div>
        </el-main>
      </div>
    </el-container>
  </el-container>
</template>
<script>
import { mapState } from 'vuex'
import MenuTree from "./MenuTree";
import Tab from './Tab'
export default {
  components:{
    MenuTree,
    Tab
  },
  data() {
    return {
      activeMenu: '',
      sideMenuTreeList: []
    }
  },
  computed: {
    ...mapState({
      menuActive: state => state.menu.menuActive, //菜单树选中
      menuTreeList: state => state.menu.menuList//菜单树
    })
  },
  watch: {
    menuActive(val){
      this.$store.dispatch('menu/setMenuActive',val)
      this.activeMenu = val
    },
    '$route'(newRou){
      this.initMenuRouter(newRou)
    }
  },
  created(){
    this.initMenuRouter(this.$route)
  },
  methods: {
    initMenuRouter(route) {
      this.sideMenuTreeList = this.menuTreeList.reduce((routes, curRoute) => {
        if (curRoute.children) {
          return routes.concat(curRoute.children)
        }
        return routes||[]
      },[])
      if (this.$route.name === 'home') {
        this.$store.dispatch('menu/setMenuActive','')
        this.activeMenu = ''
      }else {
        this.$store.commit('menu/SET_MENU_ACTIVE',route.path)
        this.activeMenu = this.menuActive
      }
    },
    toHome() {
      this.$router.push({name: 'home'})
    },
    toRouter(path) {
      this.$router.push({path})
    },
    toLogout() {
      this.$store.dispatch('user/logoutToClearUserInfo')
      this.$router.push({name: 'login'})
    },
  }
};
</script>