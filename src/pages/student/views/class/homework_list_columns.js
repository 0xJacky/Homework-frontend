const columns = [{
    title: 'ID',
    dataIndex: 'id',
    sorter: true
}, {
    title: '作业名称',
    dataIndex: 'name',
    search: {
        type: 'input'
    }
}, {
    title: '截止时间',
    dataIndex: 'ddl',
    datetime: true,
    sorter: true
}, {
    title: '成绩',
    dataIndex: 'score',
    sorter: true
}, {
    title: '操作',
    dataIndex: 'action'
}]

export default columns
