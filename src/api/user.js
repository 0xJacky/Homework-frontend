import store from '@/lib/store'
import http from '@/lib/http'


const user = {
    // 当前登录用户的用户信息
    async info() {
        const user = http.get('/user')

        user.then(r => {
            store.dispatch('update_user', r)
        })

        return user
    },

    async update_user_info(data) {
        const user = http.post('/user', data)
        user.then(r => {
            store.dispatch('update_user', r)
        })
        return user
    },

    reset_password(data) {
        return http.post('/reset_password', data)
    },

    upload_real_photo(id, form) {
        return http.post('user/real_photo', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}})
    },

    async upload_avatar(id, form) {
        const u = http.post('user/avatar', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}})
        u.then(async r => {
            const payload = {
                avatar: r.url
            }
            await store.dispatch('update_user', payload)
        })
        return u
    },
}

export default user
