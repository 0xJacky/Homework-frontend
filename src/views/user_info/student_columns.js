import Vue from 'vue'

const student_columns = [
    {
        title: '姓名',
        dataIndex: 'name',
        edit: {
            type: 'input',
            placeholder: '请输入您的姓名'
        }
    },
    {
        title: '头像',
        dataIndex: 'avatar',
        edit: {
            type: 'upload',
            upload_type: 'img',
            api: Vue.prototype.$api.user.upload_avatar,
            auto_upload: true,
            crop: true,
        }
    },
    {
        title: '性别',
        dataIndex: 'gender',
        edit: {
            type: 'select',
        },
        mask: {
            0: '未设置',
            1: '女',
            2: '男'
        }
    },
    {
        title: '学号',
        dataIndex: 'school_id',
        edit: {
            type: 'readonly'
        }
    },
    {
        title: '电话',
        dataIndex: 'phone',
        edit: {
            type: 'input',
            placeholder: '请输入电话号码'
        }
    },
    {
        title: '邮箱',
        dataIndex: 'email',
        edit: {
            type: 'input',
            placeholder: '请输入邮箱'
        }
    }
]

export default student_columns
