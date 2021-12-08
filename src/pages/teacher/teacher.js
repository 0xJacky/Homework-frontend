export default [{
    path: 'class_list',
    component: () => import ('@/pages/teacher/views/class/ClassList'),
    name: '班级列表',
    meta: {
        power: 2,
        icon: 'unordered-list'
    }
}, {
    path: 'class/:id',
    component: () => import ('@/pages/teacher/views/class/ClassDetail'),
    name: '班级详情',
    meta: {
        power: 2,
        hiddenInSidebar: true
    }
}, {
    path: 'homework/create',
    component: () => import ('@/pages/teacher/views/homework/CreateHomework'),
    name: '创建作业',
    meta: {
        power: 2,
        icon: 'edit'
    }
}, {
    path: 'homework/:id',
    component: () => import ('@/pages/teacher/views/assign/AssignList'),
    name: '作业详情',
    meta: {
        power: 2,
        hiddenInSidebar: true
    }
}, {
    path: 'assign/:id',
    component: () => import ('@/pages/teacher/views/assign/AssignDetail'),
    name: '提交详情',
    meta: {
        power: 2,
        hiddenInSidebar: true
    }
}, {
    path: 'homework/:id/edit',
    component: () => import ('@/pages/teacher/views/homework/CreateHomework'),
    name: '修改作业',
    meta: {
        power: 2,
        hiddenInSidebar: true
    }
}]
