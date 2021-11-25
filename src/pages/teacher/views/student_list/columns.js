import Vue from 'vue'
import company_columns from './company_columns'

const columns = [
    {
        title: 'ID',
        dataIndex: 'id',
        sorter: true,
        pithy: true
    },
    {
        title: '姓名',
        dataIndex: 'name',
        pithy: true,
        edit: {
            type: 'input'
        },
        search: true
    },
    {
        title: '学号',
        dataIndex: 'school_id',
        edit: {
            type: 'input'
        },
        search: true
    },
    {
        title: '性别',
        dataIndex: 'gender',
        mask: {
            0: '未设置',
            1: '女',
            2: '男'
        }
    },
    {
        title: '学院',
        dataIndex: 'college.name',
    },
    {
        title: '专业',
        dataIndex: 'major.name',
    },
    {
        title: '公司',
        dataIndex: 'company.name',
        edit: {
            type: 'readonly'
        }
    },
    {
        title: '公司',
        dataIndex: 'company_id',
        search: {
            type: 'selector',
            api: Vue.prototype.$api.teacher_api.company,
            columns: company_columns,
            data_key: 'companies',
            valueIndex: 'company.name',
            recordValueIndex: 'name'
        },
        display: false
    },
    {
        title: '岗位',
        dataIndex: 'position.name',
        edit: {
            type: 'readonly'
        }
    },
    {
        title: '地理位置',
        dataIndex: 'position.location.name',
        edit: {
            type: 'readonly'
        }
    },
    {
        title: '密码',
        dataIndex: 'password',
        edit: {
            type: 'input',
            placeholder: {
                add: '请设置用户初始密码',
                edit: '留空则不修改'
            }
        },
        display: false
    }, {
        title: '校内教师综合评价',
        dataIndex: 'overall_evaluate.teacher_grade',
        customRender: (record) => {
            return record === 0 ? '未完成' : '已完成'
        }
    },
    {
        title: '操作',
        dataIndex: 'action',
    }
]

export default columns
