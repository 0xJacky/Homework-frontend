<template>
    <a-card :title="data.id?'修改作业':'创建作业'">
        <std-data-entry :data-list="columns" :data-source="data"/>
        <footer-tool-bar>
            <template  v-if="data.id">
                <a-space>
                    <a-button @click="$router.go(-1)">返回</a-button>
                    <a-button type="primary" @click="save">保存</a-button>
                </a-space>
            </template>
            <a-button type="primary" @click="save" v-else>创建</a-button>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import columns from '@/pages/teacher/views/homework/homework_columns'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'

export default {
    name: 'CreateHomework',
    components: {FooterToolBar, StdDataEntry},
    data() {
        return {
            data: {
                class_id: parseInt(this.$route.query.class_id ?? null),
                class: {
                    name: this.$route.query.class_name ?? null
                }
            },
            columns,
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
            if (this.$route.params.id) {
                this.$api.teacher_api.homework.get(this.$route.params.id).then(r => {
                    this.data = r.data
                })
            } else {
                this.data = {
                    class_id: parseInt(this.$route.query.class_id ?? null),
                    class: {
                        name: this.$route.query.class_name ?? null
                    }
                }
            }
        },
        save() {
            this.$api.teacher_api.homework.save(this.data.id, this.data).then(() => {
                this.$message.success('保存成功')
                this.$router.go(-1)
            }).catch(e => {
                this.$message.error(e.mseg ?? '系统错误')
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
