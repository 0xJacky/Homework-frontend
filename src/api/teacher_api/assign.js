import http from '@/lib/http'

const assign = {
    get_list(params) {
        const id = params.id
        delete params.id
        return http.get('/teacher/homework/' + id + '/assigns', {params})
    },
    get(id) {
        return http.get('/teacher/assign/' + id)
    },
    save(id, data) {
        return http.post('/teacher/assign/' + id, data)
    }
}

export default assign
