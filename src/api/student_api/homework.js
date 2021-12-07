import http from '@/lib/http'

const homework = {
    get_list(params) {
        return http.get('/student/class/' + params.id + '/homeworks', {params})
    },
    get(id) {
        return http.get('/student/homework/' + id)
    }
}
export default homework
