import http from '@/lib/http'

class Curd {
    baseUrl = ''
    plural = ''
    get_list = this._get_list.bind(this)
    get = this._get.bind(this)
    save = this._save.bind(this)
    destroy = this._destroy.bind(this)
    upload = this._upload.bind(this)

    constructor(baseUrl, plural = null) {
        this.baseUrl = baseUrl
        this.plural = plural ?? this.baseUrl + 's'
    }

    _get_list(params) {
        return http.get(this.plural, {params: params})
    }

    _get(id) {
        return http.get(this.baseUrl + (id ? '/' + id : ''))
    }

    _save(id = null, data) {
        return http.post(this.baseUrl + (id ? '/' + id : ''), data)
    }

    _destroy(id) {
        return http.delete(this.baseUrl + '/' + id)
    }

    _upload(id, form, config) {
        return http.post(this.baseUrl + '/' + id + '/upload', form,
            {headers: {'Content-Type': 'multipart/form-data;charset=UTF-8'}, ...config})
    }
}

export default Curd
