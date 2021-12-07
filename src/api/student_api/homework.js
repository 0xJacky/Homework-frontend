// import Curd from '@/api/curd'
// const homework = new Curd('/student/homework')

const homework = {
    get_list() {
        return Promise.resolve({
            data: [{
                id: 1,
                name: '数据库作业一',
                ddl: '2021-12-08T00:00:00.000+08:00',
                score: '100'
            }]
        })
    }
}
export default homework
