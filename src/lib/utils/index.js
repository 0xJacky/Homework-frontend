import scrollPosition from './scroll-position'
import moment from 'moment'

export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.prototype.extend = (target, source) => {
            for (let obj in source) {
                if (source[obj]) {
                    target[obj] = source[obj]
                }
            }
            return target
        }

        Vue.prototype.getClientWidth = () => {
            return document.body.clientWidth
        }

        Vue.prototype.collapse = () => {
            return !(Vue.prototype.getClientWidth() > 768 || Vue.prototype.getClientWidth() < 512)
        }

        Vue.prototype.bytesToSize = (bytes) => {
            if (bytes === 0) return '0 B'

            const k = 1024

            const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB']

            const i = Math.floor(Math.log(bytes) / Math.log(k))
            return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i]
        }

        Vue.prototype.transformUserType = (power) => {
            const type = ['方神', '学生', '教师', '企业指导老师', '企业', '学院']
            return type[power]
        }

        Vue.prototype.transformGrade = {
            8: 'A+',
            7: 'A',
            6: 'B+',
            5: 'B',
            4: 'C+',
            3: 'C',
            2: 'D',
            1: 'F',
            0: '未评级'
        }

        Vue.prototype.scrollPosition = scrollPosition

        Vue.prototype.getWebSocketRoot = () => {
            const protocol = location.protocol === 'https:' ? 'wss://' : 'ws://'
            if (process.env['VUE_APP_API_WSS_ROOT']) {
                return process.env['VUE_APP_API_WSS_ROOT']
            }
            return protocol + document.domain + '/api'
        }
        Vue.prototype.formatDate = (text) => {
            return moment(text).format('yyyy-MM-DD')
        }

        Vue.prototype.formatDateTime = (text) => {
            return moment(text).format('yyyy-MM-DD HH:mm:ss')
        }

    }
}
