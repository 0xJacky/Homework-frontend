<template>
    <div>
        <a-upload
            :before-upload="beforeUpload"
            :multiple="true"
            :show-upload-list="true"
            :file-list="uploadList"
            :remove="remove"
        >
            <a-button :disabled="disabled">
                <a-icon type="upload"/>
                选择文件
            </a-button>
        </a-upload>
        <a-progress
            v-if="show_progress"
            :stroke-color="{
        from: '#108ee9',
        to: '#87d068',
      }"
            :percent="progress"
        />
        <a-button
            type="primary"
            :disabled="uploadList.length === 0 && !id"
            :loading="uploading"
            style="margin: 16px 0"
            @click="upload"
            v-if="id"
        >
            {{ uploading ? '上传中' : '开始上传' }}
        </a-button>
        <p style="margin: 15px 0" v-for="file in uploaded" :key="file.id">
            <a-icon type="paper-clip" style="margin-right: 5px"/>
            <a :href="server + '/' + file.path" target="_blank" @click="()=>{}">{{ getFileName(file.path) }}</a>
            <a-popconfirm
                title="确定要删除文件吗"
                ok-text="确认"
                cancel-text="取消"
                @confirm="deleteFile(file.id)"
                style="float: right"
            >
                <a-button type="link">删除</a-button>
            </a-popconfirm>
        </p>
    </div>
</template>

<script>
export default {
    name: 'StdMultiFilesUpload',
    props: {
        api: Function,
        id: {
            type: Number,
            default: null
        },
        fileList: {
            default: null
        },
        autoUpload: {
            type: Boolean,
            default: false
        },
        api_delete: {
            type: Function,
            default: null
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    watch: {
        fileList() {
            this.uploaded = this.fileList
        }
    },
    data() {
        return {
            show_progress: false,
            uploadList: [],
            uploaded: this.fileList,
            lastFileTime: 0,
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            uploading: false,
            progress: 0
        }
    },
    model: {
        prop: 'fileUrl',
        event: 'changeFileUrl'
    },
    methods: {
        async upload() {
            if (this.uploadList.length) {
                this.uploading = true
                this.show_progress = true
                this.progress = 0
                let formData = new FormData()
                this.uploadList.forEach(v => {
                    formData.append('file[]', v)
                })
                this.visible = false
                this.uploading = true
                this.$message.info('正在上传附件, 请不要关闭本页')
                let config = {
                    onUploadProgress: (progressEvent) => {
                        // 使用本地 progress 事件
                        if (progressEvent.lengthComputable) {
                            this.progress = Math.round((progressEvent.loaded / progressEvent.total) * 100) // 使用某种 UI 进度条组件会用到的百分比
                        }
                    }
                }
                return this.api(this.id, formData, config).then(r => {
                    this.uploadList = []
                    this.uploaded = [...this.uploaded, ...r]
                    this.uploading = false
                    this.$emit('uploaded', r)
                    this.uploading = false
                    this.orig = false
                    this.$message.success('上传成功')
                }).catch(e => {
                    this.$message.error(e.message ? e.message : '上传失败')
                })
            }
        },
        beforeUpload(file) {
            this.uploadList.push(file)
            return false
        },
        deleteFile(file_id) {
            this.api_delete(this.id, file_id).then(r => {
                this.uploaded = r
            })
        },
        getFileName(path) {
            // 从15开始找
            const idx = path.indexOf('/', 15)
            return path.substring(idx + 1)
        },
        remove(r) {
            this.uploadList = this.uploadList.filter(value => {
                return value !== r
            })
        },
    }
}
</script>

<style scoped>

</style>
