<template>
    <a-card :title="data.id?'修改作业':'创建作业'">
        <a-tabs :default-active-key="tab" @change="changeTab">
            <a-tab-pane key="1" tab="作业描述">
                <std-data-entry :data-list="columns" :data-source="data"/>
            </a-tab-pane>
            <a-tab-pane key="2" tab="出题">
                <a-row :gutter="[16,16]">
                    <a-col :sm="24" :md="12">
                        <build-homework-template v-model="data.template"/>
                    </a-col>
                    <a-col :sm="24" :md="12">
                        <h3>试题模板</h3>
                        <p>请在此作正确答案</p>
                        <std-data-entry :data-list="data?.template??[]" :data-source="answer"/>
                    </a-col>
                </a-row>
            </a-tab-pane>
        </a-tabs>

        <footer-tool-bar>
            <a-space>
                <a-button @click="$router.go(-1)">返回</a-button>
                <a-button type="primary" @click="save" v-if="data.id">保存</a-button>
                <a-button type="primary" @click="save" v-else>创建</a-button>
            </a-space>
        </footer-tool-bar>
    </a-card>
</template>

<script>
import columns from '@/pages/teacher/views/homework/homework_columns'
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'
import BuildHomeworkTemplate from '@/pages/teacher/views/homework/BuildHomeworkTemplate'

export default {
    name: 'CreateHomework',
    components: {BuildHomeworkTemplate, FooterToolBar, StdDataEntry},
    data() {
        return {
            data: {
                class_id: parseInt(this.$route.query.class_id ?? null),
                class: {
                    name: this.$route.query.class_name ?? null
                }
            },
            tab: this.$route.query.tab ?? '1',
            columns,
            answer: {}
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
                    this.answer = r.data.answer ?? {}
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
            this.$api.teacher_api.homework.save(this.data.id, {
                ...this.data,
                answer: this.answer
            }).then(() => {
                this.$message.success('保存成功')
            }).catch(e => {
                this.$message.error(e.mseg ?? '系统错误')
            })
        },
        changeTab(key) {
            this.$router.push({
                query: {tab: key}
            })
        }
    }
}
</script>

<style lang="less" scoped>

</style>
