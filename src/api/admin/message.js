import http from '@/lib/http'

const message = {
    send(data) {
        return http.post('/admin/live', data)
    }
}

export default message
