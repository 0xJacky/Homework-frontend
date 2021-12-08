import http from '@/lib/http'

const homework = {
    get_list(params) {
        return http.get('/teacher/class/' + params.id + '/homeworks', {params})
    },
    get(id) {
        return http.get('/teacher/homework/' + id)
    },
    save(id = null, data) {
        return http.post('/teacher/homework' + (id ? '/' + id : ''), data)
    }
}
export default homework
