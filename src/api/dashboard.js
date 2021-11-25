import http from '@/lib/http'

const dashboard = {
    college() {
        return http.get('/college/dashboard')
    },
    teacher() {
        return http.get('/teacher/dashboard')
    },
    enterprise() {
        return http.get('enterprise/dashboard')
    }
}

export default dashboard
