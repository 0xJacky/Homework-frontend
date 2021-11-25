import http from '@/lib/http'
import store from '@/lib/store'

const jwt = require('webcrypto-jwt')

const authorization = {
    async geetest_first_register() {
        return http.get('/geetest/register')
    },
    async login(username, password, captchaObj) {
        return http.post('/login', {
            school_id: username,
            password: password,
            ...captchaObj
        }).then(async r => {
            await store.dispatch('login', r)
            await jwt.verifyJWT(r.token, process.env['VUE_APP_JWT_SECRET'],
                'HS256', async (err, isValid) => {
                    if (isValid) {
                        const token = await r.token
                        let x = await jwt.parseJWT(token)
                        await store.dispatch('update_power', x)
                    }
                })
        })
    },
    logout() {
        return http.delete('/logout').finally(async () => {
            await store.dispatch('logout')
        })
    }
}

export default authorization
