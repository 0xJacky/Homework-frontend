<template>
    <a-card title="作业详情">
        <p>截止时间：{{ formatDateTime(data.ddl) }}</p>

        <std-table
            :api="api"
            :columns="columns"
        />

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import columns from '@/pages/teacher/views/homework/assign_columns'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import StdTable from '@/components/StdDataDisplay/StdTable'
export default {
    name: 'HomeworkDetail',
    components: {StdTable, FooterToolBar},
    data() {
        return {
            columns,
            data: {
                uploads: [{
                    path: 'https://homework.jackyu.cn/api/upload/test.jpg'
                }]
            },
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            api: this.$api.teacher_api.assign
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
