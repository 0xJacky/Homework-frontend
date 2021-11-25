const user_columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        pithy: true,
        width: 70,
        fixed: 'left'
    }, {
        title: '用户名',
        dataIndex: 'name',
        search: true,
        pithy: true,
        edit: {
            type: 'input'
        },
        width: 80,
        fixed: 'left'
    }, {
        title: 'School ID / 登录名',
        dataIndex: 'school_id',
        search: true,
        pithy: true,
        edit: {
            type: 'input'
        },
        width: 170,
        //fixed: 'left'
    }, {
        title: '用户权限',
        dataIndex: 'power',
        pithy: true,
        mask: {
            1: '学生',
            2: '教师',
            3: '企业指导老师',
            4: '企业',
            5: '学院'
        },
        edit: {
            type: 'select'
        },
        search: true,
        width: 150,
    }, {
        title: '超级用户',
        dataIndex: 'super_user',
        mask: {
            '-1': '否',
            1: '是',
        },
        edit: {
            type: 'select',
        },
        search: true,
        width: 120,
    }, {
        title: '性别',
        dataIndex: 'gender',
        mask: {
            0: '未设置',
            1: '女',
            2: '男'
        },
        edit: {
            type: 'select',
        },
        search: true,
        width: 120,
    }, {
        title: '学院',
        dataIndex: 'college.name',
        width: 200,
    }, {
        title: '专业',
        dataIndex: 'major.name',
        width: 200,
    }, {
        title: '公司',
        dataIndex: 'company.name',
        width: 120,
    }, {
        title: '校内指导老师',
        dataIndex: 'teacher.name',
        width: 120,
    }, {
        title: '企业指导老师',
        dataIndex: 'company_teacher.name',
        width: 120,
    }, {
        title: '年级',
        dataIndex: 'grade',
        edit: {
            type: 'input'
        },
        search: true,
        batch: true,
        width: 120,
    }, {
        title: '班级',
        dataIndex: 'class',
        edit: {
            type: 'input'
        },
        search: true,
        batch: true,
        width: 120,
    }, {
        title: '邮箱',
        dataIndex: 'email',
        search: true,
        edit: {
            type: 'input'
        },
        width: 180,
    }, {
        title: '手机',
        dataIndex: 'phone',
        default: '无记录',
        search: true,
        edit: {
            type: 'input'
        },
        width: 180,
    }, {
        title: '上次活跃',
        dataIndex: 'last_active',
        datetime: true,
        default: '无记录',
        sorter: true,
        width: 180,
    }, {
        title: '操作',
        dataIndex: 'action',
        width: 120,
        //fixed: 'right'
    }
]

export default user_columns
