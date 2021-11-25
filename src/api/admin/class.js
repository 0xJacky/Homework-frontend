import http from '@/lib/http'

const _class = {
    get_list(major_id) {
        return http.get('/admin/major/' + major_id + '/classes')
    },
    save(major_id, class_id = null, data) {
        return http.post('/admin/major/' + major_id + '/class'
            + (class_id ? '/' + class_id : ''), data)
    },
    destroy(major_id, class_id) {
        return http.delete('/admin/major/' + major_id + '/class/'
            + class_id)
    }
}

export default _class
