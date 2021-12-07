import http from '@/lib/http'

const _class = {
    get_list() {
        return http.get('/student/classes')
    },
    get(id) {
        return http.get('/student/class/'+id)
    }
}

export default _class
