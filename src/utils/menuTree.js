import {subAppRouter} from '@/config'
// 需要隐藏的菜单url
const hideMenuUrl = ['myTodo']
const getMenuTreeList = (menuList) => {
  // 获取一级菜单
  let rootList = getParentMenus(menuList)
  // 组装菜单树
  let menuTreeList = []
  menuTreeList = rootList.map(item => {
    return getMenuChildren(item, menuList)
  })
  // 过滤没有子节点且没有url的二级菜单
  menuTreeList = menuTreeList.map(item => {
    if (item.children) {
      item.children = item.children.filter(childrenItem => childrenItem.children || childrenItem.url)
    }
    return item
  })
  // 过滤没有子节点的一级菜单
  menuTreeList = menuTreeList.filter(item => {
    return item.children || (item.url&&!hideMenuUrl.includes(item.url))
  })
  return menuTreeList
};
const getMenuChildren = (parent, menuList) => {
  parent.children = null
  menuList.find(item => {
    // 子节点
    if (item.parentId === parent.id && item.id !== parent.id) {
      parent.children ? parent.children.push(item) : parent.children = [item]
      parent.children.sort((a, b) => { return Number(a.sequence) - Number(b.sequence) })
      getMenuChildren(item, menuList)
    }
  })
  return parent
};

const getMenuPower = (list) => {
  //保存权限路径
  let urlArr = []
  list.forEach(item => {
    if(item.url !== null){
      urlArr.push(item.url)
    }
  });
  return urlArr;
}

// 获取一级菜单
const getParentMenus = (menuList) => {
  return menuList.filter(item => !item.parentId || item.parentId === item.id);
}

const getMenuTitles = (menuList) => {
  return menuList.reduce((obj,curItem) => {
    if (curItem.url) {
      const routerName = `/${subAppRouter}/${curItem.type}/${curItem.url}`
      obj[routerName] = curItem.name
    }
    return obj
  },{})
}

export {getMenuTreeList,getMenuPower,getParentMenus,getMenuTitles}
