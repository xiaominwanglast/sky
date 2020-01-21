const NotFound = () => import('../components/common/404.vue');
const Login = () => import('../views/login/index.vue');
const Index = () => import('../views/index.vue');
const TaskIndex = () => import('../views/testtask/index.vue');
const Alert=() => import('../views/testtask/alert.vue');
const TaskList=() => import('../views/testtask/task/tasklist.vue');
const TaskCalendar=() => import('../views/testtask/task/taskcalendar.vue');
const Group = () => import('../views/testtask/group.vue');
const BugCollect = () => import('../views/testtask/task/bugcollect.vue');
const TestShare = () => import('../views/testtask/share/testshare.vue');
let routes = [
    {
        path: '/login',
        component: Login,
        name: 'login',
    },
    {
        path: '/',
        component: Login,
        name: '',
        redirect: '/login'
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
    },
    {
        path: '*',
        hidden: true,
        projectHidden: true,
        redirect: { path: '/404' }
    },
    {
        path: '/index',
        component: Index,
        name: '',
        children: [{
            path: '/task',
            component: TaskIndex,
            name: '',
            children: [
                { path: '/task/tasklist', component: TaskList, iconCls:'el-icon-menu', name: '中台测试项目'},
                { path: '/task/taskcalendar', component: TaskCalendar, iconCls:'el-icon-s-unfold', name: '任务日历图'},
                { path: '/task/bugcollect', component: BugCollect, iconCls:'el-icon-camera', name: '线上bug汇总'},
                { path: '/task/share', component: TestShare, iconCls:'el-icon-s-claim', name: '中台测试分享'},
                { path: '/task/alert', component: Alert, iconCls:'el-icon-message-solid', name: '警告提示信息'},
                { path: '/task/group', component: Group,iconCls:'el-icon-message-solid', name: '组成员管理'}
            ]},
            ]
    },
];

export default routes;
