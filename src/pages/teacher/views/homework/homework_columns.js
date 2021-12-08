import Vue from 'vue'
import class_columns from '@/pages/teacher/views/homework/class_columns'


const columns = [{
    title: '班级',
    dataIndex: 'class_id',
    edit: {
        type: 'selector',
        data_key: 'data',
        columns: class_columns,
        api: Vue.prototype.$api.teacher_api._class,
        valueIndex: 'class.name',
        recordValueIndex: 'name',
        disable_search: false
    }
}, {
    title: '作业名称',
    dataIndex: 'name',
    edit: {
        type: 'input'
    },
    search: true
}, {
    title: '截止时间',
    dataIndex: 'deadline',
    datetime: true,
    edit: {
        type: 'date_picker',
        showTime: {
            format: 'HH:mm'
        }
    },
    sorter: true
}, {
    title: '描述',
    dataIndex: 'description',
    edit: {
        type: 'rich-text'
    },
    search: true
}, {
    title: '操作',
    dataIndex: 'action'
}]

export default columns
