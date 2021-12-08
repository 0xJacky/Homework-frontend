import Curd from '@/api/curd'
import http from '@/lib/http'

const _class = {
    ...new Curd('/teacher/class', '/teacher/classes'),
    join(id) {
        return http.post('/teacher/class/' + id + '/join')
    },
    exit(id) {
        return http.post('/teacher/class/' + id + '/exit')
    },
}

export default _class
