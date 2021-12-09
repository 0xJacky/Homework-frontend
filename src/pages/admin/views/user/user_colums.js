const user_columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        pithy: true,
        width: 70,
    }, {
        title: '用户名',
        dataIndex: 'name',
        search: true,
        pithy: true,
        edit: {
            type: 'input'
        },
        width: 80,
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
            2: '教师'
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
