export default [{
    path: 'student_list',
    component: () => import ('@/pages/teacher/views/student_list/StudentList'),
    name: '学生列表',
    meta: {
        power: 2,
        icon: 'unordered-list'
    }
}]
