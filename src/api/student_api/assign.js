import http from '@/lib/http'

const assign = {
    upload(id, form) {
        return http.post('/student/homework/'+id+'/upload', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}})
    },
    delete_upload(a_id, u_id) {
        return http.delete('/student/assign/'+a_id+'/upload/'+u_id)
    }
}

export default assign
