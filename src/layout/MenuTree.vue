<template>
  <div class="menu-tree">
    <label v-for="(item,index) in menuData" :key="index">
      <template v-if="item.children">
        <el-submenu :index="item.id.toString()" >
          <template slot="title">
            <i :class="item.icon"/>
            <span slot="title">{{item.name}}</span>
          </template>
          <MenuTree :menuData="item.children"></MenuTree>
        </el-submenu>
      </template>
      <template  v-else-if="!item.children && item.url">
        <el-menu-item :index="`/${subAppRouter}/${item.type}/${item.url}`" @click="toRouter(item)">
          <i :class="item.icon"/>
          <span slot="title">{{item.name}}</span>
        </el-menu-item>
      </template>
    </label>
  </div>
</template>

<script>
import {subAppRouter} from '@/config';
export default {
  name: "MenuTree",
  props:['menuData'],
  data () {
    return {
      currentMenu: {},
      subAppRouter: subAppRouter
    };
  },
  watch: {
    '$route'() {
      if (this.$route) {
        const currentItem = this.menuData.filter(item => {
          return this.$route.path.indexOf(item.url)>=0;
        });
        if (currentItem.length) {
          this.setCurrentMemu(currentItem[0]);
        }
      }
    }
  },
  created() {
    if (this.$route) {
      const currentItem = this.menuData.filter(item => {
        return this.$route.path.indexOf(item.url)>=0;
      });
      if (currentItem.length) {
        this.setCurrentMemu(currentItem[0]);
      }
    }
  },
  methods:{
    setCurrentMemu (item) {
      this.currentMenu = item;
      if (this.$parent && this.$parent.$parent) {
        this.$parent.$parent.currentMenu = item;
      } else if (this.$parent) {
        this.$parent.currentMenu = item;
      }
    },
    toRouter(item){
      this.setCurrentMemu(item);
      const routerName = `/${this.subAppRouter}/${item.type}/${item.url || item.name}`
      let rItem = {
        path:routerName,
        meta: {
          title: item.name
        },
        params:{
          boo:true
        }
      }
      this.$store.commit('tab/tabRefresh',rItem)
      this.$router.replace(rItem)
      this.$store.dispatch('menu/setMenuActive',routerName) //设置选中
    }
  }
}
</script>
