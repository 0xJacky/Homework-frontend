import http from '@/lib/http'

const assign = {
    get_list(params) {
        return http.get('/teacher/homework/' + params.id + '/assigns', {params})
    },
    get(id) {
        return http.get('/teacher/assign/' + id)
    },
    save(id, data) {
        return http.post('/teacher/assign/' + id, data)
    }
}

export default assign
