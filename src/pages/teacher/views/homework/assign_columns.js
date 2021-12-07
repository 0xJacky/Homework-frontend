const assign_columns = [{
    title: 'ID',
    dataIndex: 'id',
    sorter: true
}, {
    title: '学号',
    dataIndex: 'school_id',
    search: {
        type: 'input'
    }
}, {
    title: '姓名',
    dataIndex: 'name',
    search: {
        type: 'input'
    }
}, {
    title: '提交时间',
    dataIndex: 'created_at',
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

export default assign_columns
