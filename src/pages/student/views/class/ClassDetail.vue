<template>
    <a-card :title="data.name">
        <std-table
            :columns="columns"
            :api="api"
            :deletable="false"
            edit_text="提交"
            :get_params="params"
            @clickEdit="id => $router.push('/homework/'+id)"
        />

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.push('/class_list')">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import StdTable from '@/components/StdDataDisplay/StdTable'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import moment from 'moment'

export default {
    name: 'ClassDetail',
    components: {FooterToolBar, StdTable},
    data() {
        return {
            columns: [{
                title: 'ID',
                dataIndex: 'id',
                sorter: true
            }, {
                title: '作业名称',
                dataIndex: 'name',
                search: {
                    type: 'input'
                }
            }, {
                title: '截止时间',
                dataIndex: 'deadline',
                datetime: true,
                sorter: true
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
                    html.push(<span> {moment(text).format('yyyy-MM-DD HH:mm:ss') } </span>)
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
                    return <div>{html}</div>
                },
            }, {
                title: '操作',
                dataIndex: 'action'
            }],
            api: this.$api.student_api.homework,
            params: {
                id: this.$route.params.id
            },
            data: {}
        }
    },
    created() {
        this.$api.student_api._class.get(this.$route.params.id).then(r => {
            this.data = r.data
        })
    },
    methods: {}
}
</script>

<style lang="less" scoped>

</style>
