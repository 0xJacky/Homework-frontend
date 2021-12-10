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
                    @clickEdit="viewAssign"
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
import moment from 'moment'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import StdTable from '@/components/StdDataDisplay/StdTable'
import RichText from '@/components/RichText/RichText'

export default {
    name: 'HomeworkDetail',
    components: {RichText, StdTable, FooterToolBar},
    data() {
        return {
            columns: [{
                title: '学号',
                dataIndex: 'user.school_id',
                search: {
                    type: 'input'
                },
                sorter: true
            }, {
                title: '姓名',
                dataIndex: 'user.name',
                search: {
                    type: 'input'
                }
            }, {
                title: '提交时间',
                dataIndex: 'assign_at',
                customRender: (text, record) => {
                    let html = []
                    if (!text) {
                        html.push(<a-tag color="pink">
                            未提交
                        </a-tag>)
                        return <div>{html}</div>
                    }
                    html.push(<span> {moment(text).format('yyyy-MM-DD HH:mm:ss')} </span>)
                    if (moment(text).isAfter(record.deadline)) {
                        html.push(<a-tag color="orange">
                            超时提交
                        </a-tag>)
                    } else {
                        html.push(<a-tag color="blue">
                            按时提交
                        </a-tag>)
                    }
                    return <div>{html}</div>
                },
            }, {
                title: '成绩',
                dataIndex: 'score',
                sorter: true,
                customRender: (text) => {
                    let html = []
                    if (!text) {
                        html.push(<a-tag color="orange">
                            未批改
                        </a-tag>)
                        return <div>{html}</div>
                    }
                    return <div>{text}</div>
                }
            }, {
                title: '操作',
                dataIndex: 'action'
            }],
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
        },
        viewAssign(id, record) {
            if (record.assign_at) this.$router.push('/assign/' + id)
            else this.$message.info('学生未提交作业')
        }
    }
}
</script>

<style lang="less" scoped>
.upload-container {
    padding-top: 15px;
}
</style>
