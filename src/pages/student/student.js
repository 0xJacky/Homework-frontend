//const BaseRouterView = () => import('@/layouts/BaseRouterView')

export default [{
    path: 'class_list',
    component: () => import ('@/pages/student/views/class/ClassList'),
    name: '班级列表',
    meta: {
        power: 1,
        icon: 'unordered-list'
    }
}, {
    path: 'class/:id',
    component: () => import ('@/pages/student/views/class/ClassDetail'),
    name: '班级详情',
    meta: {
        power: 1,
        hiddenInSidebar: true
    }
}, {
    path: 'homework/:id',
    component: () => import ('@/pages/student/views/homework/HomeworkDetail'),
    name: '作业详情',
    meta: {
        power: 1,
        hiddenInSidebar: true
    }
}]

