const microApps = [
    {
        name: 'app-ebill',
        entry: '//localhost:8082',
        activeRule: '/app-ebill'
    },
    {
        name: 'app-erp',
        entry: '//localhost:8081',
        activeRule: '/app-erp'
    }
]
const apps = microApps.map((item) => {
    return {
        ...item,
        container: '#sub-micro-container',// 子应用挂在的div
        props: {
            routerBase: item.activeRule // 下发基础路由
        }
    }
});
export default apps