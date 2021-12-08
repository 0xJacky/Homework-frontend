import http from '@/lib/http'

const _class = {
    get_list() {
        return http.get('/student/classes')
    },
    get(id) {
        return http.get('/student/class/'+id)
    },
    join(id) {
        return http.get('/student/class/'+id +'/join')
    },
    exit(id) {
        return http.get('/student/class/'+id +'/exit')
    }
}

export default _class
