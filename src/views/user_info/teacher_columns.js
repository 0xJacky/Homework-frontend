import Vue from 'vue'

const teacher_columns = [
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
        title: '教工号',
        dataIndex: 'school_id',
        edit: {
            type: 'input',
            placeholder: '请输入您的教工号'
        }
    },
    /*{
        title: "职称",
        dataIndex: "job_title",
        edit: {
            type: "input",
            placeholder: "请输入您的职称"
        }
    },*/
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

export default teacher_columns
