<template>
    <div>
        <std-curd
            title="实习生列表"
            :api="api"
            :columns="columns"
            :disable_add="true"
            :deletable="false"
            :editable="editable"
        >
            <template v-slot:actions="slotProps">
                <a-divider type="vertical" v-if="editable"/>
                <a @click="evaluate_student(slotProps.actions.id, slotProps.actions)">平时评价</a>
                <slot name="actions" :actions="slotProps.actions"/>
            </template>
        </std-curd>

        <evaluate
            :evaluate_api="evaluate_api"
            ref="evaluate"
        />

    </div>
</template>

<script>
import StdCurd from '@/components/StdDataDisplay/StdCurd'
import Evaluate from '@/components/StudentList/Evaluate'

export default {
    name: 'StudentList',
    components: {
        Evaluate,
        StdCurd,
    },
    props: {
        api: Object,
        evaluate_api: Object,
        columns: Array,
    },
    data() {
        return {
            link: this.getLink(),
            student_id: null,
            record: null,
            value: '',
            comments: [],
            pagination: {},
            id: null,
            edit_id: null,
            edit_value: '',
            page: 1,
            power: this.$store.state.user.info.power
        }
    },
    created() {
    },
    methods: {
        getLink() {
            switch (this.$store.state.user.info.power) {
                case 2:
                    return '/teacher/overall_evaluate'
                case 3:
                    return '/company_teacher/overall_evaluate'
                case 5:
                    return '/college/overall_evaluate'
            }
        },
        evaluate_student(id, record) {
            this.$refs.evaluate.show(id, record)
        }
    },
    computed: {
        editable: {
            get() {
                const power = this.$store.state.user.power
                // 企业老师、老师、学院
                return power === 4 || power === 2 || power === 5
            }
        }
    }
}
</script>

<style lang="less" scoped>

</style>
