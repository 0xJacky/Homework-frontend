<template>
    <a-card title="作业详情">
        <p>截止时间：{{ formatDateTime(data.ddl) }}</p>
        <p>已上传附件</p>
        <span v-for="upload in data.uploads" :key="upload.id">
            <a-icon type="paper-clip"/>
            <a :href="server +'/'+ upload.path ">{{ getFileName(upload.path) }}</a>
            <a-divider type="vertical"/>
        </span>
        <div class="upload-container">
            <a-upload-dragger
                name="file"
                :multiple="true"
            >
                <p class="ant-upload-drag-icon">
                    <a-icon type="inbox" />
                </p>
                <p class="ant-upload-text">
                    点击或拖拽文件到这里即可提交
                </p>
                <p class="ant-upload-hint">
                    支持单个或批量上传。
                </p>
            </a-upload-dragger>
        </div>

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
export default {
    name: 'HomeworkDetail',
    components: {FooterToolBar},
    data() {
        return {
            data: {
                uploads: [{
                    path: 'https://homework.jackyu.cn/api/upload/test.jpg'
                }]
            },
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
        }
    },
    created() {

    },
    methods: {
        getFileName(path) {
            // 从15开始找
            const idx = path.lastIndexOf('/')
            return path.substring(idx + 1)
        }
    }
}
</script>

<style lang="less" scoped>
.upload-container {
    padding-top: 15px;
}
</style>
