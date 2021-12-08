<template>
    <a-card title="作业详情">
        <a slot="extra" @click="edit">修改作业</a>
        <p>作业名称：{{ data.name }}</p>
        <p>截止时间：{{ formatDateTime(data.deadline) }}</p>
        <a-tabs default-active-key="1">
            <a-tab-pane key="1" tab="提交情况">
                <std-table
                    :api="api"
                    :columns="columns"
                    :get_params="params"
                    :deletable="false"
                    edit_text="查看"
                    @clickEdit="id => $router.push('/assign/'+id)"
                />
            </a-tab-pane>
            <a-tab-pane key="2" tab="作业描述">
                <rich-text :html="data.description"/>
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
import columns from '@/pages/teacher/views/assign/assign_columns'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import StdTable from '@/components/StdDataDisplay/StdTable'
import RichText from '@/components/RichText/RichText'

export default {
    name: 'HomeworkDetail',
    components: {RichText, StdTable, FooterToolBar},
    data() {
        return {
            columns,
            data: {},
            server: process.env['VUE_APP_API_UPLOAD_ROOT'],
            api: this.$api.teacher_api.assign,
            params: {
                id: this.$route.params.id
            }
        }
    },
    watch: {
        '$route'() {
            this.init()
        }
    },
    created() {
        this.init()
    },
    methods: {
        init() {
            this.$api.teacher_api.homework.get(this.$route.params.id).then(r => {
                this.data = r.data
            })
        },
        getFileName(path) {
            // 从15开始找
            const idx = path.lastIndexOf('/')
            return path.substring(idx + 1)
        },
        edit() {
            this.$router.push('/homework/' + this.$route.params.id + '/edit')
        }
    }
}
</script>

<style lang="less" scoped>
.upload-container {
    padding-top: 15px;
}
</style>
