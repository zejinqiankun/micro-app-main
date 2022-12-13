# micro-app-main(一个通用中心路由基座式)

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
```
微前端关键是技术栈无关、独立开发、独立部署、增量升级、可以独立运行也可以组合运行
如果需要实现缓存和同时加载多个微应用（比如tabs页+keep-avlive），需要手动 加载/卸载 一个微应用的场景（loadMicroApp）
微前端的核心不是多技术共存，而是分解复杂度，提升协作效率，支持灵活扩展，能把“一堆复杂的事情”变成“简单的一件事情”，
但是也不是无脑使用的，广东话来说“多个香炉多只鬼”，每多一个技术栈都会增加：维护成本，兼容成本，资源开销成本，这些都会无形的拖累生产力
减少冲突的最好方式就是统一
子到父
```
```
todo:主应用的菜单问题
```