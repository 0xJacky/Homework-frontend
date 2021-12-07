//const BaseRouterView = () => import('@/layouts/BaseRouterView')

export default [{
    path: 'class_list',
    component: () => import ('@/pages/student/views/class/ClassList'),
    name: '班级列表',
    meta: {
        power: 1,
        icon: 'unordered-list'
    }
}]

