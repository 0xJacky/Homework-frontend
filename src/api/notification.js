import http from '@/lib/http'

const baseUrl = '/message'

const notification = {

    get_list(params) {
        return http.get(baseUrl + 's', {params: params})
    },

    read(id) {
        return http.get(baseUrl + '/' + id)
    },

    destroy(id) {
        return http.delete(baseUrl + '/' + id)
    },

    destroyAll() {
        return http.delete(baseUrl + 's')
    }

}

export default notification
