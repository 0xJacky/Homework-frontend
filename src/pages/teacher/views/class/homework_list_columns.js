const columns = [{
    title: 'ID',
    dataIndex: 'id',
    sorter: true
}, {
    title: '作业名称',
    dataIndex: 'name',
    edit: {
        type: 'input'
    },
    search: true
}, {
    title: '截止时间',
    dataIndex: 'ddl',
    datetime: true,
    edit: {
        type: 'date_picker'
    },
    sorter: true
}, {
    title: '操作',
    dataIndex: 'action'
}]

export default columns
