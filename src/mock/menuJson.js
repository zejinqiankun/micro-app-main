export default [
    {
        icon: null,
        id: '1',
        name: '融单',
        parentId: null,
        remark: null,
        sequence: '1',
        type: 'app-ebill',
        url: null
    },
    {
        icon: 'el-icon-eleme',
        id: '100',
        isMenu: '1',
        name: '我的融单',
        parentId: '1',
        remark: null,
        sequence: '01',
        type: null,
        url: null
    },
    {
        icon: '',
        id: '120',
        isMenu: '1',
        name: '我的融单',
        parentId: '100',
        remark: '这个是给Vue前端路由用的',
        sequence: '01',
        type: 'app-ebill',
        url: 'myBill'
    },
    {
        icon: '',
        id: '121',
        isMenu: '1',
        name: '开立融单',
        parentId: '100',
        remark: '这个是给Vue前端路由用的',
        sequence: '02',
        type: 'app-ebill',
        url: 'billOpen'
    },
    {
        icon: null,
        id: '2',
        name: '基础管理',
        parentId: null,
        remark: null,
        sequence: '2',
        type: 'app-erp',
        url: null
    },
    {
        icon: 'el-icon-s-tools',
        id: '201',
        isMenu: '1',
        name: '基础管理',
        parentId: '2',
        remark: null,
        sequence: '01',
        type: null,
        url: null
    },
    {
        icon: '',
        id: '220',
        isMenu: '1',
        name: '用户管理',
        parentId: '201',
        remark: '这个是给Vue前端路由用的',
        sequence: '01',
        type: 'app-erp',
        url: 'userManage'
    },
    {
        icon: '',
        id: '221',
        isMenu: '1',
        name: '企业管理',
        parentId: '201',
        remark: '这个是给Vue前端路由用的',
        sequence: '02',
        type: 'app-erp',
        url: 'entManage'
    },
    {
        icon: 'el-icon-user-solid',
        id: '200',
        isMenu: '1',
        name: '我的基本信息',
        parentId: '2',
        remark: '这个是给Vue前端路由用的',
        sequence: '01',
        type: 'app-erp',
        url: 'myEntInfo'
    }

];