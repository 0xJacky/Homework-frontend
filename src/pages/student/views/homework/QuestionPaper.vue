<template>
    <div>
        <std-data-entry :data-list="template" :data-source="M_answer"/>
        <footer-tool-bar>
            <a-space>
                <a-button type="primary" @click="save">提交</a-button>
                <a-button @click="$router.go(-1)">返回</a-button>
            </a-space>
        </footer-tool-bar>
    </div>
</template>

<script>
import StdDataEntry from '@/components/StdDataEntry/StdDataEntry'
import FooterToolBar from '@/components/FooterToolbar/FooterToolBar'

export default {
    name: 'QuestionPaper',
    components: {FooterToolBar, StdDataEntry},
    props: {
        homework_id: Number,
        template: Array,
        answer: Object
    },
    data() {
        return {
            M_answer: {}
        }
    },
    watch: {
        answer() {
            this.M_answer = this.answer
        }
    },
    created() {
        this.M_answer = this.answer
    },
    methods: {
        save() {
            this.$api.student_api.assign.save(this.homework_id, {
                answer: this.M_answer
            }).then(r => {
                this.M_answer = r.answer
                this.$message.success('提交成功')
                this.$emit('save', r)
            })
        }
    }
}
</script>

<style scoped>

</style>
