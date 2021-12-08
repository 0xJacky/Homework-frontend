<template>
    <a-card :title="data.name">
        <a slot="extra" @click="create_homework">创建作业</a>
        <template v-if="$store.state.user.info.id===data.user_id">
            <a-divider type="vertical" slot="extra"/>
            <a slot="extra" @click="edit">修改班级</a>
        </template>
        <template v-else>
            <a-divider type="vertical" slot="extra"/>
            <a slot="extra" @click="exit">退出班级</a>
        </template>

        <std-table
            :columns="columns"
            :api="api"
            :deletable="false"
            edit_text="查看"
            :get_params="params"
            @clickEdit="id => $router.push('/homework/'+id)"
        />

        <a-modal
            :mask="false"
            title="修改班级"
            :visible="visible"
            @cancel="visible=false"
            @ok="ok"
            destroyOnClose
        >
            <a-form-item label="班级名称">
                <a-input v-model="class_name"/>
            </a-form-item>
        </a-modal>

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import columns from './homework_list_columns'
import StdTable from '@/components/StdDataDisplay/StdTable'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'

export default {
    name: 'ClassDetail',
    components: {FooterToolBar, StdTable},
    data() {
        return {
            columns,
            api: this.$api.teacher_api.homework,
            params: {
                id: this.$route.params.id
            },
            data: {
                user_id: this.$store.state.user.info.id
            },
            visible: false,
            class_name: ''
        }
    },
    watch: {
        '$route'() {
            this.get()
        }
    },
    created() {
        this.get()
    },
    methods: {
        get() {
            this.$api.teacher_api._class.get(this.$route.params.id).then(r => {
                this.data = r.data
            })
        },
        create_homework() {
            this.$router.push({
                path: '/homework/create',
                query: {
                    class_id: this.$route.params.id,
                    class_name: this.data.name
                }
            })
        },
        exit() {
            const that = this
            this.$confirm({
                title: '您确认要退出班级吗',
                onOk() {
                    that.$api.teacher_api._class.exit(that.$route.params.id).then(() => {
                        that.$router.push('/class_list')
                        that.$message.success('退出成功')
                    }).catch(e => {
                        that.$message.error('退出失败' + e?.mseg)
                    })
                }
            })
        },
        edit() {
            this.visible = true
            this.class_name = this.data.name
        },
        ok() {
            this.$api.teacher_api._class.save(this.$route.params.id, {
                name: this.class_name
            }).then(r => {
                this.$message.success('保存成功')
                this.get()
                this.data = r.data
                this.visible = false
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
