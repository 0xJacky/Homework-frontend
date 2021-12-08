<template>
    <a-card title="作业详情">
        <h3>提交情况</h3>
        <p>截止时间：{{ formatDateTime(data?.homework?.deadline) }}</p>
        <p>成绩：{{ data.score }}</p>
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="作业描述">
                <rich-text :html="data?.homework?.description"/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="文件上传">
                <p style="margin: 5px 0" v-for="file in uploaded" :key="file.id">
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
                <div class="upload-container">
                    <a-upload-dragger
                        name="file"
                        :multiple="true"
                        :customRequest="upload"
                        :show-upload-list="true"
                        :file-list="uploadList"
                        :remove="remove"
                        :before-upload="beforeUpload"
                    >
                        <p class="ant-upload-drag-icon">
                            <a-icon type="inbox"/>
                        </p>
                        <p class="ant-upload-text">
                            点击或拖拽文件到这里即可提交
                        </p>
                        <p class="ant-upload-hint">
                            支持单个或批量上传。
                        </p>
                    </a-upload-dragger>
                </div>
            </a-tab-pane>
        </a-tabs>

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import RichText from '@/components/RichText/RichText'

export default {
    name: 'HomeworkDetail',
    components: {RichText, FooterToolBar},
    data() {
        return {
            data: {},
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            uploadList: [],
            uploaded: this.fileList,
            assign_id: 0,
        }
    },
    created() {
        this.$api.student_api.homework.get(this.$route.params.id).then(r => {
            this.data = r
            this.uploaded = r.assign.uploads
            this.assign_id = r.assign.id
        })
    },
    methods: {
        getFileName(path) {
            // 从15开始找
            const idx = path.lastIndexOf('/')
            return path.substring(idx + 1)
        },
        beforeUpload(file) {
            this.uploadList.push(file)
            return true
        },
        upload(args) {
            let formData = new FormData()
            formData.append('file', args.file)
            this.uploadList.pop()
            this.$api.student_api.assign.upload(this.$route.params.id, formData).then(r => {
                args.onSuccess(r)
                this.uploaded = r.data.uploads
            }).catch(e => {
                args.onError(e)
            })
        },
        deleteFile(file_id) {
            this.$api.student_api.assign.delete_upload(this.assign_id, file_id).then(r => {
                this.uploaded = r
            })
        },
        remove(r) {
            this.uploadList = this.uploadList.filter(value => {
                return value !== r
            })
        },
    }
}
</script>

<style lang="less" scoped>
.upload-container {
    padding-top: 15px;
}

h3 {
    position: relative;
    padding: 5px 18px;
    margin: 10px 0;
}

h3:before {
    content: '';
    position: absolute;
    left: 0;
    top: 6px;
    width: 6px;
    height: 23px;
    border-radius: 10px;
    background: #f0494d;
    background: -o-linear-gradient(bottom, #ff843a, #f0494d);
    background: -webkit-gradient(linear, left bottom, left top, from(#ff843a), to(#f0494d));
    background: linear-gradient(to top, #ff843a, #f0494d);
}
</style>
