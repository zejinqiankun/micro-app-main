import store from '@/store'
import {subAppRouter} from '@/config';
import shareComponent from '@/utils/shareComponent.js'

const { token, userInfo, dictionarys } = store.getters

import { registerMicroApps, start } from 'qiankun'
import {Loading} from "element-ui";

const devEntryUrl = {
    'app-erp': '//localhost:8082',
    'app-ebill': '//localhost:8081',
}

export function genMicroApps(subMenus) {
    return subMenus.map((item) => {
        return {
            name: item.type,
            entry: process.env.NODE_ENV === 'production'?'/':devEntryUrl[item.type],
            activeRule: `${subAppRouter}/${item.type}`,
            container: '#sub-micro-container', // 子应用挂在的div
            props: {
                routerBase: `${subAppRouter}/${item.type}`, // 下发基础路由
                globeData: { token, userInfo, dictionarys },
                shareComponent, // 下发公共组件
            },
            loader: (loading) => {
                console.log('loading: ', loading)
            },
        }
    });
}
export function registerApps (subMenus) {
    let loadingInstance
    registerMicroApps(genMicroApps(subMenus), {
        beforeLoad: (app) => {
            loadingInstance = Loading.service({
                target: '#mask-container',
            })
            console.log('beforeLoad:', app.name)
            return Promise.resolve()
        },
        afterMount: (app) => {
            loadingInstance.close()
            console.log('afterMount:', app.name)
            return Promise.resolve()
        },
    })
}
export default (subMenus) => {
    registerApps(subMenus);
    start();
}
