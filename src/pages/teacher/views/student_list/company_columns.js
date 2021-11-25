const columns = [{
    title: 'ID',
    dataIndex: 'id',
    sorter: true,
    pithy: true
}, {
    title: '名称',
    dataIndex: 'name',
    pithy: true,
    edit: {
        type: 'input'
    },
    search: true
}]

export default columns
