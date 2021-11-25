import http from '@/lib/http'
import Curd from '@/api/curd'

const base_url = '/admin/user'

const user = {

    ...new Curd(base_url),

    batchSave(ids, search, data) {
        return http.post(base_url + 's', {
            ids: ids,
            user: data,
        }, {params: search})
    },

}

export default user
